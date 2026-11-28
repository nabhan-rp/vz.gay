# Panduan Lengkap Integrasi, Upgrade & Deployment Portal Utama (`vz.gay`) dengan VZ Support (`support.vz.gay`)

> **Catatan Privasi & Build**: Dokumen ini berada di dalam direktori `/docs` pada repositori Git. Karena Vite hanya memaketkan modul dari `src/` dan menyalin aset statis dari `public/` ke dalam hasil build `/dist`, seluruh berkas di dalam `/docs` **tidak akan pernah dipublikasikan ke `/dist`**, tidak bisa diakses publik lewat URL web, dan **tidak terindeks oleh mesin pencari (SEO)**.
>
> Dokumen ini telah diselaraskan sepenuhnya dengan 6 dokumen referensi resmi pada repositori `nabhan-rp/vzsupport/docs` (`ARCHITECTURE.md`, `PORTAL-INTEGRATION.md`, `CLOUDFLARE.md`, `PRODUCTION-CHECKLIST.md`, `LOCAL-DEVELOPMENT.md`, dan `TROUBLESHOOTING.md`) serta alur **Existing-Widget Cloudflare Turnstile Spin** untuk Site Key **`0x4AAAAAAGWaOorjmzmCqhEP`**.

---

## 1. Gambaran Umum Arsitektur & Penjelasan `wrangler.toml`

Ekosistem pelaporan Abuse / DMCA dan pusat bantuan VZ terdiri dari **dua repositori / proyek Cloudflare yang terpisah secara sengaja**:

```
┌───────────────────────────────────────────────────────────────────────────┐
│ 1. Portal Utama: vz.gay (Cloudflare Pages / Google AI Studio Project)     │
│    · Halaman: https://vz.gay/legal/abuse                                  │
│    · Menampilkan form laporan + widget Cloudflare Turnstile               │
│      (Site Key Publik: 0x4AAAAAAGWaOorjmzmCqhEP · Action: "abuse_report") │
│    · Single-use token lifecycle: window.turnstile.reset(widgetId)         │
│    · Memvalidasi batas ukuran payload <= 16 KiB & URL absolut http/https  │
│    · Mengirim HTTP POST JSON lintas-origin (CORS) ke support.vz.gay       │
└─────────────────────────────────────┬─────────────────────────────────────┘
                                      │
                                      │ POST https://support.vz.gay/api/public/tickets
                                      │ Header: Content-Type: application/json
                                      ▼
┌───────────────────────────────────────────────────────────────────────────┐
│ 2. Portal Dukungan: support.vz.gay (Cloudflare Worker + D1 + Access)      │
│    · Repo: nabhan-rp/vzsupport (apps/support-worker)                      │
│    · Endpoint Publik (Bypass Access): POST /api/public/tickets            │
│    · Endpoint Teknisi/CS (Wajib Access JWT): GET /, GET/POST /api/tickets │
│    · Secret Turnstile: TURNSTILE_SECRET_KEY (diverifikasi ke siteverify)  │
│    · Database Cloudflare D1: SUPPORT_DB (vz_support_db)                   │
└───────────────────────────────────────────────────────────────────────────┘
```

### Mengapa di `wrangler.toml` Portal `vz.gay` Ada Konfigurasi D1, KV, dan R2 yang Di-comment?

Pada berkas `wrangler.toml` di repositori `vz.gay`, terdapat blok komentar berikut:

```toml
# [[d1_databases]]
# binding = "DB"
# database_name = "vz_portal_db"
# database_id = "<YOUR_D1_DATABASE_ID>"
#
# [[kv_namespaces]]
# binding = "PORTAL_KV"
# id = "<YOUR_KV_NAMESPACE_ID>"
#
# [[r2_buckets]]
# binding = "ASSETS_BUCKET"
# bucket_name = "vz-gay-assets"
```

