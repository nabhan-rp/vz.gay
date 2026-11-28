# Panduan Lengkap Integrasi, Upgrade & Deployment Portal Utama (`vz.gay`) dengan VZ Support (`support.vz.gay`)

> **Catatan Privasi & Build**: Dokumen ini berada di dalam direktori `/docs` pada repositori Git. Karena Vite hanya memaketkan modul dari `src/` dan menyalin aset statis dari `public/` ke dalam hasil build `/dist`, seluruh berkas di dalam `/docs` **tidak akan pernah dipublikasikan ke `/dist`**, tidak bisa diakses publik lewat URL web, dan **tidak terindeks oleh mesin pencari (SEO)**.
>
> Dokumen ini telah diselaraskan sepenuhnya dengan 6 dokumen referensi resmi pada repositori `nabhan-rp/vzsupport/docs` (`ARCHITECTURE.md`, `PORTAL-INTEGRATION.md`, `CLOUDFLARE.md`, `PRODUCTION-CHECKLIST.md`, `LOCAL-DEVELOPMENT.md`, dan `TROUBLESHOOTING.md`).

---

## 1. Gambaran Umum Arsitektur & Penjelasan `wrangler.toml`

Ekosistem pelaporan Abuse / DMCA dan pusat bantuan VZ terdiri dari **dua repositori / proyek Cloudflare yang terpisah secara sengaja**:

```
┌───────────────────────────────────────────────────────────────────────────┐
│ 1. Portal Utama: vz.gay (Cloudflare Pages / Google AI Studio Project)     │
│    · Halaman: https://vz.gay/legal/abuse                                  │
│    · Menampilkan form laporan + widget Cloudflare Turnstile (Site Key)    │
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

### Langkah 2.2 — Buat Widget Cloudflare Turnstile (Anti-Spam Form Publik)

1. Buka **Cloudflare Dashboard** -> menu **Turnstile** -> klik **Add widget**.
2. Beri nama widget misalnya `VZ Legal & Support Public Intake`.
3. Tambahkan daftar **Hostnames** tempat formulir `/legal/abuse` dijalankan (tanpa `https://` dan tanpa slash):
   - `vz.gay`
   - `www.vz.gay`
   - *(Opsional hanya saat pengujian preview aktif)*: hostname preview AI Studio / Cloudflare Pages Anda. Hapus hostname preview sementara sebelum rilis produksi penuh.
4. Pilih mode widget **Managed**, lalu klik **Create**.
5. Anda akan mendapatkan dua kunci:
   - **Site Key (Publik)**: Dipasang di environment variable proyek `vz.gay` (`VITE_SUPPORT_TURNSTILE_SITE_KEY`).
   - **Secret Key (Rahasia)**: **JANGAN PERNAH** ditaruh di kode frontend, variabel `VITE_`, atau di-commit ke Git. Simpan ke dalam secret Worker `vzsupport`:
     ```bash
     npx wrangler secret put TURNSTILE_SECRET_KEY --config apps/support-worker/wrangler.jsonc
     ```

### Langkah 2.3 — Konfigurasi Origin CORS & Hostname Turnstile di `wrangler.jsonc`

Buka `apps/support-worker/wrangler.jsonc` di repo `vzsupport`, lalu pastikan bagian `"vars"` mencantumkan origin dan hostname yang tepat:

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

## 3. Langkah Demi Langkah: Menghubungkan & Deploy Portal Utama (`vz.gay`)

Formulir di `/src/components/LegalPage.tsx` membaca dua variabel environment Vite pada saat build:

| Nama Variabel | Wajib? | Nilai Produksi | Keterangan |
| :--- | :---: | :--- | :--- |
| `VITE_SUPPORT_API_URL` | Opsional | `https://support.vz.gay` | Base URL Worker VZ Support. Jika tidak disetel, otomatis default ke `https://support.vz.gay`. |
| `VITE_SUPPORT_TURNSTILE_SITE_KEY` | **Wajib** | `<Site Key Publik Turnstile>` | Kunci publik widget Cloudflare Turnstile. Jika belum diisi, tombol kirim API dinonaktifkan dan form menampilkan pemberitahuan serta tombol fallback email `abuse@vz.gay`. |

### Cara Mengatur di Cloudflare Pages Dashboard (`vz.gay`):

1. Buka **Cloudflare Dashboard** -> **Workers & Pages** -> pilih proyek Pages **`vz-gay`**.
2. Masuk ke tab **Settings** -> **Environment variables**.
3. Tambahkan `VITE_SUPPORT_API_URL` dan `VITE_SUPPORT_TURNSTILE_SITE_KEY`, lalu jalankan build/deployment ulang.

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
- [ ] `TURNSTILE_SECRET_KEY` sudah disimpan via `npx wrangler secret put TURNSTILE_SECRET_KEY`.
- [ ] Custom domain `support.vz.gay` sudah terhubung ke Worker dan `npm run check` lulus tanpa error.

### C. Kontrol Akses & Keamanan
- [ ] Policy Cloudflare Access **Allow** (khusus staf) aktif untuk `support.vz.gay/*`.
- [ ] Policy Cloudflare Access **Bypass** aktif khusus untuk path `support.vz.gay/api/public/tickets` (termasuk preflight `OPTIONS`).
- [ ] Rute staf (`/`, `GET /api/tickets`, `POST /api/tickets`, `POST /api/tickets/:id/close`) terverifikasi menolak akses tanpa JWT Cloudflare Access (`HTTP 401`).
- [ ] Aturan Cloudflare Rate Limiting / WAF aktif untuk `POST /api/public/tickets`.

### D. Verifikasi End-to-End Formulir Publik (`vz.gay/legal/abuse`)
- [ ] `VITE_SUPPORT_TURNSTILE_SITE_KEY` dan `VITE_SUPPORT_API_URL` sudah disetel di Cloudflare Pages (`vz-gay`).
- [ ] Preflight `OPTIONS` dari `https://vz.gay` ke `https://support.vz.gay/api/public/tickets` menghasilkan `HTTP 204`.
- [ ] Pengiriman laporan uji yang valid menghasilkan `HTTP 201`, menyimpan 1 baris di D1, dan menampilkan `ticket.reference` (`VZ-YYYY-NNNNNN`) di UI `vz.gay`.
- [ ] Pengiriman yang gagal (email salah, URL bukan `http/https`, Turnstile gagal, atau origin tidak terdaftar) tidak membuat baris di D1 dan tidak menampilkan nomor tiket palsu di UI maupun `localStorage`.
