export type ServiceStatus = 'live' | 'development' | 'coming_soon';

export type ServiceCategory =
  | 'web_business'
  | 'media_content'
  | 'developer_cloud'
  | 'productivity'
  | 'education'
  | 'system_community';

export type ServiceIconName =
  | 'search'
  | 'layout-grid'
  | 'globe'
  | 'pen-line'
  | 'file-up'
  | 'store'
  | 'gamepad-2'
  | 'code-2'
  | 'cloud'
  | 'webhook'
  | 'sparkles'
  | 'mail'
  | 'film'
  | 'music'
  | 'image'
  | 'credit-card'
  | 'graduation-cap'
  | 'database'
  | 'feather'
  | 'smile'
  | 'compass'
  | 'heart-handshake'
  | 'briefcase'
  | 'box'
  | 'palette'
  | 'clapperboard'
  | 'pen-tool'
  | 'clipboard-list'
  | 'file-text'
  | 'presentation'
  | 'table-2'
  | 'calculator'
  | 'trending-up'
  | 'bar-chart-3'
  | 'notebook-pen'
  | 'newspaper'
  | 'git-branch'
  | 'message-square'
  | 'users'
  | 'contact'
  | 'book-open'
  | 'library'
  | 'book-marked'
  | 'layers'
  | 'link-2'
  | 'user-circle'
  | 'wrench'
  | 'megaphone'
  | 'server'
  | 'headphones'
  | 'messages-square'
  | 'shield-alert'
  | 'activity'
  | 'building-2'
  | 'eye-off'
  | 'heart-pulse'
  | 'sun'
  | 'video'
  | 'leaf';

export interface LiveChildApp {
  name: string;
  domain: string;
  altDomain?: string;
  kind: 'app' | 'game' | 'demo';
  description: {
    id: string;
    en: string;
  };
}

export interface RedirectRule {
  from: string;
  to: string;
  code: 301;
}

export interface ServiceHighlight {
  label: {
    id: string;
    en: string;
  };
  value: {
    id: string;
    en: string;
  };
}

export interface ComplianceNotice {
  title: {
    id: string;
    en: string;
  };
  items: {
    id: string;
    en: string;
  }[];
}

export interface VzService {
  id: string;
  primaryDomain: string;
  launchUrl?: string;
  altDomains?: string[];
  category: ServiceCategory;
  secondaryCategories?: ServiceCategory[];
  status: ServiceStatus;
  iconName: ServiceIconName;
  ageRestricted?: boolean;
  name: {
    id: string;
    en: string;
  };
  shortType: {
    id: string;
    en: string;
  };
  description: {
    id: string;
    en: string;
  };
  architectureNotes?: {
    id: string;
    en: string;
  };
  highlights?: ServiceHighlight[];
  complianceNotice?: ComplianceNotice;
  clientDomainPatterns?: string[];
  redirectRules?: RedirectRule[];
  liveChildren?: LiveChildApp[];
  sponsor?: string;
}

export type VzDeskGroupId =
  | 'documents_publishing'
  | 'visual_3d'
  | 'analytics_math'
  | 'communication';

export interface VzDeskTool {
  id: string;
  domain: string;
  group: VzDeskGroupId;
  iconName: ServiceIconName;
  name: {
    id: string;
    en: string;
  };
  reference: {
    id: string;
    en: string;
  };
  description: {
    id: string;
    en: string;
  };
  formatNote: {
    id: string;
    en: string;
  };
}

export const VZ_DESK_APPS: VzDeskTool[] = [
  // Documents & Publishing
  {
    id: 'desk-docs',
    domain: 'docs.vz.gay',
    group: 'documents_publishing',
    iconName: 'file-text',
    name: { id: 'VZ Docs', en: 'VZ Docs' },
    reference: {
      id: 'Pengolah Kata & Dokumen (Ekspor DOC/DOCX, PDF, .md)',
      en: 'Word Processor & Documents (Export DOC/DOCX, PDF, .md)',
    },
    description: {
      id: 'Editor dokumen kolaboratif ringan berbasis teks polos (.md) dengan kompresi media WebP/AVIF, autosave SSO, serta dukungan ekspor langsung ke format dokumen kantor DOC/DOCX, ODT, dan PDF.',
      en: 'Lightweight collaborative document editor built on plain text (.md) with WebP/AVIF media compression, SSO autosave, and direct export to office document formats DOC/DOCX, ODT, and PDF.',
    },
    formatNote: {
      id: 'Sumber .md + ekspor DOC/DOCX & PDF · Bundel offline terenkripsi .enc (MyVault)',
      en: '.md source + DOC/DOCX & PDF export · Offline encrypted .enc bundle (MyVault)',
    },
  },
  {
    id: 'desk-sheets',
    domain: 'sheets.vz.gay',
    group: 'documents_publishing',
    iconName: 'table-2',
    name: { id: 'VZ Sheets', en: 'VZ Sheets' },
    reference: {
      id: 'Lembar Kerja & Spreadsheet (Ekspor XLS/XLSX, CSV)',
      en: 'Spreadsheet & Tabular Data (Export XLS/XLSX, CSV)',
    },
    description: {
      id: 'Lembar kerja data tabular berkecepatan tinggi berbasis .csv yang mendukung impor dan ekspor langsung ke format spreadsheet kantor XLS/XLSX, ODS, maupun PDF.',
      en: 'High-speed tabular spreadsheet workspace backed by lightweight .csv storage with full import and export support for office spreadsheet formats XLS/XLSX, ODS, and PDF.',
    },
    formatNote: {
      id: 'Sumber .csv ringan · Ekspor/impor XLS/XLSX & rencana integrasi NurDB (Segera Hadir)',
      en: 'Lightweight .csv source · XLS/XLSX export/import & planned NurDB sync (Coming Soon)',
    },
  },
  {
    id: 'desk-presentations',
    domain: 'presentations.vz.gay',
    group: 'documents_publishing',
    iconName: 'presentation',
    name: { id: 'VZ Presentations', en: 'VZ Presentations' },
    reference: {
      id: 'Slide Presentasi (Ekspor PPT/PPTX, PDF)',
      en: 'Slide Decks & Presentations (Export PPT/PPTX, PDF)',
    },
    description: {
      id: 'Pembuat slide presentasi modern berbasis struktur teks polos yang ringan, siap ditampilkan layar penuh di browser, serta dapat diekspor ke format presentasi kantor PPT/PPTX dan PDF.',
      en: 'Modern plain-text-backed slide deck creator with fullscreen browser presenter view and direct export to office presentation formats PPT/PPTX and PDF.',
    },
    formatNote: {
      id: 'Slide berbasis teks polos (---) · Ekspor PPT/PPTX, PDF & visual WebP/AVIF',
      en: 'Plain-text slide decks (---) · Export to PPT/PPTX, PDF & WebP/AVIF visuals',
    },
  },
  {
    id: 'desk-forms',
    domain: 'forms.vz.gay',
    group: 'documents_publishing',
    iconName: 'clipboard-list',
    name: { id: 'VZ Forms', en: 'VZ Forms' },
    reference: {
      id: 'Formulir & Survei Online (Ekspor CSV, XLS/XLSX)',
      en: 'Online Forms & Surveys (Export CSV, XLS/XLSX)',
    },
    description: {
      id: 'Pembuat formulir survei, pendaftaran, dan kuesioner publik dengan validasi kolom otomatis yang menyimpan respons ke VZ Sheets serta dapat diunduh dalam format CSV maupun XLS/XLSX.',
      en: 'Public survey, registration, and questionnaire builder with automated field validation that streams responses to VZ Sheets and exports to CSV or XLS/XLSX.',
    },
    formatNote: {
      id: 'Formulir publik instan · Ekspor respons ke VZ Sheets, CSV & XLS/XLSX',
      en: 'Instant public forms · Export responses to VZ Sheets, CSV & XLS/XLSX',
    },
  },
  {
    id: 'desk-diary',
    domain: 'diary.vz.gay',
    group: 'documents_publishing',
    iconName: 'notebook-pen',
    name: { id: 'VZ Diary', en: 'VZ Diary' },
    reference: {
      id: 'Buku Catatan & Jurnal Digital (Ekspor .md, DOCX, PDF)',
      en: 'Digital Notebooks & Journals (Export .md, DOCX, PDF)',
    },
    description: {
      id: 'Ruang buku catatan multi-bab, kliping ide, dan jurnal pribadi dengan penandaan YAML frontmatter, tautan silang antar catatan, serta ekspor ke DOC/DOCX, PDF, atau arsip terenkripsi .enc.',
      en: 'Multi-section digital notebooks, idea clippings, and personal journals with YAML metadata, cross-note backlinks, and export to DOC/DOCX, PDF, or encrypted .enc archives.',
    },
    formatNote: {
      id: 'Markdown + YAML Frontmatter · Ekspor DOCX/PDF & arsip offline .enc (MyVault)',
      en: 'Markdown + YAML Frontmatter · DOCX/PDF export & offline .enc vaults (MyVault)',
    },
  },
  {
    id: 'desk-press',
    domain: 'press.vz.gay',
    group: 'documents_publishing',
    iconName: 'newspaper',
    name: { id: 'VZ Press', en: 'VZ Press' },
    reference: {
      id: 'Tata Letak Cetak & Publikasi (Ekspor PDF Cetak, DOCX)',
      en: 'Desktop Publishing & Print Layout (Export Print PDF, DOCX)',
    },
    description: {
      id: 'Alat tata letak publikasi desktop untuk menyusun brosur, buletin, pamflet, zine, dan dokumen siap cetak berpresisi tinggi dengan ekspor PDF resolusi cetak serta DOC/DOCX.',
      en: 'Precision desktop publishing workspace for brochures, newsletters, pamphlets, and print-ready layouts with press-grade PDF and DOC/DOCX export.',
    },
    formatNote: {
      id: 'Sumber tata letak ringan (.typ / HTML+CSS) · Ekspor PDF siap cetak & DOCX',
      en: 'Lightweight layout source (.typ / HTML+CSS) · Print-ready PDF & DOCX output',
    },
  },

  // Visual, 3D & Diagrams
  {
    id: 'desk-craft',
    domain: 'craft.vz.gay',
    group: 'visual_3d',
    iconName: 'box',
    name: { id: 'VZ Craft', en: 'VZ Craft' },
    reference: {
      id: 'Studio Pemodelan Objek 3D (Ekspor .obj, .stl, .gltf)',
      en: '3D Object Modeling Studio (Export .obj, .stl, .gltf)',
    },
    description: {
      id: 'Studio pemodelan 3D berbasis browser untuk merancang, menginspeksi mesh, dan mengekspor aset objek 3D (.obj, .stl, .gltf) secara langsung tanpa instalasi perangkat lunak berat.',
      en: 'Browser-native 3D modeling workspace to design, inspect meshes, and export 3D object (.obj, .stl, .gltf) assets directly online without heavy desktop software.',
    },
    formatNote: {
      id: 'Ekspor standar .obj / .stl / .gltf · Ringan dijalankan langsung di browser',
      en: 'Standard .obj / .stl / .gltf export · Runs smoothly in the browser',
    },
  },
  {
    id: 'desk-design',
    domain: 'design.vz.gay',
    group: 'visual_3d',
    iconName: 'palette',
    name: { id: 'VZ Design', en: 'VZ Design' },
    reference: {
      id: 'Studio Desain Grafis & Olah Gambar (WebP, AVIF, PNG, SVG, PDF)',
      en: 'Graphic Design & Image Editor (WebP, AVIF, PNG, SVG, PDF)',
    },
    description: {
      id: 'Studio desain grafis berbasis layer dan penyuntingan foto di browser untuk membuat poster, materi publikasi, serta aset visual dengan ekspor ke WebP, AVIF, PNG, JPG, SVG, dan PDF.',
      en: 'Layer-based graphic design studio and raster/vector image editor in the browser for posters, visual layouts, and social assets with export to WebP, AVIF, PNG, JPG, SVG, and PDF.',
    },
    formatNote: {
      id: 'Ekspor multi-format WebP/AVIF, PNG, SVG & PDF · Terhubung dengan media.vz.gay',
      en: 'Multi-format WebP/AVIF, PNG, SVG & PDF export · Integrated with media.vz.gay',
    },
  },
  {
    id: 'desk-motion',
    domain: 'motion.vz.gay',
    group: 'visual_3d',
    iconName: 'clapperboard',
    name: { id: 'VZ Motion', en: 'VZ Motion' },
    reference: {
      id: 'Pembuat & Editor Animasi (Ekspor SVG, WebM, MP4, GIF)',
      en: 'Animation Maker & Timeline Editor (Export SVG, WebM, MP4, GIF)',
    },
    description: {
      id: 'Studio animasi berbasis timeline keyframe di browser untuk menyusun motion graphics, animasi vektor, dan klip interaktif dengan ekspor ke SVG animasi, WebM, MP4, atau GIF.',
      en: 'Keyframe timeline animation studio in the browser for motion graphics, vector animations, and interactive clips with export to animated SVG, WebM, MP4, or GIF.',
    },
    formatNote: {
      id: 'Timeline keyframe ringan · Ekspor SVG animasi, WebM, MP4, atau GIF',
      en: 'Lightweight keyframe timeline · Export animated SVG, WebM, MP4, or GIF',
    },
  },
  {
    id: 'desk-draw',
    domain: 'draw.vz.gay',
    group: 'visual_3d',
    iconName: 'pen-tool',
    name: { id: 'VZ Draw', en: 'VZ Draw' },
    reference: {
      id: 'Kanvas Gambar & Ilustrasi Vektor (Ekspor .svg, PNG, PDF)',
      en: 'Vector Drawing & Illustration Canvas (Export .svg, PNG, PDF)',
    },
    description: {
      id: 'Kanvas gambar vektor bebas berbasis SVG/JSON ringan untuk membuat ilustrasi garis, sketsa teknis, dan bagan visual yang dapat diekspor ke .svg, PNG, PDF, atau disematkan ke VZ Docs & Presentations.',
      en: 'Freeform vector drawing canvas stored as lightweight SVG/JSON for line illustrations, technical sketches, and visual callouts with .svg, PNG, and PDF export.',
    },
    formatNote: {
      id: 'Vektor murni .svg / JSON · Ekspor PNG/PDF & sematkan langsung ke dokumen',
      en: 'Pure .svg / JSON vector format · PNG/PDF export & direct document embedding',
    },
  },
  {
    id: 'desk-flowcharts',
    domain: 'flowcharts.vz.gay',
    group: 'visual_3d',
    iconName: 'git-branch',
    name: { id: 'VZ Flowcharts', en: 'VZ Flowcharts' },
    reference: {
      id: 'Diagram Alur & Arsitektur Sistem (Ekspor SVG, PNG, PDF)',
      en: 'Flowcharts & System Architecture Diagrams (Export SVG, PNG, PDF)',
    },
    description: {
      id: 'Perangkat pembuat diagram alur kerja (flowchart), peta jaringan, ERD basis data, dan arsitektur sistem yang memadukan editor node visual dengan kode deklaratif serta ekspor ke SVG, PNG, dan PDF.',
      en: 'Workflow flowchart, network topology, database ERD, and system architecture diagramming tool combining a visual node canvas with declarative syntax and SVG, PNG, and PDF export.',
    },
    formatNote: {
      id: 'Kanvas node visual + sintaks deklaratif · Ekspor SVG, PNG & PDF presisi',
      en: 'Visual node canvas + declarative syntax · Crisp SVG, PNG & PDF export',
    },
  },

  // Analytics & Quantitative
  {
    id: 'desk-math',
    domain: 'math.vz.gay',
    group: 'analytics_math',
    iconName: 'calculator',
    name: { id: 'VZ Math', en: 'VZ Math' },
    reference: {
      id: 'Kalkulator Ilmiah & Editor Persamaan (LaTeX, MathML, CSV)',
      en: 'Scientific Calculator & Equation Workbench (LaTeX, MathML, CSV)',
    },
    description: {
      id: 'Kalkulator ilmiah online, pembuat grafik fungsi multi-variabel, serta penyusun notasi persamaan matematika yang dapat diekspor ke LaTeX, MathML, SVG, atau disisipkan ke VZ Docs.',
      en: 'Online scientific calculator, multi-variable function plotter, and mathematical equation workbench with export to LaTeX, MathML, SVG, and VZ Docs.',
    },
    formatNote: {
      id: 'Ekspor notasi LaTeX / MathML & grafik SVG · Siap disematkan ke VZ Docs',
      en: 'LaTeX / MathML notation & SVG plot export · Ready to embed into VZ Docs',
    },
  },
  {
    id: 'desk-ekonometrics',
    domain: 'ekonometrics.vz.gay',
    group: 'analytics_math',
    iconName: 'trending-up',
    name: { id: 'VZ Ekonometrics', en: 'VZ Ekonometrics' },
    reference: {
      id: 'Analisis Ekonometrika & Statistik (Impor/Ekspor CSV, XLS/XLSX)',
      en: 'Econometrics & Statistical Analysis (Import/Export CSV, XLS/XLSX)',
    },
    description: {
      id: 'Perangkat analisis ekonometrika, regresi linier/panel, pemodelan deret waktu, dan uji hipotesis statistik di browser dengan dukungan impor/ekspor dataset CSV, XLS/XLSX, serta laporan PDF.',
      en: 'Browser-based econometrics, regression, time-series modeling, and statistical hypothesis suite supporting CSV and XLS/XLSX dataset import/export and PDF reports.',
    },
    formatNote: {
      id: 'Impor/ekspor dataset .csv & XLS/XLSX · Rencana integrasi NurDB (Segera Hadir)',
      en: 'Import/export .csv & XLS/XLSX datasets · Planned NurDB pipeline (Coming Soon)',
    },
  },
  {
    id: 'desk-metrics',
    domain: 'metrics.vz.gay',
    group: 'analytics_math',
    iconName: 'bar-chart-3',
    name: { id: 'VZ Metrics', en: 'VZ Metrics' },
    reference: {
      id: 'Analitik Trafik Web & Telemetri (Ekspor Laporan CSV, XLS/XLSX, PDF)',
      en: 'Web Traffic & Product Telemetry Analytics (Export CSV, XLS/XLSX, PDF)',
    },
    description: {
      id: 'Dasbor analitik kunjungan situs web, pemantauan konversi, peta interaksi halaman, dan metrik performa aplikasi yang ringan serta ramah privasi dengan ekspor laporan ke CSV, XLS/XLSX, dan PDF.',
      en: 'Lightweight, privacy-conscious web traffic analytics, conversion funnel tracking, and application performance metrics with report exports to CSV, XLS/XLSX, and PDF.',
    },
    formatNote: {
      id: 'Skrip telemetri ringan · Ekspor laporan CSV/XLSX & rencana sinkronisasi NurDB',
      en: 'Minimal telemetry script · CSV/XLSX report export & planned NurDB sync',
    },
  },

  // Communication & People
  {
    id: 'desk-chat',
    domain: 'chat.vz.gay',
    group: 'communication',
    iconName: 'message-square',
    name: { id: 'VZ Chat', en: 'VZ Chat' },
    reference: {
      id: 'Pesan Instan & Ruang Kolaborasi Tim (Terhubung VZ Mail)',
      en: 'Instant Messaging & Team Channels (Connected to VZ Mail)',
    },
    description: {
      id: 'Layanan pesan instan, kanal diskusi proyek, dan kolaborasi tim real-time yang terhubung langsung dengan utas surat elektronik di mail.vz.gay serta akun SSO.',
      en: 'Real-time instant messaging, project channels, and team collaboration workspace directly bridged with email threads on mail.vz.gay and SSO identity.',
    },
    formatNote: {
      id: 'Terhubung langsung dengan mail.vz.gay · Ekspor riwayat obrolan ke .txt / .json',
      en: 'Directly bridged with mail.vz.gay · Export chat archives to .txt / .json',
    },
  },
  {
    id: 'desk-groups',
    domain: 'groups.vz.gay',
    group: 'communication',
    iconName: 'users',
    name: { id: 'VZ Groups', en: 'VZ Groups' },
    reference: {
      id: 'Milis, Forum Diskusi Tim & Manajemen Hak Akses',
      en: 'Mailing Lists, Team Forums & Access Groups',
    },
    description: {
      id: 'Pengelolaan grup diskusi, milis komunitas, dan pengaturan hak akses kolaborasi dokumen tim secara terpusat untuk seluruh layanan di dalam VZ Desk.',
      en: 'Centralized discussion groups, mailing lists, and team document permission management across all VZ Desk applications.',
    },
    formatNote: {
      id: 'Sinkron dengan mail.vz.gay, chat.vz.gay & izin berbagi berkas VZ Desk',
      en: 'Synced with mail.vz.gay, chat.vz.gay & VZ Desk file sharing permissions',
    },
  },
  {
    id: 'desk-contacts',
    domain: 'contacts.vz.gay',
    group: 'communication',
    iconName: 'contact',
    name: { id: 'VZ Contacts', en: 'VZ Contacts' },
    reference: {
      id: 'Buku Alamat & Direktori Kontak (Ekspor/Impor .vcf, .csv, XLSX)',
      en: 'Address Book & Contact Directory (Export/Import .vcf, .csv, XLSX)',
    },
    description: {
      id: 'Buku alamat dan direktori kontak pribadi maupun organisasi berbasis standar terbuka vCard (.vcf) dengan fitur impor/ekspor ke CSV serta XLS/XLSX yang tersinkron dengan VZ Mail & VZ Chat.',
      en: 'Personal and organizational address book built on open vCard (.vcf) standards with CSV and XLS/XLSX import/export, synced across VZ Mail and VZ Chat.',
    },
    formatNote: {
      id: 'Standar terbuka .vcf + ekspor/impor CSV & XLSX · Rencana sinkronisasi NurDB',
      en: 'Open .vcf standard + CSV & XLSX export/import · Planned NurDB directory sync',
    },
  },
];