1. **Fungsi Asal**: Blok tersebut disiapkan untuk **Cloudflare Pages Functions opsional** di `/functions/api/services.ts`, `/functions/api/redirects.ts`, dan `/functions/api/assets/[[path]].ts` (beserta skema `/cloudflare/schema.sql`). Tujuannya adalah apabila suatu saat katalog layanan atau aturan redirect 301 ingin disajikan dari database edge D1/KV/R2 milik portal utama, bukan dari kode statis `src/data/services.ts`.
2. **Mengapa Di-comment**: Jika blok `[[d1_databases]]` diaktifkan sementara `database_id` masih berisi placeholder `<YOUR_D1_DATABASE_ID>`, proses deploy Cloudflare Pages akan gagal. Karena katalog `vz.gay` saat ini disajikan langsung dari bundel statis, blok tersebut sengaja dibiarkan dalam keadaan komentar (`#`).
3. **Pemisahan dari Database Tiket (`vz_support_db`)**: Formulir laporan di `vz.gay/legal/abuse` **tidak** membutuhkan binding `vz_portal_db` di atas, karena tiket disimpan secara terpusat melalui HTTP API di database D1 milik Worker `support.vz.gay` (`SUPPORT_DB` / `vz_support_db`).

### Cakupan Fitur `support.vz.gay` (Modul Inti v1 vs Roadmap Tahap Berikutnya)

Sesuai `ARCHITECTURE.md` di repo `vzsupport`:
- **Modul Inti v1 (Sudah Tersedia di Kode Worker `vzsupport`)**:
  - Pembuatan tiket publik (`POST /api/public/tickets`) dengan verifikasi Origin CORS dan Cloudflare Turnstile server-side.
  - Penyimpanan tiket ke tabel `tickets` di Cloudflare D1 (`SUPPORT_DB`).
  - Konsol Teknisi (`GET /`) serta API Staf (`GET /api/tickets`, `POST /api/tickets`, `POST /api/tickets/:id/close`) yang memverifikasi tanda tangan kriptografi JWT Cloudflare Access (`cf-access-jwt-assertion`).
- **Roadmap Tahap Berikutnya (Belum Diimplementasikan di Worker v1)**:
  - Pengiriman notifikasi email otomatis saat tiket masuk, balasan email dua arah, dan lampiran file (attachments).
  - Halaman publik cek status tiket mandiri (*Customer Ticket Lookup Panel*).
  - *Real-Time Live Chat*, *AI Agents Chatbox*, dan mesin SLA otomatis.

---

## 2. Langkah Demi Langkah: Setup & Deploy `support.vz.gay` (Repo `nabhan-rp/vzsupport`)

> **Peringatan Keamanan Repo (`PRODUCTION-CHECKLIST.md`)**: Sebelum Anda memasukkan `database_id` D1 asli, `ACCESS_TEAM_DOMAIN`, atau `ACCESS_AUD` ke dalam `apps/support-worker/wrangler.jsonc`, ubah visibilitas repositori GitHub `nabhan-rp/vzsupport` menjadi **Private**, atau simpan konfigurasi produksi hanya pada berkas lokal yang tidak di-commit.

### Langkah 2.1 — Buat Database Cloudflare D1 (`vz_support_db`)

1. Login ke Wrangler dan buat database D1 baru di akun Cloudflare Anda:
   ```bash
   npx wrangler login
   npx wrangler d1 create vz_support_db
   ```
2. Salin `database_id` (UUID) yang muncul di terminal, lalu buka `apps/support-worker/wrangler.jsonc` dan ganti nilai `REPLACE_WITH_YOUR_D1_DATABASE_ID`:
   ```jsonc
   "d1_databases": [
     {
       "binding": "SUPPORT_DB",
       "database_name": "vz_support_db",
       "database_id": "ISI-UUID-D1-ANDA-DI-SINI"
     }
   ]
   ```
3. Terapkan skema tabel `tickets` ke database D1:
   ```bash
   npm run db:apply:support
   ```
   *(Untuk pengujian D1 lokal, gunakan `--local`; untuk produksi gunakan `--remote` sesuai `LOCAL-DEVELOPMENT.md`)*.

### Langkah 2.2 — Mengikat Secret Key Turnstile (`0x4AAAAAAGWaOorjmzmCqhEP`) ke Worker `vzsupport` (Existing-Widget Flow)

Widget Cloudflare Turnstile Anda sudah dibuat dengan **Site Key Publik**:
```text
0x4AAAAAAGWaOorjmzmCqhEP
```
Site Key publik di atas **sudah dipasang sebagai default** di kode `vz.gay` (`/src/components/LegalPage.tsx`, `.env.example`, dan `wrangler.toml`) dengan parameter `action: 'abuse_report'` dan siklus token sekali-pakai (`window.turnstile.reset(widgetId)`).

