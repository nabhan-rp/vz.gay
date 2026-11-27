import { useEffect, useState, type FormEvent } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  Copy,
  FileWarning,
  Lock,
  Scale,
  Send,
} from 'lucide-react';
import type { Language } from '../data/i18n';
import { legalTabToPath, type LegalTab } from '../hooks/usePathRouter';

interface LegalPageProps {
  lang: Language;
  activeTab: LegalTab;
  onNavigate: (to: string) => void;
}

interface SubmittedTicket {
  id: string;
  category: string;
  targetUrl: string;
  reporterEmail: string;
  submittedAt: string;
}

const TICKET_HISTORY_KEY = 'vz_legal_abuse_tickets';

const LEGAL_COPY = {
  id: {
    kicker: 'Pusat Kepatuhan & Tata Kelola · vz.gay',
    title: 'Legal, Privasi & Pelaporan Abuse / DMCA',
    subtitle:
      'Ketentuan penggunaan terpadu, kebijakan privasi lintas layanan (termasuk mail, links, desk, games, dan builder), serta formulir pelaporan penyalahgunaan dan hak cipta DMCA.',
    tabs: {
      terms: 'Syarat & Ketentuan',
      privacy: 'Kebijakan Privasi',
      abuse: 'Lapor Abuse / DMCA',
    },
    termsSections: [
      {
        heading: '1. Ruang Lingkup & Naungan Operasional',
        body: 'Seluruh layanan di bawah domain *.vz.gay (termasuk desk.vz.gay, view.vz.gay, pub.vz.gay, mail.vz.gay, links.vz.gay, games.vz.gay, play.vz.gay, app.vz.gay, builder.vz.gay, go-blog.vz.gay, blog.vz.gay, business.vz.gay, codeplace.vz.gay, wonderplace.vz.gay, dan green.vz.gay) serta jajanserver.com dikelola di bawah naungan resmi PT Galeri Langkah Bahagia Yuwana (galbay).',
      },
      {
        heading: '2. Kepatuhan TLD .gay & Perlindungan Seluruh Makhluk Hidup',
        body: 'Pengguna wajib mematuhi kebijakan registri TLD .gay dan hukum internasional yang berlaku. vz.gay memperluas prinsip anti-pelecehan dan anti-kekerasan bawaan .gay agar melindungi bukan hanya manusia, melainkan seluruh makhluk hidup (hewan serta flora dan fauna dilindungi). Dilarang keras menerbitkan, mengunggah, atau menautkan ujaran kebencian (anti-LGBTQ+ atau diskriminasi SARA), konten eksploitasi anak (CSAM), kekejaman terhadap hewan (animal cruelty), perusakan atau eksploitasi satwa dan ekologi ilegal, narkotika ilegal, perdagangan manusia, senjata api, kekerasan terhadap makhluk hidup mana pun, phishing, malware, maupun aktivitas kriminal lainnya.',
      },
      {
        heading: '3. Konten Buatan Pengguna (UGC) & Domain Publik',
        body: 'Konten yang diterbitkan pengguna melalui pub.vz.gay, view.vz.gay, go-blog.vz.gay, links.vz.gay, business.vz.gay, atau builder.vz.gay sepenuhnya menjadi tanggung jawab pembuat konten. Pengelola berhak menangguhkan akses atau menghapus konten secara sepihak apabila melanggar hukum, DMCA, atau ketentuan keselamatan ekosistem.',
      },
      {
        heading: '4. Layanan Lokal & Transfer Sementara',
        body: 'Pengguna memahami bahwa mail.vz.gay menyimpan data kotak surat secara lokal di perangkat pengguna dan files.vz.gay memproses transfer sementara melalui API pihak ketiga tanpa retensi permanen di server vz.gay. Pengguna bertanggung jawab mencadangkan berkas penting miliknya.',
      },
    ],
    privacySections: [
      {
        heading: '1. Identitas Terpusat (accounts.vz.gay & myaccount.vz.gay)',
        body: 'Autentikasi lintas layanan menggunakan Auth0 SSO pada accounts.vz.gay dan pengelolaan profil di myaccount.vz.gay. Kami hanya memproses informasi akun minimum (nama pengguna, alamat email, dan preferensi profil) yang diperlukan untuk menjaga sesi aktif antar subdomain.',
      },
      {
        heading: '2. Prinsip Minimasi Data & Penyimpanan Perangkat',
        body: 'Aplikasi produktivitas VZ Desk mendukung format sumber ringan (.md, .csv, .svg, .typ, .vcf) dan opsi enkripsi offline .enc (MyVault). Email di mail.vz.gay disimpan lokal di perangkat Anda, sementara verifikasi usia 21+ di portal ini diproses secara lokal di browser tanpa mengirim tanggal lahir ke peladen pelacakan iklan.',
      },
      {
        heading: '3. Keamanan Jaringan & Pembatasan IP Regional Cloudflare',
        body: 'Seluruh lalu lintas domain *.vz.gay dilindungi oleh lapisan keamanan edge Cloudflare untuk mitigasi DDoS, SSL/TLS, dan penegakan pembatasan wilayah IP pada layanan terbatas seperti 21zone.vz.gay sesuai regulasi yurisdiksi setempat.',
      },
      {
        heading: '4. Hak Akses, Koreksi & Penghapusan Data',
        body: 'Anda dapat meninjau, memperbarui, atau meminta penghapusan data akun kapan saja melalui dasbor myaccount.vz.gay atau dengan menghubungi tim dukungan resmi di support.vz.gay.',
      },
    ],
    abuse: {
      heading: 'Formulir Laporan Abuse, Phishing & Penghapusan DMCA',
      intro:
        'Gunakan formulir ini untuk melaporkan tautan berbahaya, phishing, pelanggaran hak cipta (DMCA), spam, atau pelanggaran aturan TLD .gay pada subdomain mana pun di bawah vz.gay.',
      categories: [
        { value: 'dmca', label: 'Pelanggaran Hak Cipta / DMCA Takedown' },
        { value: 'phishing', label: 'Phishing, Penipuan atau Malware' },
        { value: 'tld_violation', label: 'Ujaran Kebencian / Pelanggaran Kebijakan TLD .gay' },
        { value: 'animal_eco', label: 'Kekerasan / Kekejaman terhadap Hewan & Eksploitasi Satwa / Ekologi' },
        { value: 'illegal', label: 'Konten Ilegal / CSAM / Kekerasan (Prioritas Darurat)' },
        { value: 'spam', label: 'Spam / Penyalahgunaan Form, Links, atau Mail' },
      ],
      categoryLabel: 'Jenis Pelanggaran',
      targetUrlLabel: 'URL atau Subdomain Terlapor',
      targetUrlPlaceholder: 'contoh: https://links.vz.gay/contoh atau https://pub.vz.gay/...',
      reporterNameLabel: 'Nama Pelapor / Pemegang Hak',
      reporterNamePlaceholder: 'Nama lengkap atau perwakilan organisasi',
      reporterEmailLabel: 'Email Kontak Pelapor',
      reporterEmailPlaceholder: 'nama@domain.com',
      detailsLabel: 'Rincian Bukti & Kronologi',
      detailsPlaceholder:
        'Jelaskan lokasi konten, dasar kepemilikan hak cipta (untuk DMCA), atau bukti penyalahgunaan secara ringkas...',
      goodFaithLabel:
        'Saya menyatakan dengan itikad baik bahwa informasi dalam laporan ini akurat dan penggunaan materi terlapor tidak diizinkan oleh pemilik hak atau melanggar ketentuan layanan vz.gay.',
      submitBtn: 'Kirim Laporan & Buat Nomor Tiket',
      validationRequired: 'Lengkapi URL terlapor, nama, email valid, rincian bukti, dan centang pernyataan itikad baik.',
      ticketSuccessTitle: 'Laporan Tercatat — Nomor Referensi Dibuat',
      ticketSuccessDesc:
        'Simpan nomor tiket di bawah ini. Untuk eskalasi cepat ke tim Trust & Safety, klik tombol kirim email langsung atau buka tiket di support.vz.gay.',
      copyTicket: 'Salin ID Tiket',
      copied: 'Tersalin',
      escalateMail: 'Kirim via Email (abuse@vz.gay)',
      escalateSupport: 'Buka Tiket di support.vz.gay',
      recentHistoryTitle: 'Riwayat Laporan di Browser Ini',
    },
  },
  en: {
    kicker: 'Compliance & Governance Center · vz.gay',
    title: 'Legal, Privacy & Abuse / DMCA Reporting',
    subtitle:
      'Unified Terms of Service, cross-service Privacy Policy (covering mail, links, desk, games, and builder), and an interactive Abuse & DMCA takedown submission portal.',
    tabs: {
      terms: 'Terms of Service',
      privacy: 'Privacy Policy',
      abuse: 'Abuse / DMCA Report',
    },
    termsSections: [
      {
        heading: '1. Scope & Corporate Umbrella',
        body: 'All platforms under *.vz.gay (including desk.vz.gay, view.vz.gay, pub.vz.gay, mail.vz.gay, links.vz.gay, games.vz.gay, play.vz.gay, app.vz.gay, builder.vz.gay, go-blog.vz.gay, blog.vz.gay, business.vz.gay, codeplace.vz.gay, wonderplace.vz.gay, and green.vz.gay) as well as jajanserver.com operate under PT Galeri Langkah Bahagia Yuwana (galbay).',
      },
      {
        heading: '2. .gay TLD Compliance & Protection for All Living Beings',
        body: 'All users must adhere to .gay registry rules and international law. vz.gay expands the foundational .gay anti-harassment and non-violence standard beyond humans to protect all living beings (including animals, wildlife, and protected flora and fauna). Hate speech (including anti-LGBTQ+ harassment), child exploitation (CSAM), animal cruelty, illegal wildlife exploitation or ecological violence, illegal drugs, human trafficking, firearms, violence toward any living creature, phishing, malware, and criminal conduct are strictly prohibited.',
      },
      {
        heading: '3. User-Generated Content (UGC) & Public Subdomains',
        body: 'Content published by users on pub.vz.gay, view.vz.gay, go-blog.vz.gay, links.vz.gay, business.vz.gay, or builder.vz.gay remains the sole responsibility of its author. We reserve the right to suspend or remove violating content immediately upon abuse or DMCA verification.',
      },
      {
        heading: '4. Local-First & Ephemeral Transfer Services',
        body: 'Users acknowledge that mail.vz.gay stores mailbox messages locally on the user device and files.vz.gay delegates ephemeral uploads via external APIs without permanent storage on vz.gay servers. Users remain responsible for maintaining encrypted backups of important files.',
      },
    ],
    privacySections: [
      {
        heading: '1. Unified Identity (accounts.vz.gay & myaccount.vz.gay)',
        body: 'Cross-service authentication uses Auth0 SSO on accounts.vz.gay and profile settings on myaccount.vz.gay. We process only the minimum account metadata (username, email address, and profile settings) required to keep sessions consistent across subdomains.',
      },
      {
        heading: '2. Data Minimization & On-Device Storage',
        body: 'VZ Desk relies on compact plain-text source formats (.md, .csv, .svg, .typ, .vcf) with optional offline .enc encryption (MyVault). Email messages in mail.vz.gay stay on your local device, and 21+ age confirmation on this portal is evaluated locally in your browser without ad-tracking telemetry.',
      },
      {
        heading: '3. Edge Security & Cloudflare Regional IP Compliance',
        body: 'Traffic across *.vz.gay is protected by Cloudflare edge security for DDoS mitigation, TLS encryption, and regional IP enforcement on age-restricted zones such as 21zone.vz.gay to respect local laws.',
      },
      {
        heading: '4. Data Access, Correction & Deletion Rights',
        body: 'You may inspect, update, or request deletion of your account information at any time via myaccount.vz.gay or by contacting our support team at support.vz.gay.',
      },
    ],
    abuse: {
      heading: 'Abuse, Phishing & DMCA Takedown Intake',
      intro:
        'Use this form to report malicious links, phishing, copyright infringement (DMCA), spam, or .gay TLD policy violations across any vz.gay subdomain.',
      categories: [
        { value: 'dmca', label: 'Copyright Infringement / DMCA Takedown' },
        { value: 'phishing', label: 'Phishing, Fraud or Malware' },
        { value: 'tld_violation', label: 'Hate Speech / .gay TLD Policy Violation' },
        { value: 'animal_eco', label: 'Animal Cruelty, Wildlife Exploitation & Ecological Harm' },
        { value: 'illegal', label: 'Illegal Content / CSAM / Violence (Urgent)' },
        { value: 'spam', label: 'Spam / Form, Links, or Mail Abuse' },
      ],
      categoryLabel: 'Violation Category',
      targetUrlLabel: 'Reported URL or Subdomain',
      targetUrlPlaceholder: 'e.g. https://links.vz.gay/example or https://pub.vz.gay/...',
      reporterNameLabel: 'Reporter / Rights Holder Name',
      reporterNamePlaceholder: 'Full name or organization representative',
      reporterEmailLabel: 'Reporter Contact Email',
      reporterEmailPlaceholder: 'name@domain.com',
      detailsLabel: 'Evidence & Description',
      detailsPlaceholder:
        'Describe the offending URL, proof of copyright ownership (for DMCA), or abuse details...',
      goodFaithLabel:
        'I state in good faith that the information provided in this report is accurate and that the reported material is unauthorized or violates vz.gay Terms of Service.',
      submitBtn: 'Submit Report & Generate Ticket ID',
      validationRequired:
        'Please complete the target URL, reporter name, valid email, details, and check the good-faith statement.',
      ticketSuccessTitle: 'Report Recorded — Reference Ticket Generated',
      ticketSuccessDesc:
        'Save your reference ID below. For immediate Trust & Safety triage, send the pre-filled email escalation or open a ticket on support.vz.gay.',
      copyTicket: 'Copy Ticket ID',
      copied: 'Copied',
      escalateMail: 'Send via Email (abuse@vz.gay)',
      escalateSupport: 'Open Ticket on support.vz.gay',
      recentHistoryTitle: 'Recent Submissions in This Browser',
    },
  },
} as const;