export function deskToolToService(tool: VzDeskTool): VzService {
  return {
    id: tool.id,
    primaryDomain: tool.domain,
    category: 'productivity',
    status: 'live',
    iconName: tool.iconName,
    name: tool.name,
    shortType: tool.reference,
    description: tool.description,
    architectureNotes: {
      id: `Sudah aktif (Live) sebagai bagian dari suite VZ Desk (desk.vz.gay). ${tool.formatNote.id}. Mendukung ekspor ke format standar industri & perkantoran (DOC/DOCX, XLS/XLSX, PPT/PPTX, PDF, CSV, SVG), publikasi UGC publik ke view.vz.gay dan pub.vz.gay, autentikasi SSO (accounts.vz.gay), enkripsi offline .enc lewat myvault.app.vz.gay, serta rencana integrasi dengan NurDB (nurdb.vz.gay — Segera Hadir / Belum Tersedia).`,
      en: `Live as part of the VZ Desk suite (desk.vz.gay). ${tool.formatNote.en}. Supports industry and office file exports (DOC/DOCX, XLS/XLSX, PPT/PPTX, PDF, CSV, SVG), public UGC publishing via view.vz.gay and pub.vz.gay, SSO autosave (accounts.vz.gay), optional offline .enc encryption via myvault.app.vz.gay, and future integration with NurDB (nurdb.vz.gay — Coming Soon / Not Yet Available).`,
    },
    highlights: [
      {
        label: { id: 'Payung Suite & Publikasi UGC', en: 'Parent Suite & Public UGC Publishing' },
        value: {
          id: 'VZ Desk (desk.vz.gay) · Publikasi publik via view.vz.gay & pub.vz.gay',
          en: 'VZ Desk (desk.vz.gay) · Public publishing via view.vz.gay & pub.vz.gay',
        },
      },
      {
        label: { id: 'Format & Ekspor', en: 'Formats & Export' },
        value: tool.formatNote,
      },
      {
        label: { id: 'Rencana Integrasi', en: 'Planned Integrations' },
        value: {
          id: 'MyVault (.enc) · VZ Media · NurDB (nurdb.vz.gay — Segera Hadir)',
          en: 'MyVault (.enc) · VZ Media · NurDB (nurdb.vz.gay — Coming Soon)',
        },
      },
    ],
  };
}