Sekarang, di terminal lokal repositori **`nabhan-rp/vzsupport`**, ikat **Secret Key** untuk widget `0x4AAAAAAGWaOorjmzmCqhEP` ke dalam Worker `vz-support-worker`:

#### Opsi A — Input Secret Key Langsung dari Cloudflare Dashboard:
```bash
npx wrangler secret put TURNSTILE_SECRET_KEY --config apps/support-worker/wrangler.jsonc
```
*(Tempelkan Secret Key dari halaman Cloudflare Dashboard -> Turnstile -> Widget `0x4AAAAAAGWaOorjmzmCqhEP` saat diminta).*

#### Opsi B — Otomatis via Alur Existing-Widget Wrangler (>= 4.109.0, Tanpa Menampilkan Secret di Layar):
Jika Anda menggunakan Wrangler `>= 4.109.0` yang sudah terautentikasi ke akun Cloudflare Anda, Anda dapat memeriksa metadata domain widget, memvalidasi secret ke `siteverify` dengan token dummy (`XXXX.DUMMY.TOKEN.XXXX`), dan langsung menyimpannya ke `TURNSTILE_SECRET_KEY` di Worker `vz-support-worker`:

```bash
# 1. Periksa metadata widget (tanpa mencetak secret ke layar)
WRANGLER_WRITE_LOGS=false WRANGLER_LOG=log WRANGLER_LOG_SANITIZE=true \
  wrangler turnstile widget get "0x4AAAAAAGWaOorjmzmCqhEP" --json | \
  jq '{sitekey: .sitekey, mode: .mode, clearance_level: .clearance_level, domains: .domains}'

# 2. Ambil secret, validasi ke siteverify dengan dummy token, dan simpan ke Worker TURNSTILE_SECRET_KEY
(
  set +x
  set -euo pipefail
  export WRANGLER_WRITE_LOGS=false
  export WRANGLER_LOG=log
  export WRANGLER_LOG_SANITIZE=true
  secret="$(wrangler turnstile widget get "0x4AAAAAAGWaOorjmzmCqhEP" --json | jq -er '.secret')"
  # Validasi secret ke siteverify (harus menghasilkan invalid-input-response, BUKAN invalid-input-secret)
  printf '%s' "$secret" | \
    python3 -I -c 'import sys,urllib.parse; print(urllib.parse.urlencode({"secret":sys.stdin.read(),"response":"XXXX.DUMMY.TOKEN.XXXX"}),end="")' | \
    curl --disable -sS "https://challenges.cloudflare.com/turnstile/v0/siteverify" \
      -H "Content-Type: application/x-www-form-urlencoded" \
      --data-binary @- | \
    python3 -I -c 'import json,sys; d=json.load(sys.stdin); c=d.get("error-codes") or []; raise SystemExit(0 if d.get("success") is False and "invalid-input-response" in c and "invalid-input-secret" not in c else 1)'
  # Simpan ke secret Worker vz-support-worker
  printf '%s' "$secret" | wrangler secret put TURNSTILE_SECRET_KEY --config apps/support-worker/wrangler.jsonc
  unset secret
  echo "OK: TURNSTILE_SECRET_KEY berhasil divalidasi dan disimpan ke Worker."
)
```

### Langkah 2.3 — Konfigurasi Origin CORS & Hostname Turnstile di `wrangler.jsonc`

Buka `apps/support-worker/wrangler.jsonc` di repo `vzsupport`, lalu pastikan bagian `"vars"` mencantumkan origin dan hostname yang sesuai dengan domain yang terdaftar pada widget `0x4AAAAAAGWaOorjmzmCqhEP`:

```jsonc
  "vars": {
    "ACCESS_TEAM_DOMAIN": "NAMA-TIM-ANDA.cloudflareaccess.com",
    "ACCESS_AUD": "AUDIENCE-TAG-APLIKASI-ACCESS-ANDA",
    "PUBLIC_FORM_ORIGINS": "https://vz.gay,https://www.vz.gay",
    "TURNSTILE_EXPECTED_HOSTNAMES": "vz.gay,www.vz.gay"
  }
```