export function LegalPage({ lang, activeTab, onNavigate }: LegalPageProps) {
  const t = LEGAL_COPY[lang];
  const [category, setCategory] = useState('dmca');
  const [targetUrl, setTargetUrl] = useState('');
  const [reporterName, setReporterName] = useState('');
  const [reporterEmail, setReporterEmail] = useState('');
  const [details, setDetails] = useState('');
  const [goodFaith, setGoodFaith] = useState(false);
  const [formError, setFormError] = useState('');
  const [latestTicket, setLatestTicket] = useState<SubmittedTicket | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [history, setHistory] = useState<SubmittedTicket[]>(() => {
    try {
      const raw = localStorage.getItem(TICKET_HISTORY_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Ignore storage errors
    }
    return [];
  });

  useEffect(() => {
    setFormError('');
  }, [activeTab]);

  const handleSubmitAbuse = (e: FormEvent) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      !targetUrl.trim() ||
      !reporterName.trim() ||
      !emailPattern.test(reporterEmail.trim()) ||
      !details.trim() ||
      !goodFaith
    ) {
      setFormError(t.abuse.validationRequired);
      return;
    }

    setFormError('');
    const randomCode = Math.random().toString(36).slice(2, 6).toUpperCase();
    const ticket: SubmittedTicket = {
      id: `VZ-ABUSE-${new Date().getFullYear()}-${randomCode}`,
      category,
      targetUrl: targetUrl.trim(),
      reporterEmail: reporterEmail.trim(),
      submittedAt: new Date().toISOString().slice(0, 10),
    };

    const nextHistory = [ticket, ...history].slice(0, 5);
    setHistory(nextHistory);
    setLatestTicket(ticket);
    try {
      localStorage.setItem(TICKET_HISTORY_KEY, JSON.stringify(nextHistory));
    } catch {
      // Ignore storage errors
    }

    setTargetUrl('');
    setDetails('');
    setGoodFaith(false);
  };

  const handleCopyTicket = async (id: string) => {
    try {
      await navigator.clipboard.writeText(id);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId(null), 1500);
    } catch {
      // Ignore clipboard failure
    }
  };

  const tabItems: { id: LegalTab; label: string; icon: typeof Scale }[] = [
    { id: 'terms', label: t.tabs.terms, icon: Scale },
    { id: 'privacy', label: t.tabs.privacy, icon: Lock },
    { id: 'abuse', label: t.tabs.abuse, icon: FileWarning },
  ];

  const mailtoSubject = latestTicket
    ? `[${latestTicket.id}] ${latestTicket.category.toUpperCase()} Report: ${latestTicket.targetUrl}`
    : '[VZ Legal] Abuse / DMCA Report';
  const mailtoBody = latestTicket
    ? `Ticket Ref: ${latestTicket.id}\nTarget URL: ${latestTicket.targetUrl}\nReporter Email: ${latestTicket.reporterEmail}`
    : '';

  return (
    <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-14">
      <div className="max-w-3xl">
        <p className="font-mono text-xs text-blue-600 dark:text-blue-400">{t.kicker}</p>
        <h1 className="mt-1.5 font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white text-balance">
          {t.title}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* Interactive Legal Route Tabs */}
      <div
        role="tablist"
        aria-label={t.title}
        className="mt-7 inline-flex flex-wrap items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-[#151922] border border-slate-200/80 dark:border-[#232732]"
      >
        {tabItems.map((tab) => {
          const active = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onNavigate(legalTabToPath(tab.id))}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                active
                  ? 'bg-white dark:bg-[#232938] text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'terms' && (
          <div className="rounded-xl bg-white dark:bg-[#13161C] border border-slate-200 dark:border-[#232732] divide-y divide-slate-200/80 dark:divide-[#232732]">
            {t.termsSections.map((sec) => (
              <div key={sec.heading} className="p-6 sm:p-7">
                <h2 className="font-display text-base sm:text-lg font-semibold text-slate-900 dark:text-white">
                  {sec.heading}
                </h2>
                <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
                  {sec.body}
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="rounded-xl bg-white dark:bg-[#13161C] border border-slate-200 dark:border-[#232732] divide-y divide-slate-200/80 dark:divide-[#232732]">
            {t.privacySections.map((sec) => (
              <div key={sec.heading} className="p-6 sm:p-7">
                <h2 className="font-display text-base sm:text-lg font-semibold text-slate-900 dark:text-white">
                  {sec.heading}
                </h2>
                <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
                  {sec.body}
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'abuse' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8 p-6 sm:p-7 rounded-xl bg-white dark:bg-[#13161C] border border-slate-200 dark:border-[#232732]">
              <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
                {t.abuse.heading}
              </h2>
              <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.abuse.intro}
              </p>

              {latestTicket && (
                <div className="mt-5 p-4 sm:p-5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/25 border border-emerald-200 dark:border-emerald-900/60 space-y-3">
                  <div className="flex items-start gap-2.5 text-emerald-900 dark:text-emerald-300">
                    <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-display text-sm font-semibold">
                        {t.abuse.ticketSuccessTitle}
                      </h3>
                      <p className="mt-1 text-xs sm:text-sm leading-relaxed">
                        {t.abuse.ticketSuccessDesc}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 px-3.5 py-2.5 rounded-lg bg-white dark:bg-[#0E1117] border border-emerald-200/80 dark:border-emerald-900/50">
                    <span className="font-mono text-sm font-semibold text-slate-900 dark:text-white tabular-nums">
                      {latestTicket.id}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyTicket(latestTicket.id)}
                      className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedId === latestTicket.id ? t.abuse.copied : t.abuse.copyTicket}</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={`mailto:abuse@vz.gay?subject=${encodeURIComponent(mailtoSubject)}&body=${encodeURIComponent(mailtoBody)}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition-colors whitespace-nowrap"
                    >
                      <span>{t.abuse.escalateMail}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="https://support.vz.gay"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-[#191E29] border border-slate-200 dark:border-[#2A303E] rounded-lg hover:border-blue-500/60 transition-colors whitespace-nowrap"
                    >
                      <span>{t.abuse.escalateSupport}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmitAbuse} className="mt-6 space-y-4">
                <div>
                  <label
                    htmlFor="abuse-category"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-200"
                  >
                    {t.abuse.categoryLabel}
                  </label>
                  <select
                    id="abuse-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1.5 w-full px-3.5 py-2.5 text-sm rounded-lg bg-white dark:bg-[#0E1117] border border-slate-300 dark:border-[#2A303E] text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                  >
                    {t.abuse.categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="abuse-target-url"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-200"
                  >
                    {t.abuse.targetUrlLabel}
                  </label>
                  <input
                    id="abuse-target-url"
                    type="text"
                    required
                    value={targetUrl}
                    onChange={(e) => setTargetUrl(e.target.value)}
                    placeholder={t.abuse.targetUrlPlaceholder}
                    className="mt-1.5 w-full px-3.5 py-2.5 text-sm rounded-lg bg-white dark:bg-[#0E1117] border border-slate-300 dark:border-[#2A303E] text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="abuse-reporter-name"
                      className="block text-xs font-semibold text-slate-700 dark:text-slate-200"
                    >
                      {t.abuse.reporterNameLabel}
                    </label>
                    <input
                      id="abuse-reporter-name"
                      type="text"
                      required
                      value={reporterName}
                      onChange={(e) => setReporterName(e.target.value)}
                      placeholder={t.abuse.reporterNamePlaceholder}
                      className="mt-1.5 w-full px-3.5 py-2.5 text-sm rounded-lg bg-white dark:bg-[#0E1117] border border-slate-300 dark:border-[#2A303E] text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="abuse-reporter-email"
                      className="block text-xs font-semibold text-slate-700 dark:text-slate-200"
                    >
                      {t.abuse.reporterEmailLabel}
                    </label>
                    <input
                      id="abuse-reporter-email"
                      type="email"
                      required
                      value={reporterEmail}
                      onChange={(e) => setReporterEmail(e.target.value)}
                      placeholder={t.abuse.reporterEmailPlaceholder}
                      className="mt-1.5 w-full px-3.5 py-2.5 text-sm rounded-lg bg-white dark:bg-[#0E1117] border border-slate-300 dark:border-[#2A303E] text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="abuse-details"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-200"
                  >
                    {t.abuse.detailsLabel}
                  </label>
                  <textarea
                    id="abuse-details"
                    rows={4}
                    required
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder={t.abuse.detailsPlaceholder}
                    className="mt-1.5 w-full px-3.5 py-2.5 text-sm rounded-lg bg-white dark:bg-[#0E1117] border border-slate-300 dark:border-[#2A303E] text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                  />
                </div>

                <label className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 dark:bg-[#0E1117] border border-slate-200 dark:border-[#232732] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={goodFaith}
                    onChange={(e) => setGoodFaith(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600 shrink-0"
                  />
                  <span className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {t.abuse.goodFaithLabel}
                  </span>
                </label>

                {formError && (
                  <p role="alert" className="text-xs sm:text-sm font-medium text-rose-600 dark:text-rose-400">
                    {formError}
                  </p>
                )}

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.abuse.submitBtn}</span>
                </button>
              </form>
            </div>

            {/* Sidebar: Direct Escalation Channels & Local Reference History */}
            <div className="lg:col-span-4 space-y-4">
              <div className="p-5 rounded-xl bg-white dark:bg-[#13161C] border border-slate-200 dark:border-[#232732] space-y-3">
                <h3 className="font-display text-sm font-semibold text-slate-900 dark:text-white">
                  {lang === 'id' ? 'Kanal Kepatuhan Lintas Layanan' : 'Cross-Service Compliance Channels'}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {lang === 'id'
                    ? 'Seluruh pelaporan untuk mail.vz.gay, links.vz.gay, desk.vz.gay, view/pub.vz.gay, games.vz.gay, builder.vz.gay, codeplace.vz.gay, wonderplace.vz.gay, dan layanan komunitas ditangani terpusat.'
                    : 'Reports covering mail.vz.gay, links.vz.gay, desk.vz.gay, view/pub.vz.gay, games.vz.gay, builder.vz.gay, codeplace.vz.gay, wonderplace.vz.gay, and community apps are handled centrally.'}
                </p>
                <div className="pt-2 border-t border-slate-100 dark:border-[#1E232D] space-y-2 text-xs font-mono">
                  <a
                    href="mailto:abuse@vz.gay"
                    className="flex items-center justify-between text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <span>abuse@vz.gay</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://support.vz.gay"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <span>support.vz.gay</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {history.length > 0 && (
                <div className="p-5 rounded-xl bg-white dark:bg-[#13161C] border border-slate-200 dark:border-[#232732] space-y-3">
                  <h3 className="font-display text-sm font-semibold text-slate-900 dark:text-white">
                    {t.abuse.recentHistoryTitle}
                  </h3>
                  <div className="divide-y divide-slate-100 dark:divide-[#1E232D]">
                    {history.map((item) => (
                      <div key={item.id} className="py-2.5 first:pt-0 last:pb-0 text-xs">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono font-semibold text-slate-900 dark:text-white tabular-nums">
                            {item.id}
                          </span>
                          <span className="font-mono text-slate-400 tabular-nums">
                            {item.submittedAt}
                          </span>
                        </div>
                        <p className="mt-0.5 text-slate-500 dark:text-slate-400 truncate">
                          {item.targetUrl}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