export const VZ_SERVICES: VzService[] = [
  {
    id: 'search',
    primaryDomain: 'search.vz.gay',
    category: 'productivity',
    status: 'live',
    iconName: 'search',
    name: {
      id: 'VZ Search',
      en: 'VZ Search',
    },
    shortType: {
      id: 'Mesin Pencari Web',
      en: 'Web Search Engine',
    },
    description: {
      id: 'Mesin pencari web utama di ekosistem vz.gay untuk menelusuri informasi dan layanan lintas web secara cepat.',
      en: 'Primary web search engine in the vz.gay ecosystem for fast discovery across the open web and network services.',
    },
    architectureNotes: {
      id: 'Sudah aktif dan terhubung langsung dengan bilah pencarian utama di halaman beranda vz.gay.',
      en: 'Live in production and integrated directly with the main search bar on the vz.gay home portal.',
    },
  },
  {
    id: 'files',
    primaryDomain: 'files.vz.gay',
    altDomains: ['file.vz.gay'],
    category: 'productivity',
    status: 'live',
    iconName: 'file-up',
    name: {
      id: 'VZ Files',
      en: 'VZ Files',
    },
    shortType: {
      id: 'Transfer File Sementara',
      en: 'Ephemeral File Transfer',
    },
    description: {
      id: 'Layanan berbagi dan transfer file sementara menggunakan API VikingFiles tanpa menyimpan berkas di server vz.gay.',
      en: 'Temporary file transfer powered by the VikingFiles API without storing user files on vz.gay servers.',
    },
    architectureNotes: {
      id: 'Sudah aktif dengan URL kanonik SEO https://files.vz.gay dan alias file.vz.gay. Seluruh unggahan ditangani melalui API VikingFiles tanpa penyimpanan server.',
      en: 'Live with SEO canonical https://files.vz.gay and alias file.vz.gay. All uploads are delegated cleanly to the VikingFiles API with zero server storage.',
    },
  },
  {
    id: 'demo-jajanan',
    primaryDomain: 'demo.jajanan.online',
    category: 'developer_cloud',
    secondaryCategories: ['web_business'],
    status: 'live',
    iconName: 'store',
    name: {
      id: 'SkripX Marketplace & Reseller Code',
      en: 'SkripX Marketplace & Reseller Code',
    },
    shortType: {
      id: 'Source Code Self-Hosted Marketplace & SaaS Reseller',
      en: 'Self-Hosted Marketplace & SaaS Reseller Code',
    },
    description: {
      id: 'Source code platform marketplace & portal reseller multi-tenant siap Self-Hosted (termasuk layanan pengecekan dokumen & kemiripan AI). Menggunakan domain tunggal demo.jajanan.online untuk edisi kode mandiri, sedangkan *.jajanan.online dialokasikan khusus untuk edisi SaaS.',
      en: 'Self-hosted multi-tenant marketplace and reseller portal source code (featuring document checking & AI similarity business modules). Hosted on the single domain demo.jajanan.online for the self-hosted code edition, while *.jajanan.online is reserved for the SaaS edition.',
    },
    clientDomainPatterns: ['demo.jajanan.online'],
    sponsor: 'jajanserver.com',
    architectureNotes: {
      id: 'Ditampilkan pada kategori Developer & Cloud (Codeplace) sekaligus Web & Bisnis. Hanya memiliki 1 domain demo resmi (demo.jajanan.online) untuk paket kode self-hosting, terpisah dari domain wildcard *.jajanan.online milik versi SaaS.',
      en: 'Indexed under both Developer & Cloud (Codeplace) and Web & Business. Uses the single dedicated domain demo.jajanan.online for self-hosted code buyers, distinct from the *.jajanan.online wildcard used by the managed SaaS platform.',
    },
  },
  {
    id: 'omnipostai',
    primaryDomain: 'omnipostai.code.vz.gay',
    category: 'developer_cloud',
    secondaryCategories: ['web_business'],
    status: 'live',
    iconName: 'sparkles',
    name: {
      id: 'OmniPost AI',
      en: 'OmniPost AI',
    },
    shortType: {
      id: 'Otomasi Konten & Penerbitan Multi-Kanal AI',
      en: 'AI Multi-Channel Content & Publishing Suite',
    },
    description: {
      id: 'Platform otomasi pembuatan konten, penjadwalan, dan penerbitan lintas kanal berbasis kecerdasan buatan yang berjalan aktif di bawah ekosistem Codeplace (*.code.vz.gay).',
      en: 'AI-driven content creation, scheduling, and multi-channel publishing platform live under the Codeplace (*.code.vz.gay) ecosystem.',
    },
    architectureNotes: {
      id: 'Sudah aktif dan dapat diakses langsung melalui omnipostai.code.vz.gay.',
      en: 'Live and directly accessible at omnipostai.code.vz.gay.',
    },
  },
  {
    id: 'lovelogicai',
    primaryDomain: 'lovelogicai.kopi.pw',
    launchUrl: 'https://lovelogicai.kopi.pw',
    category: 'media_content',
    secondaryCategories: ['developer_cloud'],
    status: 'live',
    iconName: 'heart-handshake',
    name: {
      id: 'LoveLogic AI',
      en: 'LoveLogic AI',
    },
    shortType: {
      id: 'Aplikasi Web Analisis Relasi & Logika AI',
      en: 'AI Relationship & Logic Analysis Web App',
    },
    description: {
      id: 'Aplikasi web interaktif berbasis AI untuk eksplorasi perspektif komunikasi, kompatibilitas, dan penalaran logis dalam dinamika relasi.',
      en: 'Interactive AI-powered web application exploring communication dynamics, compatibility insights, and logical reasoning in relationships.',
    },
    architectureNotes: {
      id: 'Sudah aktif dan dapat langsung diakses melalui domain klien lovelogicai.kopi.pw.',
      en: 'Live and directly accessible via client domain lovelogicai.kopi.pw.',
    },
  },
  {
    id: 'wiyataxlms',
    primaryDomain: 'wiyataxlms.code.vz.gay',
    altDomains: ['wiyataxlms.orgz.top'],
    category: 'education',
    status: 'live',
    iconName: 'graduation-cap',
    name: {
      id: 'WiyataxLMS',
      en: 'WiyataxLMS',
    },
    shortType: {
      id: 'Portal Akademik & LMS Multi-Tenant',
      en: 'Multi-Tenant Academic Portal & LMS',
    },
    description: {
      id: 'Template portal akademik & sistem manajemen pembelajaran (LMS) white-label multi-tenant siap Self-Hosted maupun SaaS Cloud dengan modul PPDB Online, Rapor Digital, Portal Siswa, CMS, AI FAQ, dan Open API.',
      en: 'Multi-tenant white-label academic portal & LMS platform ready for Self-Hosted or SaaS Cloud with Online Admissions (PPDB), Digital Gradebook, Student Portal, Theme Studio, AI FAQ, and Open API.',
    },
    architectureNotes: {
      id: 'Demo aktif di *.code.vz.gay dengan domain alias wiyataxlms.orgz.top.',
      en: 'Active demo service under *.code.vz.gay with live alias domain wiyataxlms.orgz.top.',
    },
  },
  {
    id: 'marimenulis',
    primaryDomain: 'marimenulis.web.id',
    launchUrl: 'https://www.marimenulis.web.id/',
    category: 'education',
    status: 'live',
    iconName: 'feather',
    name: {
      id: 'Mari Menulis',
      en: 'Mari Menulis',
    },
    shortType: {
      id: 'Platform Literasi & Kepenulisan',
      en: 'Writing & Literacy Portal',
    },
    description: {
      id: 'Platform ekosistem edukasi dan literasi kepenulisan Indonesia. Saat ini sudah online pada tahap awal (rilis fondasi 0) dan terus dikembangkan secara bertahap.',
      en: 'Indonesian writing and digital literacy ecosystem platform. Live in its initial foundation stage (release 0) with ongoing editorial expansion.',
    },
    architectureNotes: {
      id: 'Tersedia di marimenulis.web.id (www.marimenulis.web.id) sebagai bagian dari ekosistem edukasi dan literasi vz.gay.',
      en: 'Live at marimenulis.web.id (www.marimenulis.web.id) as part of the vz.gay education and literacy network.',
    },
  },
  {
    id: 'republikjomokerto',
    primaryDomain: 'republikjomokerto.vercel.app',
    category: 'media_content',
    status: 'live',
    iconName: 'smile',
    name: {
      id: 'Republik Jomokerto',
      en: 'Republik Jomokerto',
    },
    shortType: {
      id: 'Portal Komunitas Hiburan',
      en: 'Community & Entertainment Portal',
    },
    description: {
      id: 'Portal warga & komunitas hiburan Republik Jomokerto dengan Kartu Tanda Penjomok (KTP), link-in-bio, timeline teks dan gambar, chat real-time, serta peta hybrid Ngawi dan dunia game.',
      en: 'Republik Jomokerto entertainment community portal featuring digital citizen cards (KTP), link-in-bio, text/image timeline, real-time chat, and hybrid maps.',
    },
    architectureNotes: {
      id: 'Sudah aktif dan dapat langsung diakses di republikjomokerto.vercel.app.',
      en: 'Live and directly accessible at republikjomokerto.vercel.app.',
    },
  },
  {
    id: 'desk',
    primaryDomain: 'desk.vz.gay',
    altDomains: ['view.vz.gay', 'pub.vz.gay'],
    category: 'productivity',
    status: 'live',
    iconName: 'briefcase',
    name: {
      id: 'VZ Desk',
      en: 'VZ Desk',
    },
    shortType: {
      id: 'Suite Produktivitas & Kreatif (17 Layanan + View/Pub)',
      en: 'Productivity & Creative Suite (17 Apps + View/Pub)',
    },
    description: {
      id: 'Meja kerja digital terpadu yang sudah aktif bersama 17 sub-aplikasinya (Docs, Sheets, Presentations, Craft 3D, Design, Motion, Draw, Forms, Math, Ekonometrics, Metrics, Diary, Press, Flowcharts, Chat, Groups, Contacts) serta subdomain publikasi UGC view.vz.gay dan pub.vz.gay dengan dukungan ekspor format perkantoran (DOC/DOCX, XLS/XLSX, PPT/PPTX, PDF, CSV, SVG, OBJ, VCF).',
      en: 'Live unified cloud workspace uniting all 17 active productivity, creative, analytics, and communication apps plus public UGC publishing domains view.vz.gay and pub.vz.gay, backed by plain-text storage and full office format exports (DOC/DOCX, XLS/XLSX, PPT/PPTX, PDF, CSV, SVG, OBJ, VCF).',
    },
    clientDomainPatterns: [
      'view.vz.gay',
      'pub.vz.gay',
      'docs.vz.gay',
      'sheets.vz.gay',
      'presentations.vz.gay',
      'craft.vz.gay',
      'design.vz.gay',
      'motion.vz.gay',
      'draw.vz.gay',
      'forms.vz.gay',
      'math.vz.gay',
      'ekonometrics.vz.gay',
      'metrics.vz.gay',
      'diary.vz.gay',
      'press.vz.gay',
      'flowcharts.vz.gay',
      'chat.vz.gay',
      'groups.vz.gay',
      'contacts.vz.gay',
    ],
    liveChildren: [
      {
        name: 'VZ Desk View (UGC Viewer)',
        domain: 'view.vz.gay',
        kind: 'app',
        description: {
          id: 'Subdomain publik untuk membaca dan menampilkan hasil karya atau dokumen VZ Desk secara publik',
          en: 'Public viewer subdomain for sharing and displaying published VZ Desk creations and documents',
        },
      },
      {
        name: 'VZ Desk Pub (UGC Publishing)',
        domain: 'pub.vz.gay',
        kind: 'app',
        description: {
          id: 'Subdomain penerbitan konten buatan pengguna (UGC) langsung dari seluruh aplikasi VZ Desk',
          en: 'User-generated content (UGC) publishing endpoint for instant sharing from VZ Desk apps',
        },
      },
    ],
    architectureNotes: {
      id: 'Sudah aktif di desk.vz.gay beserta seluruh 17 sub-aplikasi dan 2 domain publikasi UGC baru (view.vz.gay & pub.vz.gay). Menyimpan berkas sumber secara hemat ruang (.md, .csv, .svg, .typ, .vcf) dengan ekspor DOC/DOCX, XLS/XLSX, PPT/PPTX, PDF, enkripsi offline .enc via myvault.app.vz.gay, serta rencana integrasi dengan NurDB (Segera Hadir / Belum Tersedia).',
      en: 'Live at desk.vz.gay along with all 17 sub-apps and 2 new public UGC publishing subdomains (view.vz.gay & pub.vz.gay). Stores compact plain-text source files (.md, .csv, .svg, .typ, .vcf) with DOC/DOCX, XLS/XLSX, PPT/PPTX, PDF exports, offline .enc encryption via myvault.app.vz.gay, and planned NurDB integration (Coming Soon / Not Yet Available).',
    },
    highlights: [
      {
        label: { id: '17 Sub-Aplikasi & Publikasi UGC', en: '17 Live Sub-Apps & UGC Domains' },
        value: {
          id: '17 sub-aplikasi produktivitas aktif + view.vz.gay & pub.vz.gay untuk penerbitan publik',
          en: 'All 17 productivity sub-apps live + view.vz.gay & pub.vz.gay for public publishing',
        },
      },
      {
        label: { id: 'Ekspor Format Kantor & Standar', en: 'Office & Open Format Exports' },
        value: {
          id: 'DOC/DOCX · XLS/XLSX · PPT/PPTX · PDF · CSV · SVG · OBJ · VCF · WebP/AVIF',
          en: 'DOC/DOCX · XLS/XLSX · PPT/PPTX · PDF · CSV · SVG · OBJ · VCF · WebP/AVIF',
        },
      },
      {
        label: { id: 'Mode Web & Offline (.enc)', en: 'Web & Offline Modes (.enc)' },
        value: {
          id: 'Autosave SSO di browser + kontainer terenkripsi AES .enc via myvault.app.vz.gay',
          en: 'Browser SSO autosave + encrypted .enc containers via myvault.app.vz.gay',
        },
      },
    ],
  },
  {
    id: 'app',
    primaryDomain: 'app.vz.gay',
    category: 'productivity',
    status: 'live',
    iconName: 'layout-grid',
    name: {
      id: 'VZ App Hub',
      en: 'VZ App Hub',
    },
    shortType: {
      id: 'Peluncur Aplikasi Web (*.app.vz.gay)',
      en: 'Web App Launcher (*.app.vz.gay)',
    },
    description: {
      id: 'Pusat aplikasi web terpadu yang sudah aktif untuk mengakses berbagai utilitas harian dan aplikasi mandiri di bawah namespace *.app.vz.gay bersama VZ Play.',
      en: 'Live unified web application launcher for accessing daily utility tools and standalone web apps under *.app.vz.gay alongside VZ Play.',
    },
    clientDomainPatterns: ['*.app.vz.gay', '*.game.vz.gay'],
    architectureNotes: {
      id: 'Sudah aktif di app.vz.gay dan bersinergi dengan play.vz.gay untuk mengindeks aplikasi utilitas *.app.vz.gay.',
      en: 'Live at app.vz.gay and paired with play.vz.gay for indexing *.app.vz.gay utility applications.',
    },
  },
  {
    id: 'mail',
    primaryDomain: 'mail.vz.gay',
    category: 'productivity',
    status: 'live',
    iconName: 'mail',
    name: {
      id: 'VZ Mail',
      en: 'VZ Mail',
    },
    shortType: {
      id: 'Email Privat Antarmuka Percakapan',
      en: 'Offline-First Conversational Email',
    },
    description: {
      id: 'Klien surat elektronik dengan tampilan gelembung percakapan cepat yang terhubung dengan chat.vz.gay. Data disimpan lokal di perangkat tanpa retensi kotak surat di server.',
      en: 'Email client with a fast conversational bubble interface connected to chat.vz.gay. Messages live locally on your device with zero server mailbox retention.',
    },
    architectureNotes: {
      id: 'Sudah aktif di mail.vz.gay dengan prinsip privasi maksimal tanpa penyimpanan email di server. Sinkronisasi antar perangkat dilakukan melalui ekspor & impor berkas cadangan terenkripsi (.eml, .mbox, .enc).',
      en: 'Live at mail.vz.gay with a privacy-first local-device architecture and zero server mailbox storage; cross-device sync works via encrypted backup files (.eml, .mbox, .enc).',
    },
  },
  {
    id: 'builder',
    primaryDomain: 'builder.vz.gay',
    category: 'web_business',
    status: 'live',
    iconName: 'globe',
    name: {
      id: 'VZ Builder',
      en: 'VZ Builder',
    },
    shortType: {
      id: 'Website Builder, Go-Blog & Marketplace Hub',
      en: 'Website Builder, Go-Blog & Marketplace Hub',
    },
    description: {
      id: 'Pembuat situs web instan berbasis cloud yang sudah aktif di builder.vz.gay dengan penerbitan cepat dan dukungan multi-domain klien (*.orgz.top, *.kopi.pw, *.web.vz.gay, *.site.vz.gay).',
      en: 'Live cloud-powered website builder at builder.vz.gay featuring rapid publishing and multi-domain client routing (*.orgz.top, *.kopi.pw, *.web.vz.gay, *.site.vz.gay).',
    },
    clientDomainPatterns: [
      '*.orgz.top',
      '*.kopi.pw',
      '*.jajanan.online',
      '*.web.vz.gay',
      '*.site.vz.gay',
    ],
    liveChildren: [
      {
        name: 'LoveLogic AI',
        domain: 'lovelogicai.kopi.pw',
        kind: 'app',
        description: {
          id: 'Aplikasi web interaktif analisis relasi & penalaran logis berbasis AI',
          en: 'Interactive AI relationship dynamics and logical reasoning web app',
        },
      },
    ],
    architectureNotes: {
      id: 'Sudah aktif di hostname satu tingkat builder.vz.gay (menggantikan builder.cloud.vz.gay agar kompatibel penuh dengan SSL wildcard Cloudflare).',
      en: 'Live on single-level hostname builder.vz.gay (replacing builder.cloud.vz.gay for clean Cloudflare wildcard SSL support).',
    },
  },
  {
    id: 'go-blog',
    primaryDomain: 'go-blog.vz.gay',
    altDomains: ['goblog.vz.gay'],
    category: 'web_business',
    status: 'live',
    iconName: 'pen-line',
    name: {
      id: 'Go-Blog',
      en: 'Go-Blog',
    },
    shortType: {
      id: 'Platform Penerbitan Blog & Artikel',
      en: 'Blog & Article Publishing Platform',
    },
    description: {
      id: 'Platform penerbitan blog dan manajemen artikel modern yang sudah aktif di go-blog.vz.gay dan goblog.vz.gay dengan editor Markdown/WYSIWYG, umpan RSS otomatis, ekspor arsip tulisan, serta subdomain penulis *.kaca.blog.',
      en: 'Live blog and article publishing platform at go-blog.vz.gay and goblog.vz.gay featuring Markdown/rich-text editing, automatic RSS feeds, content archives, and writer subdomains under *.kaca.blog.',
    },
    clientDomainPatterns: ['*.kaca.blog'],
    redirectRules: [{ from: 'kaca.blog', to: 'https://go-blog.vz.gay', code: 301 }],
    architectureNotes: {
      id: 'Sudah aktif di go-blog.vz.gay dan goblog.vz.gay. Domain root kaca.blog diarahkan permanen (HTTP 301) ke go-blog.vz.gay, sedangkan blog.vz.gay kini berdiri sendiri sebagai blog resmi VZ.',
      en: 'Live at go-blog.vz.gay and goblog.vz.gay. Root domain kaca.blog redirects (HTTP 301) to go-blog.vz.gay, while blog.vz.gay operates independently as the official VZ Blog.',
    },
  },
  {
    id: 'blog',
    primaryDomain: 'blog.vz.gay',
    category: 'web_business',
    secondaryCategories: ['media_content'],
    status: 'live',
    iconName: 'newspaper',
    name: {
      id: 'VZ Official Blog',
      en: 'VZ Official Blog',
    },
    shortType: {
      id: 'Blog Resmi & Catatan Rilis Ekosistem',
      en: 'Official Ecosystem Blog & Release Notes',
    },
    description: {
      id: 'Publikasi resmi ekosistem vz.gay untuk pengumuman rilis layanan, artikel arsitektur teknis, panduan pengguna, dan pembaruan produk tanpa subdomain klien tingkat dua.',
      en: 'Official vz.gay publication for platform release announcements, engineering notes, user guides, and ecosystem updates on a clean dedicated domain without level-2 client subdomains.',
    },
    architectureNotes: {
      id: 'Sudah aktif di blog.vz.gay sebagai blog resmi internal VZ (tidak lagi dialihkan ke Go-Blog maupun memakai *.blog.vz.gay karena batas SSL wildcard Cloudflare pada subdomain tingkat 2).',
      en: 'Live at blog.vz.gay as the official VZ blog (no longer redirecting to Go-Blog or using *.blog.vz.gay due to Cloudflare level-2 wildcard SSL limitations).',
    },
  },
  {
    id: 'business',
    primaryDomain: 'business.vz.gay',
    category: 'web_business',
    status: 'live',
    iconName: 'store',
    name: {
      id: 'VZ Business',
      en: 'VZ Business',
    },
    shortType: {
      id: 'Generator Marketplace & Toko SaaS',
      en: 'SaaS Marketplace & Storefront Generator',
    },
    description: {
      id: 'Generator marketplace dan etalase toko online SaaS yang sudah aktif di business.vz.gay dengan subdomain bisnis instan (*.jajanan.online, *.biz.orgz.top), dilengkapi opsi paket source code self-hosted di demo.jajanan.online.',
      en: 'Live turnkey SaaS marketplace and online storefront generator at business.vz.gay with instant merchant subdomains (*.jajanan.online, *.biz.orgz.top), complemented by a self-hosted code edition at demo.jajanan.online.',
    },
    clientDomainPatterns: ['*.jajanan.online', '*.biz.orgz.top'],
    liveChildren: [
      {
        name: 'SkripX Self-Hosted Marketplace Demo',
        domain: 'demo.jajanan.online',
        kind: 'demo',
        description: {
          id: 'Demo tunggal source code marketplace & portal reseller self-hosted (edisi SaaS menggunakan *.jajanan.online)',
          en: 'Single-domain demo for the self-hosted marketplace & reseller portal code (SaaS edition uses *.jajanan.online)',
        },
      },
    ],
    sponsor: 'jajanserver.com',
    architectureNotes: {
      id: 'Sudah aktif di business.vz.gay dengan dukungan sponsor jajanserver.com. Domain wildcard *.jajanan.online dan *.biz.orgz.top digunakan untuk tenant versi SaaS, sedangkan demo.jajanan.online khusus untuk demo source code self-hosting (biz.vz.gay kini dialokasikan ke VZ Work).',
      en: 'Live at business.vz.gay and sponsored by jajanserver.com. Wildcards *.jajanan.online and *.biz.orgz.top power SaaS storefronts, while demo.jajanan.online showcases the self-hosted source code package (biz.vz.gay is now paired with VZ Work).',
    },
  },
  {
    id: 'pay',
    primaryDomain: 'pay.vz.gay',
    category: 'web_business',
    status: 'development',
    iconName: 'credit-card',
    name: {
      id: 'VZ Pay',
      en: 'VZ Pay',
    },
    shortType: {
      id: 'Gerbang Pembayaran & Transaksi',
      en: 'Payment & Checkout Gateway',
    },
    description: {
      id: 'Layanan pembayaran digital, faktur otomatis, dan manajemen transaksi terpadu untuk layanan vz.gay serta toko klien dengan ekspor mutasi CSV/XLSX.',
      en: 'Unified digital payment, automated invoicing, and transaction management service for vz.gay tools and merchant storefronts with CSV/XLSX ledger exports.',
    },
    architectureNotes: {
      id: 'Saat ini sedang dalam pengembangan dan akan terhubung dengan business.vz.gay serta SSO accounts.vz.gay.',
      en: 'Currently in development and designed to integrate with business.vz.gay and accounts.vz.gay SSO.',
    },
  },
  {
    id: 'links',
    primaryDomain: 'links.vz.gay',
    category: 'web_business',
    status: 'live',
    iconName: 'link-2',
    name: {
      id: 'VZ Links',
      en: 'VZ Links',
    },
    shortType: {
      id: 'SaaS Link-in-Bio & Pemendek Tautan',
      en: 'Link-in-Bio & URL Shortener',
    },
    description: {
      id: 'Platform SaaS untuk membuat halaman tautan profil (link-in-bio), pemendek URL cepat, pembuatan kode QR, dan statistik klik terintegrasi.',
      en: 'SaaS platform for customizable link-in-bio pages, fast short URLs, QR generation, and integrated click statistics.',
    },
    architectureNotes: {
      id: 'Sudah aktif di links.vz.gay serta dirancang terhubung dengan analitik metrics.vz.gay dan halaman profil publik profile.vz.gay/$USERNAME.',
      en: 'Live at links.vz.gay and designed to integrate with metrics.vz.gay analytics and public pages on profile.vz.gay/$USERNAME.',
    },
  },
  {
    id: 'ads',
    primaryDomain: 'ads.vz.gay',
    category: 'web_business',
    status: 'development',
    iconName: 'megaphone',
    name: {
      id: 'VZ Ads',
      en: 'VZ Ads',
    },
    shortType: {
      id: 'Jaringan Periklanan & Monetisasi Penerbit',
      en: 'Publisher Ad & Monetization Network',
    },
    description: {
      id: 'Jaringan monetisasi tampilan iklan kontekstual dan manajemen kampanye mandiri bagi penerbit situs, blog, serta aplikasi di ekosistem vz.gay.',
      en: 'Contextual display advertising and self-serve campaign monetization network for web publishers, blogs, and applications across the vz.gay ecosystem.',
    },
    architectureNotes: {
      id: 'Terintegrasi dengan pelaporan performa di metrics.vz.gay dan pencairan pendapatan melalui pay.vz.gay.',
      en: 'Designed to integrate with metrics.vz.gay performance reporting and payouts through pay.vz.gay.',
    },
  },
  {
    id: 'nurdb',
    primaryDomain: 'nurdb.vz.gay',
    category: 'developer_cloud',
    status: 'coming_soon',
    iconName: 'database',
    name: {
      id: 'NurDB',
      en: 'NurDB',
    },
    shortType: {
      id: 'Native Universal Rapid Databases (Segera Hadir / Belum Tersedia)',
      en: 'Native Universal Rapid Databases (Coming Soon / Not Yet Available)',
    },
    description: {
      id: '[SEGERA HADIR — BELUM TERSEDIA] Native Universal Rapid Databases — terinspirasi dari makna "Nur" (cahaya), rancangan basis data multi-model (Dokumen JSON + Relasional) berkecepatan tinggi dalam satu kontainer portabel (.nur) untuk self-host maupun managed cloud di masa mendatang.',
      en: '[COMING SOON — NOT YET AVAILABLE] Native Universal Rapid Databases — inspired by "Nur" (light), a planned high-velocity multi-model database engine (JSON Document + Relational) packaged in a single portable .nur vault for future self-hosted and managed cloud deployments.',
    },
    clientDomainPatterns: [
      'nurdb.vz.gay/docs',
      'cloud.vz.gay/nurdb',
      'cloud.vz.gay/console/nurdb',
      '[vault-id]-nurdb.vz.gay',
      'nurdb.vz.gay/v1/[vault-id]',
    ],
    architectureNotes: {
      id: 'STATUS: SEGERA HADIR (COMING SOON — belum tersedia dan belum masuk tahap rilis pengembangan publik). Cetak biru arsitektur mencakup dokumen JSON fleksibel (Schema-on-Read), pemodelan relasi visual antartabel, isolasi multi-vault .nur per proyek, instant CoW branching, sinkronisasi local-first, TTL ephemeral micro-DB, ekspor/impor CSV/JSON/SQL, serta rencana Fase 3 Polymorphic Query Engine.',
      en: 'STATUS: COMING SOON (not yet available and not yet in active public development release). Architectural blueprint covers schemaless JSON documents, visual relational modeling, isolated per-project multi-vault .nur packaging, instant CoW branching, local-first sync, TTL ephemeral micro-DBs, CSV/JSON/SQL import-export, and a Phase 3 Polymorphic Query Engine.',
    },
    highlights: [
      {
        label: { id: 'Status Ketersediaan', en: 'Availability Status' },
        value: {
          id: 'Segera Hadir (Coming Soon) — Saat ini belum tersedia; masih berupa rancangan arsitektur masa depan ekosistem vz.gay',
          en: 'Coming Soon — Not yet available; currently an upcoming architectural blueprint for the vz.gay ecosystem',
        },
      },
      {
        label: { id: 'Rancangan NURDB Studio', en: 'Planned NURDB Studio' },
        value: {
          id: 'Grids (Tables) · Synapse (Relations) · Lenses (Queries) · Portals (Forms) · Canvas (Reports) · Flows (Triggers)',
          en: 'Grids (Tables) · Synapse (Relations) · Lenses (Queries) · Portals (Forms) · Canvas (Reports) · Flows (Triggers)',
        },
      },
      {
        label: { id: 'Target Inovasi Inti', en: 'Planned Core Innovations' },
        value: {
          id: 'Instant Branching (<50ms) · Bundel Portabel .nur (Data + UI + Logic) · Ekspor CSV/JSON/XLSX · Auto-Expire TTL Vaults',
          en: 'Instant Branching (<50ms) · Portable .nur Bundles (Data + UI + Logic) · CSV/JSON/XLSX Export · Auto-Expire TTL Vaults',
        },
      },
      {
        label: { id: 'Rencana Keamanan Fase 3', en: 'Phase 3 Security Blueprint' },
        value: {
          id: 'Polymorphic Query Engine dengan Custom Dictionary / Tokenizer per-tenant (C/Rust/LLVM)',
          en: 'Polymorphic Query Engine with per-tenant Custom Dictionary / Tokenizer (C/Rust/LLVM)',
        },
      },
    ],
  },
  {
    id: 'codeplace',
    primaryDomain: 'codeplace.vz.gay',
    category: 'developer_cloud',
    status: 'live',
    iconName: 'code-2',
    name: {
      id: 'VZ Codeplace',
      en: 'VZ Codeplace',
    },
    shortType: {
      id: 'Katalog Source Code & Template Aplikasi',
      en: 'Source Code & App Template Marketplace',
    },
    description: {
      id: 'Pusat distribusi template aplikasi dan source code siap pakai berbasis Node.js, TypeScript, PHP, hingga aplikasi Android Kotlin yang sudah aktif di codeplace.vz.gay dan dilengkapi demo langsung.',
      en: 'Live source code and application template marketplace at codeplace.vz.gay for Node.js, TypeScript, PHP, and Kotlin Android projects, each paired with an interactive preview.',
    },
    clientDomainPatterns: ['*.code.vz.gay', 'demo.jajanan.online'],
    liveChildren: [
      {
        name: 'Lensa Studio',
        domain: 'lensastudio.code.vz.gay',
        kind: 'demo',
        description: {
          id: 'Demo aplikasi & showcase template kreatif aktif',
          en: 'Live creative studio application & template showcase',
        },
      },
      {
        name: 'WiyataxLMS',
        domain: 'wiyataxlms.code.vz.gay',
        altDomain: 'wiyataxlms.orgz.top',
        kind: 'demo',
        description: {
          id: 'Portal akademik & LMS white-label multi-tenant (PPDB Online, Rapor, CMS, AI FAQ, Open API)',
          en: 'Multi-tenant white-label academic portal & LMS (Online PPDB, Gradebook, CMS, AI FAQ, Open API)',
        },
      },
      {
        name: 'OmniPost AI',
        domain: 'omnipostai.code.vz.gay',
        kind: 'demo',
        description: {
          id: 'Platform otomasi konten & penerbitan multi-kanal berbasis AI',
          en: 'AI-powered multi-channel content creation & publishing platform',
        },
      },
      {
        name: 'SkripX Marketplace Code',
        domain: 'demo.jajanan.online',
        kind: 'demo',
        description: {
          id: 'Source code self-hosted marketplace & portal reseller multi-tenant (1 domain demo khusus kode mandiri)',
          en: 'Self-hosted multi-tenant marketplace & reseller portal code (single dedicated demo domain)',
        },
      },
    ],
    architectureNotes: {
      id: 'Sudah aktif di codeplace.vz.gay. Setiap paket kode atau template aplikasi memiliki lingkungan pratinjau langsung di bawah *.code.vz.gay atau domain demo khusus seperti demo.jajanan.online.',
      en: 'Live at codeplace.vz.gay. Every template or self-hosted code package includes a live preview environment under *.code.vz.gay or dedicated demo hostnames such as demo.jajanan.online.',
    },
  },
  {
    id: 'cloud',
    primaryDomain: 'cloud.vz.gay',
    category: 'developer_cloud',
    status: 'coming_soon',
    iconName: 'cloud',
    name: {
      id: 'VZ Cloud',
      en: 'VZ Cloud',
    },
    shortType: {
      id: 'Layanan Infrastruktur Cloud (Segera Hadir)',
      en: 'Cloud Infrastructure (Coming Soon)',
    },
    description: {
      id: '[SEGERA HADIR] Payung layanan komputasi, hosting aplikasi, konsol manajemen proyek (cloud.vz.gay/console), dan rencana Managed NurDB Cloud.',
      en: '[COMING SOON] Managed cloud umbrella for compute, app hosting, centralized project console (cloud.vz.gay/console), and future Managed NurDB Cloud.',
    },
    clientDomainPatterns: ['cloud.vz.gay/nurdb', 'cloud.vz.gay/console/nurdb'],
    sponsor: 'jajanserver.com',
    architectureNotes: {
      id: 'Berstatus Segera Hadir (Coming Soon) melalui kolaborasi infrastruktur bersama sponsor jajanserver.com.',
      en: 'Status: Coming Soon in infrastructure partnership with sponsor jajanserver.com.',
    },
  },
  {
    id: 'platform',
    primaryDomain: 'platform.vz.gay',
    category: 'developer_cloud',
    status: 'development',
    iconName: 'webhook',
    name: {
      id: 'VZ Platform API',
      en: 'VZ Platform API',
    },
    shortType: {
      id: 'Gerbang REST API & Webhook',
      en: 'REST API & Webhook Gateway',
    },
    description: {
      id: 'Dokumentasi pengembang (OpenAPI/JSON), manajemen kunci akses, dan endpoint REST API terpadu untuk mengintegrasikan seluruh layanan vz.gay.',
      en: 'Developer documentation (OpenAPI/JSON), access key management, and unified REST API endpoints connecting the vz.gay ecosystem.',
    },
    architectureNotes: {
      id: 'Menyediakan endpoint REST API standar dengan pertukaran payload JSON dan skema OpenAPI.',
      en: 'Provides standard REST API endpoints with JSON payload exchange and OpenAPI schema exports.',
    },
  },
  {
    id: 'tools',
    primaryDomain: 'tools.vz.gay',
    category: 'developer_cloud',
    status: 'development',
    iconName: 'wrench',
    name: {
      id: 'VZ Dev Tools',
      en: 'VZ Dev Tools',
    },
    shortType: {
      id: 'Utilitas Publik Developer & Konverter Format',
      en: 'Public Developer Utilities & Format Converters',
    },
    description: {
      id: 'Kumpulan alat bantu publik serbaguna untuk developer (formatter JSON/YAML/SQL, encoder/decoder, validator, inspektor payload, serta konverter dokumen & tabel CSV/JSON/XLSX cepat).',
      en: 'Collection of fast public developer utilities including JSON/YAML/SQL formatters, encoders, validators, payload inspectors, and quick CSV/JSON/XLSX format converters.',
    },
    architectureNotes: {
      id: 'Dirancang berjalan ringan langsung di browser agar instan dipakai tanpa login wajib.',
      en: 'Designed to run lightweight directly in the browser for instant access without friction.',
    },
  },
  {
    id: 'ai',
    primaryDomain: 'ai.vz.gay',
    category: 'developer_cloud',
    status: 'development',
    iconName: 'sparkles',
    name: {
      id: 'VZ AI',
      en: 'VZ AI',
    },
    shortType: {
      id: 'Ruang Kerja Kecerdasan Buatan',
      en: 'AI Tools & Workspace',
    },
    description: {
      id: 'Rangkaian alat bantu kecerdasan buatan untuk produktivitas penulisan, ringkasan dokumen (DOCX/PDF/MD), analisis data tabel (CSV/XLSX), dan otomasi alur kerja lintas VZ Desk.',
      en: 'Focused AI workspace for writing assistance, document summarization (DOCX/PDF/MD), tabular data analysis (CSV/XLSX), and workflow automation across VZ Desk.',
    },
  },
  {
    id: 'play',
    primaryDomain: 'play.vz.gay',
    category: 'media_content',
    status: 'live',
    iconName: 'gamepad-2',
    name: {
      id: 'VZ Play',
      en: 'VZ Play',
    },
    shortType: {
      id: 'Pusat Game & Aplikasi Web',
      en: 'Games & Web Apps Hub',
    },
    description: {
      id: 'Direktori game ringan dan aplikasi utilitas web interaktif yang sudah aktif di play.vz.gay bersama app.vz.gay dan games.vz.gay.',
      en: 'Live hub for browser games and interactive web utilities at play.vz.gay alongside app.vz.gay and games.vz.gay.',
    },
    clientDomainPatterns: ['*.game.vz.gay', '*.app.vz.gay'],
    liveChildren: [
      {
        name: 'MyVault',
        domain: 'myvault.app.vz.gay',
        kind: 'app',
        description: {
          id: 'Aplikasi penyimpanan catatan & mesin enkripsi berkas .enc (CipherVaultPro)',
          en: 'Personal vault and .enc file encryption engine (CipherVaultPro)',
        },
      },
      {
        name: 'PDF to Blade',
        domain: 'pdftoblade.app.vz.gay',
        kind: 'app',
        description: {
          id: 'Konversi dokumen PDF ke sintaks template HTML/Blade secara cepat',
          en: 'Fast PDF document to HTML/Blade template converter',
        },
      },
      {
        name: 'DirectQR',
        domain: 'directqr.app.vz.gay',
        kind: 'app',
        description: {
          id: 'Generator kode QR instan (ekspor PNG/SVG) tanpa perantara pelacakan',
          en: 'Instant direct QR code generator (PNG/SVG export) without tracking hops',
        },
      },
      {
        name: 'InkFrame Flipbook',
        domain: 'inkframeflipbook.game.vz.gay',
        altDomain: 'flipbook.semangatliterasi.orgz.top',
        kind: 'game',
        description: {
          id: 'Pengalaman flipbook interaktif & literasi digital',
          en: 'Interactive digital flipbook and storytelling game',
        },
      },
    ],
    architectureNotes: {
      id: 'Sudah aktif di play.vz.gay. Memisahkan namespace *.game.vz.gay untuk game dan *.app.vz.gay untuk aplikasi utilitas web non-game.',
      en: 'Live at play.vz.gay. Separates *.game.vz.gay for games and *.app.vz.gay for non-game web utilities.',
    },
  },
  {
    id: 'games',
    primaryDomain: 'games.vz.gay',
    altDomains: ['game.vz.gay'],
    category: 'media_content',
    secondaryCategories: ['developer_cloud'],
    status: 'live',
    iconName: 'gamepad-2',
    name: {
      id: 'VZ Games',
      en: 'VZ Games',
    },
    shortType: {
      id: 'Portal Mini-Games & Creator Studio',
      en: 'Mini-Games Portal & Creator Studio',
    },
    description: {
      id: 'Portal mini-games berbasis browser dan studio kreator game interaktif yang sudah aktif di games.vz.gay dan game.vz.gay di bawah ekosistem *.game.vz.gay.',
      en: 'Live browser mini-games portal and interactive game creator studio at games.vz.gay and game.vz.gay across the *.game.vz.gay ecosystem.',
    },
    clientDomainPatterns: ['*.game.vz.gay'],
    architectureNotes: {
      id: 'Sudah aktif di games.vz.gay dan alias game.vz.gay dengan studio kreator serta peluncur game ringan langsung di browser.',
      en: 'Live at games.vz.gay and alias game.vz.gay with a built-in creator studio and instant browser game launcher.',
    },
  },
  {
    id: 'wonderplace',
    primaryDomain: 'wonderplace.vz.gay',
    category: 'media_content',
    status: 'live',
    iconName: 'heart-handshake',
    name: {
      id: 'WonderPlace',
      en: 'WonderPlace',
    },
    shortType: {
      id: 'Jejaring Sosial Ruang Aman & Inklusif',
      en: 'Inclusive Safe-Space Social Network',
    },
    description: {
      id: 'Platform jejaring sosial komunitas yang sudah aktif di wonderplace.vz.gay sebagai ruang aman inklusif untuk berbagi kiriman, foto, dan interaksi berlandaskan humanisme universal sesuai ToS TLD .gay.',
      en: 'Live community social networking platform at wonderplace.vz.gay built as an inclusive safe space for sharing posts, photos, and connections rooted in universal humanism and .gay TLD Terms of Service.',
    },
    architectureNotes: {
      id: 'Sudah aktif (HTTP 200) di wonderplace.vz.gay dengan moderasi komunitas aktif untuk menjaga ruang interaksi yang aman, setara, dan bebas ujaran kebencian sesuai kebijakan TLD .gay.',
      en: 'Live (HTTP 200) at wonderplace.vz.gay and operated with active community moderation to uphold an inclusive, harassment-free environment aligned with .gay TLD policy.',
    },
  },
  {
    id: 'film',
    primaryDomain: 'film.vz.gay',
    category: 'media_content',
    status: 'development',
    iconName: 'film',
    name: {
      id: 'VZ Film',
      en: 'VZ Film',
    },
    shortType: {
      id: 'Basis Data & Ensiklopedia Sinema',
      en: 'Cinema & Film Reference Database',
    },
    description: {
      id: 'Direktori referensi film, serial, profil pemeran, kru produksi, sinopsis, serta ulasan dan penilaian kurasi komunitas.',
      en: 'Comprehensive reference database for movies, series, cast and crew credits, synopses, and community reviews.',
    },
  },
  {
    id: 'music',
    primaryDomain: 'music.vz.gay',
    category: 'media_content',
    status: 'development',
    iconName: 'music',
    name: {
      id: 'VZ Music Library',
      en: 'VZ Music Library',
    },
    shortType: {
      id: 'Pustaka Lirik, Kredit & Makna Lagu',
      en: 'Lyrics, Credits & Song Meanings Library',
    },
    description: {
      id: 'Pustaka referensi musik untuk menelusuri teks lirik, kredit pencipta lagu, metadata rilisan, dan anotasi makna lagu—bukan layanan pemutar audio streaming.',
      en: 'Curated music reference library for exploring song lyrics, composer credits, release metadata, and lyrical interpretations—not an audio streaming player.',
    },
    architectureNotes: {
      id: 'Berfokus murni pada pengarsipan teks lirik, struktur kredit karya, dan bedah makna lagu tanpa distribusi berkas audio streaming.',
      en: 'Focused strictly on lyrical text archives, songwriting credits, and meaning annotations without audio streaming playback.',
    },
  },
  {
    id: 'photo',
    primaryDomain: 'photo.vz.gay',
    category: 'media_content',
    status: 'development',
    iconName: 'image',
    name: {
      id: 'VZ Photo',
      en: 'VZ Photo',
    },
    shortType: {
      id: 'Papan Inspirasi Visual & Hosting Gambar Publik',
      en: 'Visual Moodboards & Public Image Hosting',
    },
    description: {
      id: 'Platform ganda 2-in-1 untuk menyusun papan kurasi inspirasi visual sekaligus layanan hosting tautan gambar publik yang cepat dan ringan (mendukung WebP, AVIF, PNG, JPG).',
      en: '2-in-1 visual discovery moodboard and fast public image hosting service supporting optimized WebP, AVIF, PNG, and JPG delivery.',
    },
    architectureNotes: {
      id: 'Aset visual publik dioptimalkan dengan kompresi WebP/AVIF untuk pemuatan gambar berkecepatan tinggi dan penyematan lintas dokumen.',
      en: 'Public visual uploads are optimized with WebP/AVIF compression for high-speed delivery and direct document embedding.',
    },
  },
  {
    id: 'comic',
    primaryDomain: 'comic.vz.gay',
    category: 'media_content',
    status: 'development',
    iconName: 'layers',
    name: {
      id: 'VZ Comic',
      en: 'VZ Comic',
    },
    shortType: {
      id: 'Pustaka Komik Digital (WebP/AVIF, CBZ, PDF)',
      en: 'Digital Comics Hub (WebP/AVIF, CBZ, PDF)',
    },
    description: {
      id: 'Ruang baca dan katalog komik digital independen maupun seri grafis lintas genre dengan pembaca web ringan serta dukungan arsip komik (.cbz, .pdf).',
      en: 'Reading platform and catalog for independent digital comics and graphic series with a lightweight web reader and comic archive (.cbz, .pdf) support.',
    },
  },
  {
    id: 'manga',
    primaryDomain: 'manga.vz.gay',
    category: 'media_content',
    status: 'development',
    iconName: 'book-marked',
    name: {
      id: 'VZ Manga',
      en: 'VZ Manga',
    },
    shortType: {
      id: 'Pustaka Manga Digital',
      en: 'Digital Manga Library',
    },
    description: {
      id: 'Direktori dan pembaca manga digital dengan mode gulir vertikal maupun navigasi halaman kanan-ke-kiri yang responsif di perangkat mobile dan desktop.',
      en: 'Digital manga catalog and reader supporting smooth vertical scroll and right-to-left page navigation across mobile and desktop.',
    },
  },
  {
    id: 'culture',
    primaryDomain: 'culture.vz.gay',
    category: 'education',
    status: 'development',
    iconName: 'compass',
    name: {
      id: 'VZ Culture',
      en: 'VZ Culture',
    },
    shortType: {
      id: 'Portal Edukasi Budaya Global',
      en: 'International Culture Education',
    },
    description: {
      id: 'Portal edukasi terbuka seputar sejarah, tradisi, seni, bahasa, dan warisan budaya dari berbagai penjuru dunia.',
      en: 'Open educational portal exploring history, traditions, arts, languages, and cultural heritage from around the world.',
    },
  },
  {
    id: 'books',
    primaryDomain: 'books.vz.gay',
    category: 'education',
    status: 'development',
    iconName: 'book-open',
    name: {
      id: 'VZ Books',
      en: 'VZ Books',
    },
    shortType: {
      id: 'Katalog & Buku Digital (EPUB, PDF)',
      en: 'Digital Books Catalog (EPUB, PDF)',
    },
    description: {
      id: 'Platform katalog, resensi, dan ruang baca buku digital terstruktur (mendukung format standar EPUB dan PDF) untuk literasi umum maupun akademik.',
      en: 'Structured catalog, reviews, and digital reading hub (supporting standard EPUB and PDF formats) for general and academic literature.',
    },
  },
  {
    id: 'library',
    primaryDomain: 'library.vz.gay',
    category: 'education',
    status: 'development',
    iconName: 'library',
    name: {
      id: 'VZ Library',
      en: 'VZ Library',
    },
    shortType: {
      id: 'Perpustakaan Digital Lintas Format',
      en: 'Multi-Format Digital Library',
    },
    description: {
      id: 'Perpustakaan digital serba guna yang tidak hanya menghimpun buku (EPUB/PDF), melainkan juga arsip riset, dataset (CSV/XLSX), naskah dokumen (DOCX/MD), materi ajar, dan koleksi multimedia.',
      en: 'Comprehensive digital library housing not only books (EPUB/PDF), but also research archives, datasets (CSV/XLSX), manuscripts (DOCX/MD), courseware, and multimedia collections.',
    },
  },
  {
    id: 'journal',
    primaryDomain: 'journal.vz.gay',
    category: 'education',
    status: 'development',
    iconName: 'file-text',
    name: {
      id: 'VZ Journal',
      en: 'VZ Journal',
    },
    shortType: {
      id: 'Sistem Penerbitan Jurnal Ilmiah Terbuka (PDF, DOCX, BibTeX)',
      en: 'Academic Peer-Reviewed Journal Publishing (PDF, DOCX, BibTeX)',
    },
    description: {
      id: 'Sistem manajemen dan penerbitan jurnal ilmiah akses terbuka untuk pengiriman naskah (DOC/DOCX, LaTeX, PDF), proses telaah sejawat (peer-review), pengindeksan metadata DOI/BibTeX, dan publikasi riset.',
      en: 'Open-access academic journal management and publishing platform for manuscript submissions (DOC/DOCX, LaTeX, PDF), peer-review workflows, DOI/BibTeX metadata indexing, and research publication.',
    },
  },
  {
    id: 'green',
    primaryDomain: 'green.vz.gay',
    category: 'education',
    secondaryCategories: ['system_community'],
    status: 'development',
    iconName: 'leaf',
    name: {
      id: 'VZ Green',
      en: 'VZ Green',
    },
    shortType: {
      id: 'Edukasi Lingkungan, Jejak Karbon & Konservasi Flora-Fauna',
      en: 'Environmental Education, Carbon Index & Conservation Hub',
    },
    description: {
      id: 'Layanan edukasi lingkungan hidup, komunitas pegiat dan aktivis kelestarian alam, pelacak indeks jejak karbon (carbon footprint) harian, serta pusat konservasi flora, fauna, dan perlindungan hewan. Melalui VZ Green, vz.gay memperluas kebijakan anti-kekerasan bawaan TLD .gay agar melindungi bukan hanya manusia, melainkan seluruh makhluk hidup.',
      en: 'Environmental education platform, conservation activist community, daily carbon footprint index tracker, and flora, fauna, and animal welfare protection hub. Through VZ Green, vz.gay expands the foundational .gay TLD anti-harassment and non-violence policy to protect not only humans, but all living beings.',
    },
    architectureNotes: {
      id: 'Memadukan modul literasi ekologi, kalkulator indeks emisi karbon harian, direktori aksi konservasi flora & fauna, jaringan relawan lingkungan, serta penegakan prinsip anti-kekerasan lintas spesies yang selaras dengan perluasan kebijakan di vz.gay/legal.',
      en: 'Combines ecological literacy modules, a daily carbon footprint index calculator, flora and fauna conservation action directories, an environmental activist network, and cross-species anti-cruelty safeguards aligned with the expanded vz.gay/legal policy.',
    },
    highlights: [
      {
        label: { id: 'Indeks Jejak Karbon Harian', en: 'Daily Carbon Footprint Index' },
        value: {
          id: 'Pelacakan emisi harian transportasi, energi & pola konsumsi lengkap dengan target pengurangan bertahap',
          en: 'Daily emissions tracking across transit, energy & habits with actionable reduction benchmarks',
        },
      },
      {
        label: { id: 'Konservasi Flora, Fauna & Satwa', en: 'Flora, Fauna & Animal Protection' },
        value: {
          id: 'Edukasi keanekaragaman hayati, pemetaan habitat, serta kampanye perlindungan & kesejahteraan hewan',
          en: 'Biodiversity literacy, habitat awareness, and wildlife conservation & animal welfare advocacy',
        },
      },
      {
        label: { id: 'Komunitas Pegiat & Aktivis Lingkungan', en: 'Environmental Activist Community' },
        value: {
          id: 'Ruang kolaborasi aksi hijau, proyek penghijauan, dan pelaporan isu kerusakan ekologi secara terbuka',
          en: 'Collaborative hub for green initiatives, reforestation drives, and transparent ecological advocacy',
        },
      },
      {
        label: { id: 'Perluasan Kebijakan Non-Kekerasan .gay', en: 'Expanded .gay All-Beings Protection' },
        value: {
          id: 'Melindungi seluruh makhluk hidup (manusia, hewan & ekosistem) dari kekerasan, pelecehan, dan kekejaman',
          en: 'Protecting all living beings (humans, animals & ecosystems) from violence, harassment, and cruelty',
        },
      },
    ],
  },
  {
    id: 'cdn',
    primaryDomain: 'cdn.vz.gay',
    category: 'system_community',
    status: 'development',
    iconName: 'server',
    name: {
      id: 'VZ CDN',
      en: 'VZ CDN',
    },
    shortType: {
      id: 'Layanan Sistem & Distribusi Aset',
      en: 'System Service & Content Delivery',
    },
    description: {
      id: 'Jaringan distribusi konten (CDN) internal & publik untuk mempercepat pengiriman aset statis di seluruh ekosistem vz.gay.',
      en: 'System-level content delivery network accelerating static assets across the vz.gay ecosystem and user deployments.',
    },
    clientDomainPatterns: [
      'cdn.vz.gay',
      '$RANDOM-GENERATED_$ZONE-OR-NODES_$USER-cdn.vz.gay',
    ],
    architectureNotes: {
      id: 'Mendukung endpoint zona/node khusus pengguna dengan format $RANDOM-GENERATED_$ZONE-OR-NODES_$USER-cdn.vz.gay.',
      en: 'Supports per-user zone/node distribution hostnames using the $RANDOM-GENERATED_$ZONE-OR-NODES_$USER-cdn.vz.gay pattern.',
    },
  },
  {
    id: 'media',
    primaryDomain: 'media.vz.gay',
    category: 'system_community',
    status: 'development',
    iconName: 'image',
    name: {
      id: 'VZ Media',
      en: 'VZ Media',
    },
    shortType: {
      id: 'Layanan Sistem Media Terpusat',
      en: 'Centralized Media System',
    },
    description: {
      id: 'Layanan sistem penyimpanan, optimasi format (WebP/AVIF), dan penyajian aset media bersama bagi seluruh aplikasi vz.gay.',
      en: 'Core media hosting, format optimization (WebP/AVIF), and delivery service shared across vz.gay applications.',
    },
  },
  {
    id: 'profile',
    primaryDomain: 'profile.vz.gay/$USERNAME',
    launchUrl: 'https://profile.vz.gay',
    category: 'system_community',
    status: 'development',
    iconName: 'user-circle',
    name: {
      id: 'VZ Profile',
      en: 'VZ Profile',
    },
    shortType: {
      id: 'Profil Publik Kustom Pengguna',
      en: 'Customizable Public Profiles',
    },
    description: {
      id: 'Halaman profil publik terpusat (profile.vz.gay/$USERNAME) yang dapat diatur, dikustomisasi tampilannya, dan dihubungkan dengan layanan ekosistem.',
      en: 'Customizable public user profile page (profile.vz.gay/$USERNAME) with flexible layout settings and ecosystem links.',
    },
    clientDomainPatterns: ['profile.vz.gay/$USERNAME'],
  },
  {
    id: 'support',
    primaryDomain: 'support.vz.gay',
    category: 'system_community',
    status: 'development',
    iconName: 'headphones',
    name: {
      id: 'VZ Support',
      en: 'VZ Support',
    },
    shortType: {
      id: 'Pusat Dukungan, Tiket, Panel Teknisi & AI Agents',
      en: 'Support Center, Ticketing, Tech Panel & AI Agents',
    },
    description: {
      id: 'Pusat layanan pelanggan (CS) dan dukungan teknis terdedikasi untuk seluruh ekosistem vz.gay—dilengkapi sistem tiket (ticketing), Panel Teknisi (Tech Panel), Panel Pelanggan (Customer Panel), Live Chat real-time, serta kotak obrolan agen AI (AI Agents Chatbox).',
      en: 'Dedicated customer service and technical support center for the vz.gay ecosystem featuring multi-tier ticketing, Technician Panel, Customer Panel, real-time Live Chat, and an interactive AI Agents Chatbox.',
    },
    architectureNotes: {
      id: 'Dirancang dengan pemisahan antarmuka Panel Pelanggan dan Panel Teknisi/CS, triase tiket otomatis oleh agen AI, live chat eskalasi manusia, serta pusat pelaporan abuse/DMCA terpadu.',
      en: 'Architected with dedicated Customer and Technician/CS panels, AI agent triage chatbox, human live chat escalation, and unified abuse/DMCA intake.',
    },
    highlights: [
      {
        label: { id: 'Panel & Kanal Layanan', en: 'Panels & Service Channels' },
        value: {
          id: 'Customer Panel · Technician Panel · Sistem Tiket Multi-Prioritas · Live Chat Real-Time',
          en: 'Customer Panel · Technician Panel · Multi-Priority Ticketing · Real-Time Live Chat',
        },
      },
      {
        label: { id: 'Otomasi Agen AI', en: 'AI Agent Automation' },
        value: {
          id: 'AI Agents Chatbox untuk diagnosa awal, panduan layanan, dan eskalasi tiket otomatis',
          en: 'AI Agents Chatbox for guided troubleshooting, service guidance, and automated ticket routing',
        },
      },
    ],
  },
  {
    id: 'health',
    primaryDomain: 'health.vz.gay',
    category: 'system_community',
    secondaryCategories: ['education'],
    status: 'development',
    iconName: 'heart-pulse',
    name: {
      id: 'VZ Health',
      en: 'VZ Health',
    },
    shortType: {
      id: 'Portal Berita RSS Kesehatan & Linimasa Dukungan Pemulihan',
      en: 'Health RSS Aggregator & Recovery Community Timeline',
    },
    description: {
      id: 'Pusat informasi kesehatan yang menghimpun umpan RSS berita dan artikel dari kanal resmi kementerian kesehatan/pemerintah serta portal medis terpercaya, dipadukan dengan linimasa komunitas dukungan pemulihan publik berformat timeline seperti di republikjomokerto.game.vz.gay.',
      en: 'Public health hub aggregating RSS news and medical articles from official government health ministries and trusted medical portals, paired with an open recovery & wellness community timeline modeled after republikjomokerto.game.vz.gay.',
    },
    architectureNotes: {
      id: 'Menggabungkan agregasi feed RSS kesehatan terkurasi dengan ruang komunitas pemulihan publik berbasis timeline kronologis (kiriman teks, foto, catatan progres, dan dukungan sesama anggota).',
      en: 'Combines curated health RSS feed aggregation with a chronological public recovery support timeline (text updates, progress logs, media posts, and peer encouragement).',
    },
    highlights: [
      {
        label: { id: 'Agregasi Feed RSS Kesehatan', en: 'Health RSS Feed Aggregation' },
        value: {
          id: 'Kanal berita resmi kementerian kesehatan, otoritas medis pemerintah & blog kesehatan terverifikasi',
          en: 'Official government health ministry bulletins & verified medical portal RSS feeds',
        },
      },
      {
        label: { id: 'Linimasa Komunitas Pemulihan', en: 'Recovery Community Timeline' },
        value: {
          id: 'Format timeline publik interaktif seperti di republikjomokerto.game.vz.gay untuk dukungan pemulihan apa pun',
          en: 'Interactive public timeline format modeled after republikjomokerto.game.vz.gay for open recovery support',
        },
      },
    ],
  },
  {
    id: 'fit',
    primaryDomain: 'fit.vz.gay',
    category: 'productivity',
    secondaryCategories: ['system_community'],
    status: 'development',
    iconName: 'activity',
    name: {
      id: 'VZ Fit',
      en: 'VZ Fit',
    },
    shortType: {
      id: 'Pelacak BMI/IMT, Workout Harian & Hub Olahraga Terpadu',
      en: 'BMI/IMT Tracker, Daily Workouts & Unified Fitness Hub',
    },
    description: {
      id: 'Platform kebugaran dan olahraga untuk memantau BMI/IMT serta jadwal workout harian. Menyediakan satu dasbor terpadu di mana pengguna dapat login dan menghubungkan berbagai aplikasi pelacak kesehatan, lari, maupun perangkat olahraga eksternal ke satu tempat, dilengkapi timeline komunitas olahraga seperti di republikjomokerto.game.vz.gay.',
      en: 'Sports and fitness platform for monitoring BMI/IMT and daily workout routines. Offers a unified dashboard where users sign in once to link external health trackers, running apps, and wearable ecosystems, plus a sports community timeline modeled after republikjomokerto.game.vz.gay.',
    },
    architectureNotes: {
      id: 'Satu akun VZ untuk sinkronisasi konektor OAuth lintas layanan kebugaran dan pelacak lari eksternal ke satu dasbor metrik terpusat, ditambah feed linimasa komunitas olahraga.',
      en: 'Single VZ sign-in with OAuth connectors linking external health, fitness, and running platforms into one unified dashboard alongside a public sports community timeline.',
    },
    highlights: [
      {
        label: { id: 'Pelacakan Tubuh & Latihan', en: 'Body & Workout Tracking' },
        value: {
          id: 'Kalkulator & riwayat BMI/IMT · Target workout harian · Catatan lari, kalori & durasi latihan',
          en: 'BMI/IMT calculator & trends · Daily workout logs · Distance, pace & session duration tracking',
        },
      },
      {
        label: { id: 'Konektor Lintas Layanan & Timeline', en: 'Cross-App Connectors & Timeline' },
        value: {
          id: '1 aplikasi terpadu untuk menghubungkan pelacak kesehatan/olahraga eksternal + timeline komunitas ala republikjomokerto.game.vz.gay',
          en: '1 unified hub connecting external health & activity trackers + community timeline modeled after republikjomokerto.game.vz.gay',
        },
      },
    ],
  },
  {
    id: 'menfess',
    primaryDomain: 'menfess.vz.gay',
    category: 'media_content',
    secondaryCategories: ['system_community'],
    status: 'development',
    iconName: 'eye-off',
    name: {
      id: 'VZ Menfess',
      en: 'VZ Menfess',
    },
    shortType: {
      id: 'Pesan Anonim, Kiriman Publik & Ruang Chat Anonim',
      en: 'Anonymous Confessions, Posts & Chat Rooms',
    },
    description: {
      id: 'Platform layanan menfess, papan kiriman anonim, tanya-jawab publik, serta obrolan anonim dengan fitur lebih kaya—mendukung kotak pesan terjadwal, balasan berutas, kartu visual siap bagikan, dan filter moderasi keselamatan.',
      en: 'Feature-rich anonymous confession, Q&A post board, and anonymous chat platform supporting scheduled drops, threaded replies, shareable visual cards, and active safety moderation filters.',
    },
    architectureNotes: {
      id: 'Dirancang dengan kontrol privasi pengirim, penyaringan kata kasar otomatis, dukungan sematan ke media sosial, dan kepatuhan penuh terhadap standar keselamatan TLD .gay.',
      en: 'Built with sender-privacy safeguards, automated abuse filtering, social card exports, and strict .gay TLD safety compliance.',
    },
  },
  {
    id: 'talk',
    primaryDomain: 'talk.vz.gay',
    category: 'productivity',
    secondaryCategories: ['system_community'],
    status: 'development',
    iconName: 'video',
    name: {
      id: 'VZ Talk',
      en: 'VZ Talk',
    },
    shortType: {
      id: 'Panggilan Suara & Rapat Video WebRTC',
      en: 'Browser WebRTC Voice & Video Meetings',
    },
    description: {
      id: 'Layanan telepon suara dan konferensi video real-time berbasis WebRTC langsung dari browser tanpa perlu memasang aplikasi tambahan—mendukung ruang rapat instan, berbagi layar, dan obrolan teks sesi.',
      en: 'Real-time voice calling and video conferencing powered by browser-native WebRTC with instant meeting rooms, screen sharing, and session chat without extra software installs.',
    },
    architectureNotes: {
      id: 'Menggunakan koneksi WebRTC terenkripsi peer-to-peer / SFU dengan tautan ruang cepat yang terintegrasi dengan chat.vz.gay dan VZ Desk.',
      en: 'Powered by encrypted WebRTC peer-to-peer / SFU rooms with instant shareable links bridged to chat.vz.gay and VZ Desk.',
    },
  },
  {
    id: 'work',
    primaryDomain: 'work.vz.gay',
    altDomains: ['biz.vz.gay'],
    category: 'web_business',
    secondaryCategories: ['productivity'],
    status: 'development',
    iconName: 'building-2',
    name: {
      id: 'VZ Work',
      en: 'VZ Work',
    },
    shortType: {
      id: 'Ruang Kerja Enterprise, CRM & Operasional Tim',
      en: 'Enterprise Workspace, CRM & Team Operations',
    },
    description: {
      id: 'Platform ruang kerja terpadu untuk perusahaan dan tim (enterprise workspace) mencakup manajemen CRM pelanggan, pipeline penjualan, papan tugas proyek, penjadwalan, persetujuan dokumen, serta operasional tim di work.vz.gay dan biz.vz.gay.',
      en: 'Unified enterprise workspace for organizations and teams featuring CRM pipelines, project task boards, scheduling, internal approvals, and team operations across work.vz.gay and biz.vz.gay.',
    },
    architectureNotes: {
      id: 'Domain biz.vz.gay kini dialokasikan khusus bersama work.vz.gay sebagai portal ruang kerja enterprise terintegrasi dengan suite VZ Desk dan SSO accounts.vz.gay.',
      en: 'Domain biz.vz.gay is now dedicated alongside work.vz.gay as the enterprise workspace portal integrated with VZ Desk and accounts.vz.gay SSO.',
    },
  },
  {
    id: 'spiritual-group',
    primaryDomain: 'religion.vz.gay',
    altDomains: ['religi.vz.gay', 'spiritual.vz.gay', 'consiousness.vz.gay'],
    category: 'education',
    secondaryCategories: ['system_community'],
    status: 'development',
    iconName: 'sun',
    name: {
      id: 'VZ Religion, Spiritual & Consiousness',
      en: 'VZ Religion, Spiritual & Consiousness',
    },
    shortType: {
      id: 'Grup Edukasi Keagamaan, Spiritualitas & Kesadaran Diri',
      en: 'Religion, Spirituality & Consciousness Suite',
    },
    description: {
      id: 'Satu grup layanan terpadu untuk studi lintas agama dan literatur keagamaan (religion.vz.gay / religi.vz.gay), ruang refleksi spiritualitas (spiritual.vz.gay), serta kajian kesadaran diri dan ketenangan batin (consiousness.vz.gay).',
      en: 'One unified service group covering comparative religious studies and literature (religion.vz.gay / religi.vz.gay), spiritual reflection spaces (spiritual.vz.gay), and mindfulness and consciousness exploration (consiousness.vz.gay).',
    },
    clientDomainPatterns: [
      'religion.vz.gay',
      'religi.vz.gay',
      'spiritual.vz.gay',
      'consiousness.vz.gay',
    ],
    architectureNotes: {
      id: 'Menghimpun empat subdomain tematik (religion.vz.gay, religi.vz.gay, spiritual.vz.gay, dan consiousness.vz.gay) ke dalam satu kesatuan grup ruang belajar dan refleksi yang inklusif.',
      en: 'Unifies four thematic subdomains (religion.vz.gay, religi.vz.gay, spiritual.vz.gay, and consiousness.vz.gay) under one cohesive, inclusive learning and reflection hub.',
    },
  },
  {
    id: 'forum',
    primaryDomain: 'forum.vz.gay',
    category: 'system_community',
    status: 'development',
    iconName: 'messages-square',
    name: {
      id: 'VZ Forum',
      en: 'VZ Forum',
    },
    shortType: {
      id: 'Forum Terbuka Publik & Developer',
      en: 'Open Public & Developer Forum',
    },
    description: {
      id: 'Forum diskusi terbuka untuk berbagi pengetahuan, tanya-jawab layanan vz.gay, serta kolaborasi komunitas publik dan developer.',
      en: 'Open community forum for public sharing, platform Q&A, and collaboration among users and developers.',
    },
  },
  {
    id: '21zone',
    primaryDomain: '21zone.vz.gay',
    category: 'media_content',
    status: 'development',
    iconName: 'shield-alert',
    ageRestricted: true,
    name: {
      id: '21Zone (21+)',
      en: '21Zone (21+)',
    },
    shortType: {
      id: 'Area Dewasa Terbatas (Gerbang Usia 21+ & IP Regional)',
      en: 'Age-Gated Adult Zone (21+ & Regional IP Gate)',
    },
    description: {
      id: 'Layanan konten dewasa (NSFW) khusus pengguna berusia 21 tahun ke atas. Memerlukan konfirmasi usia 21+ dan persetujuan pembatasan wilayah IP serta kebijakan nol toleransi sebelum tautan dapat dibuka.',
      en: 'Restricted adult (NSFW) service exclusively for users aged 21 and older. Requires interactive 21+ age confirmation and regional IP / zero-tolerance compliance acknowledgment before launching.',
    },
    architectureNotes: {
      id: 'Ditampilkan di direktori dengan gerbang konfirmasi interaktif usia 21+ dan pembatasan IP regional Cloudflare sebelum membuka tautan eksternal.',
      en: 'Listed in the directory behind an interactive 21+ age and Cloudflare regional IP compliance confirmation gate prior to opening.',
    },
    complianceNotice: {
      title: {
        id: 'Pembatasan Regional IP Cloudflare & Kebijakan Nol Toleransi',
        en: 'Cloudflare Regional IP Restriction & Zero-Tolerance Policy',
      },
      items: [
        {
          id: 'Pembatasan Wilayah IP (Cloudflare Regional IP Restriction): Akses otomatis diblokir di negara/yurisdiksi yang melarang konten NSFW demi mematuhi regulasi setempat dan mencegah pemblokiran pemerintah.',
          en: 'Regional IP Restriction (Cloudflare Geo-Blocking): Access is automatically blocked in countries or jurisdictions prohibiting NSFW content to comply with local laws and avoid government restrictions.',
        },
        {
          id: 'Konfirmasi Wajib Usia 21+: Pengguna wajib memasukkan tanggal lahir berusia 21 tahun ke atas serta menyetujui ketentuan kepatuhan sebelum tautan 21zone.vz.gay dibuka.',
          en: 'Mandatory 21+ Age Confirmation: Users must verify a Date of Birth aged 21 or older and accept compliance terms before launching 21zone.vz.gay.',
        },
        {
          id: 'Kepatuhan Ketat Aturan TLD .gay & Hukum Internasional (DILARANG KERAS): Konten yang berkaitan dengan narkotika/obat ilegal, eksploitasi/pornografi anak (CSAM), perdagangan manusia, senjata api/terkait, kekerasan, kejahatan siber berat, atau tindak kriminal fisik dalam bentuk apa pun dilarang mutlak.',
          en: 'Strict .gay TLD Rules & International Law (STRICTLY PROHIBITED): Illegal drugs, child exploitation/CSAM, human trafficking, firearms/weapons, violence, severe cybercrime, and any physical or criminal activity are strictly forbidden.',
        },
      ],
    },
  },
];