- **Perbedaan Penting (`PORTAL-INTEGRATION.md`)**:
  - `PUBLIC_FORM_ORIGINS` wajib menyertakan skema `https://` tanpa path dan tanpa garis miring di akhir (contoh: `https://vz.gay,https://www.vz.gay`). Jangan pernah menggunakan wildcard `*`.
  - `TURNSTILE_EXPECTED_HOSTNAMES` hanya berisi nama host tanpa skema `https://` (contoh: `vz.gay,www.vz.gay`).

### Langkah 2.4 — Konfigurasi Cloudflare Zero Trust Access (Bypass Publik vs Proteksi Staf)

Di **Cloudflare Zero Trust Dashboard** -> **Access** -> **Applications**:

1. **Aplikasi 1 — Bypass khusus Endpoint Publik (Prioritas Lebih Spesifik)**:
   - **Application domain**: `support.vz.gay`
   - **Path**: `/api/public/tickets`
   - **Policy Action**: **Bypass** (Include: *Everyone*).
   - *Penting*: Pastikan aplikasi spesifik `/api/public/tickets` ini dievaluasi lebih dulu dibanding aplikasi `support.vz.gay/*` agar preflight `OPTIONS` dan `POST` dari browser pengunjung di `vz.gay/legal/abuse` tidak terkena redirect ke layar login Access.
2. **Aplikasi 2 — Proteksi Staf untuk Konsol Teknisi & API Staf**:
   - **Application domain**: `support.vz.gay`
   - **Path**: *(kosongkan / seluruh path `*`)*
   - **Policy Action**: **Allow** (hanya daftar email/grup tim CS & teknisi VZ).
   - Salin **Application Audience (AUD) Tag** ke `ACCESS_AUD` dan domain tim (`<team>.cloudflareaccess.com`, tanpa `https://`) ke `ACCESS_TEAM_DOMAIN` di `apps/support-worker/wrangler.jsonc`.

### Langkah 2.5 — Validasi & Deploy Worker `support.vz.gay`

```bash
npm install
npm run check
npm run deploy:support
```

Tambahkan juga aturan **Cloudflare Rate Limiting / WAF** untuk `POST https://support.vz.gay/api/public/tickets` sebagai lapisan perlindungan tambahan terhadap banjir request otomatis.

---

## 3. Konfigurasi Environment Variables di Portal Utama (`vz.gay`)

Formulir di `/src/components/LegalPage.tsx` sudah memiliki nilai default siap pakai untuk produksi, dan tetap dapat di-override melalui variabel environment Vite pada saat build:

| Nama Variabel | Default di Kode `vz.gay` | Keterangan |
| :--- | :--- | :--- |
| `VITE_SUPPORT_API_URL` | `https://support.vz.gay` | Base URL Worker VZ Support. |
| `VITE_SUPPORT_TURNSTILE_SITE_KEY` | `0x4AAAAAAGWaOorjmzmCqhEP` | Kunci publik widget Cloudflare Turnstile yang sudah aktif di `/legal/abuse`. |

---

## 4. Spesifikasi Kontrak Data & Matriks Kode Status (`PORTAL-INTEGRATION.md`)

### Payload Request (`POST https://support.vz.gay/api/public/tickets`)

```json
{
  "customerName": "Nama Pelapor atau Pemegang Hak",
  "reporterEmail": "pelapor@domain.com",
  "subject": "[DMCA] Abuse Report — links.vz.gay/contoh",
  "body": "Kronologi lengkap dan bukti pelanggaran...",
  "category": "dmca",
  "targetUrl": "https://links.vz.gay/contoh",
  "turnstileToken": "0.token_dari_widget_cloudflare_turnstile..."
}
```

### Matriks Respons HTTP & Perilaku Portal `vz.gay`

| Kode Status HTTP | Arti dari Worker `support.vz.gay` | Perilaku di `vz.gay/legal/abuse` |
| :--- | :--- | :--- |
| **`201 Created`** | Tiket berhasil disimpan ke D1 (`{ ok: true, ticket: { id, reference } }`). | Menampilkan kartu sukses hijau dengan `ticket.reference` resmi (`VZ-2026-000042`), menyimpan ke riwayat browser, dan me-reset form + Turnstile. |
| **`400 Bad Request`** | Kolom wajib kosong/tidak valid, email salah, atau `targetUrl` bukan URL `http://` / `https://` absolut tanpa kredensial. | Mempertahankan seluruh isian form, me-reset Turnstile, dan menampilkan pesan koreksi validasi (`error400`). |
| **`403 Forbidden`** | `Origin` tidak ada di `PUBLIC_FORM_ORIGINS` atau token Turnstile gagal/kedaluwarsa. | Mempertahankan isian form, memuat ulang tantangan Turnstile baru, dan menampilkan pesan kegagalan verifikasi (`error403`). |
| **`413 Payload Too Large`** | Ukuran body JSON melebihi batas 16 KiB atau isi laporan > 10.000 karakter. | Dicegah sejak di browser (pre-check 16 KiB UTF-8) maupun saat respons `413`, meminta pelapor meringkas rincian laporan (`error413`). |
| **`405` / `415`** | Metode HTTP bukan `POST` atau `Content-Type` bukan `application/json`. | Menampilkan pesan kesalahan konfigurasi protokol/format API (`error405_415`) beserta tombol fallback `mailto:abuse@vz.gay`. |
| **`503 Service Unavailable`** | Binding D1 `SUPPORT_DB` atau `TURNSTILE_SECRET_KEY` belum dikonfigurasi di Worker. | Mempertahankan isian form, menampilkan pesan layanan sedang belum aktif (`error503`), dan menyediakan tombol fallback `mailto:abuse@vz.gay`. |
| **Network / CORS Error** | Worker belum di-deploy, HTTP 522, atau terhadang redirect Cloudflare Access. | Mempertahankan isian form, menampilkan pesan kendala jaringan (`errorNetwork`), dan menyediakan tombol fallback `mailto:abuse@vz.gay`. |

---

## 5. Daftar Periksa Kesiapan Produksi (`PRODUCTION-CHECKLIST.md`)

Gunakan daftar periksa ini sebelum mengaktifkan formulir publik di produksi:

### A. Repositori & Akun Cloudflare
- [ ] Repositori `nabhan-rp/vzsupport` sudah diubah menjadi **Private** jika berisi catatan operasional atau ID resource Cloudflare.
- [ ] Tidak ada source code portal `vz.gay`, hasil build `/dist`, data tiket, atau secret Turnstile yang di-commit ke repo Worker.
- [ ] Wrangler terautentikasi ke akun Cloudflare tempat zone `vz.gay` berada.

### B. Resource Worker & Deployment (`vzsupport`)
- [ ] Database D1 `vz_support_db` sudah dibuat dan `database_id` aslinya sudah dipasang di `apps/support-worker/wrangler.jsonc`.
- [ ] Skema `apps/support-worker/schema.sql` sudah diterapkan (`npm run db:apply:support`) ke database D1 produksi (`--remote`).
- [ ] `ACCESS_TEAM_DOMAIN` dan `ACCESS_AUD` sudah diisi sesuai aplikasi Cloudflare Access staf.
- [ ] `PUBLIC_FORM_ORIGINS` (`https://vz.gay,https://www.vz.gay`) dan `TURNSTILE_EXPECTED_HOSTNAMES` (`vz.gay,www.vz.gay`) sudah tepat.
- [ ] `TURNSTILE_SECRET_KEY` untuk widget `0x4AAAAAAGWaOorjmzmCqhEP` sudah disimpan via `wrangler secret put TURNSTILE_SECRET_KEY`.
- [ ] Custom domain `support.vz.gay` sudah terhubung ke Worker dan `npm run check` lulus tanpa error.

### C. Kontrol Akses & Keamanan
- [ ] Policy Cloudflare Access **Allow** (khusus staf) aktif untuk `support.vz.gay/*`.
- [ ] Policy Cloudflare Access **Bypass** aktif khusus untuk path `support.vz.gay/api/public/tickets` (termasuk preflight `OPTIONS`).
- [ ] Rute staf (`/`, `GET /api/tickets`, `POST /api/tickets`, `POST /api/tickets/:id/close`) terverifikasi menolak akses tanpa JWT Cloudflare Access (`HTTP 401`).
- [ ] Aturan Cloudflare Rate Limiting / WAF aktif untuk `POST /api/public/tickets`.