export const CLIENT_DOMAIN_MATRIX = [
  {
    service: 'desk.vz.gay (Live)',
    roleId: 'VZ Desk Suite (17 Aplikasi + UGC)',
    roleEn: 'VZ Desk Suite (17 Apps + UGC)',
    patterns: ['view.vz.gay', 'pub.vz.gay', 'docs.vz.gay', 'sheets.vz.gay', 'presentations.vz.gay', '+ 14 sub-apps'],
    routingNoteId: 'Seluruh 17 sub-aplikasi sudah aktif (HTTP 200) + view.vz.gay & pub.vz.gay untuk publikasi UGC publik',
    routingNoteEn: 'All 17 productivity sub-apps live (HTTP 200) + view.vz.gay & pub.vz.gay for public UGC publishing',
  },
  {
    service: 'builder.vz.gay (Live)',
    roleId: 'Website Builder, Go-Blog & Hub',
    roleEn: 'Website Builder, Go-Blog & Hub',
    patterns: ['*.orgz.top', '*.kopi.pw', '*.jajanan.online', '*.web.vz.gay', '*.site.vz.gay'],
    routingNoteId: 'Hostname level-1 aktif (menggantikan builder.cloud.vz.gay) termasuk lovelogicai.kopi.pw',
    routingNoteEn: 'Live level-1 hostname (replacing builder.cloud.vz.gay) including lovelogicai.kopi.pw',
  },
  {
    service: 'go-blog.vz.gay / goblog.vz.gay (Live)',
    roleId: 'Platform Blogging',
    roleEn: 'Blogging Platform',
    patterns: ['*.kaca.blog'],
    routingNoteId: '301 kaca.blog ke go-blog.vz.gay · blog.vz.gay kini berdiri sendiri sebagai blog resmi VZ',
    routingNoteEn: '301 kaca.blog to go-blog.vz.gay · blog.vz.gay now serves independently as the official VZ Blog',
  },
  {
    service: 'blog.vz.gay (Live)',
    roleId: 'Blog Resmi Ekosistem VZ',
    roleEn: 'Official VZ Ecosystem Blog',
    patterns: ['blog.vz.gay'],
    routingNoteId: 'Tanpa subdomain klien tingkat 2 karena batas SSL wildcard Cloudflare',
    routingNoteEn: 'Single official domain without level-2 client wildcards due to Cloudflare SSL limits',
  },
  {
    service: 'business.vz.gay (Live)',
    roleId: 'Marketplace Generator (SaaS & Self-Hosted)',
    roleEn: 'Marketplace Generator (SaaS & Self-Hosted)',
    patterns: ['*.jajanan.online (SaaS)', 'demo.jajanan.online (Self-Hosted Code)', '*.biz.orgz.top'],
    routingNoteId: 'Sponsor jajanserver.com · *.jajanan.online untuk SaaS & demo.jajanan.online khusus kode self-host',
    routingNoteEn: 'Sponsored by jajanserver.com · *.jajanan.online for SaaS & demo.jajanan.online for self-hosted code',
  },
  {
    service: 'games.vz.gay / play.vz.gay / app.vz.gay (Live)',
    roleId: 'Pusat Game & Aplikasi Web',
    roleEn: 'Games & Web Apps Hub',
    patterns: ['*.game.vz.gay', '*.app.vz.gay'],
    routingNoteId: 'Portal games.vz.gay (game.vz.gay), play.vz.gay, dan app.vz.gay aktif (HTTP 200) bersama 4+ sub-app',
    routingNoteEn: 'games.vz.gay (game.vz.gay), play.vz.gay, and app.vz.gay live (HTTP 200) with 4+ active sub-apps',
  },
  {
    service: 'codeplace.vz.gay (Live)',
    roleId: 'Katalog Source Code & Template',
    roleEn: 'Source Code & Template Hub',
    patterns: ['*.code.vz.gay', 'demo.jajanan.online'],
    routingNoteId: 'Sudah aktif di codeplace.vz.gay bersama 4 demo: lensastudio, wiyataxlms, omnipostai.code.vz.gay & demo.jajanan.online',
    routingNoteEn: 'Live at codeplace.vz.gay with 4 active demos: lensastudio, wiyataxlms, omnipostai.code.vz.gay & demo.jajanan.online',
  },
  {
    service: 'work.vz.gay / biz.vz.gay (Planned)',
    roleId: 'Ruang Kerja Enterprise & CRM',
    roleEn: 'Enterprise Workspace & CRM',
    patterns: ['work.vz.gay', 'biz.vz.gay'],
    routingNoteId: 'Domain biz.vz.gay kini dipasangkan dengan work.vz.gay untuk operasional enterprise',
    routingNoteEn: 'biz.vz.gay is now paired with work.vz.gay for enterprise workspace operations',
  },
  {
    service: 'nurdb.vz.gay (Segera Hadir)',
    roleId: 'Native Universal Rapid Databases (Belum Tersedia)',
    roleEn: 'Native Universal Rapid Databases (Coming Soon)',
    patterns: ['[vault-id]-nurdb.vz.gay', 'nurdb.vz.gay/v1/[vault-id]', 'cloud.vz.gay/console/nurdb'],
    routingNoteId: 'Segera Hadir (Coming Soon) — Cetak biru hostname satu tingkat & konsol',
    routingNoteEn: 'Coming Soon (Not Yet Available) — Planned single-level hostnames & console',
  },
  {
    service: 'cdn.vz.gay',
    roleId: 'Sistem CDN & Node Pengguna',
    roleEn: 'System CDN & User Nodes',
    patterns: ['cdn.vz.gay', '$RANDOM-GENERATED_$ZONE-OR-NODES_$USER-cdn.vz.gay'],
    routingNoteId: 'Distribusi aset dinamis per zona/node & user',
    routingNoteEn: 'Dynamic asset routing per zone/node & user',
  },
  {
    service: 'profile.vz.gay',
    roleId: 'Profil Publik Pengguna',
    roleEn: 'Public User Profile',
    patterns: ['profile.vz.gay/$USERNAME'],
    routingNoteId: 'Halaman publik kustom per akun SSO',
    routingNoteEn: 'Customizable public page per SSO account',
  },
];