### D. Verifikasi End-to-End Formulir Publik (`vz.gay/legal/abuse`)
- [ ] Site Key `0x4AAAAAAGWaOorjmzmCqhEP` sudah terpasang di `vz.gay` dan domain `vz.gay` / `www.vz.gay` terdaftar pada widget Turnstile di Cloudflare Dashboard.
- [ ] Preflight `OPTIONS` dari `https://vz.gay` ke `https://support.vz.gay/api/public/tickets` menghasilkan `HTTP 204`.
- [ ] Pengiriman laporan uji yang valid menghasilkan `HTTP 201`, menyimpan 1 baris di D1, dan menampilkan `ticket.reference` (`VZ-YYYY-NNNNNN`) di UI `vz.gay`.
- [ ] Percobaan mengirim ulang token Turnstile yang sama (replay) ditolak dengan `HTTP 403` karena token Turnstile bersifat sekali-pakai (*single-use*).

---

## 6. Perbaikan Bug `{"error":"The request could not be completed"}` pada `apps/support-worker/src/index.js` (`vzsupport`)

Jika saat membuka `https://support.vz.gay` (setelah berhasil login Cloudflare Access) muncul pesan:
```json
{"error":"The request could not be completed"}
```

### A. Penyebab Utama (Bug di `apps/support-worker/src/index.js` pada Repo `vzsupport`)
Pada kode `apps/support-worker/src/index.js` bawaan Copilot di baris `268–274` (fungsi `getAccessSigningKey`), Worker mencari properti `certificateSet.jwk_public_certs`:
```js
const certificateSet = await response.json();
if (!Array.isArray(certificateSet.jwk_public_certs)) {
  throw new Error("Cloudflare Access returned no JWK signing keys");
}
```
Padahal endpoint asli Cloudflare Access (`https://nabhanrp.cloudflareaccess.com/cdn-cgi/access/certs`) mengembalikan objek JSON standar JWKS dengan kunci **`keys`** (`{ "keys": [...], "public_cert": {...}, "public_certs": [...] }`), **bukan** `jwk_public_certs`. Akibatnya Worker selalu melempar `Error("Cloudflare Access returned no JWK signing keys")` yang ditangkap sebagai HTTP 500 `{"error":"The request could not be completed"}`.

### B. Solusi Perbaikan di `apps/support-worker/src/index.js`
Buka file `apps/support-worker/src/index.js` di repositori `nabhan-rp/vzsupport`, cari fungsi `getAccessSigningKey(teamDomain, keyId)` (sekitar baris 259–285), lalu ubah bagian pembacaan `certificateSet` menjadi:

```js
    const certificateSet = await response.json();
    const jwkKeys = Array.isArray(certificateSet.keys)
      ? certificateSet.keys
      : certificateSet.jwk_public_certs;
    if (!Array.isArray(jwkKeys)) {
      throw new Error("Cloudflare Access returned no JWK signing keys");
    }

    const signingKeys = new Map();
    for (const publicKey of jwkKeys) {
      if (publicKey.kid && publicKey.kty === "RSA" && publicKey.n && publicKey.e) {
        signingKeys.set(
          publicKey.kid,
          await crypto.subtle.importKey(
            "jwk",
            { kty: "RSA", n: publicKey.n, e: publicKey.e, alg: "RS256", ext: true },
            { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
            false,
            ["verify"]
          )
        );
      }
    }
```
*(Dengan mendukung `certificateSet.keys` sekaligus fallback `certificateSet.jwk_public_certs`, endpoint Cloudflare Access produksi akan langsung berjalan normal dan unit test `npm test` di `worker.test.js` juga tetap lulus 100%).*

Setelah mengubah file tersebut:
1. Pastikan tabel D1 produksi sudah diterapkan:
   ```bash
   npm run db:apply:support
   ```
2. Deploy ulang Worker `vz-support-worker`:
   ```bash
   npm run deploy:support
   ```

### C. Pastikan Policy `VZ Support Public Intake` (`support.vz.gay/api/public/tickets`) Menggunakan Action = `Bypass`
Agar pengiriman formulir dari `https://vz.gay/legal/abuse` tidak ikut dihadang halaman login Cloudflare Access (`302 Found` / `403 Forbidden` pada preflight `OPTIONS`):
1. Buka **Cloudflare Zero Trust** → **Access controls** → **Policies** → klik **`VZ Support Public Intake`**.
2. Pastikan **Action** diatur ke **`Bypass`** (bukan `Allow`), dan di bagian **Include** pilih **`Everyone`**, lalu simpan.

