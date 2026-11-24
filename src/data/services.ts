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
  | 'shield-alert';

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
    reference: { id: 'Dokumen / Pengolah Kata', en: 'Word Processor / Docs' },
    description: {
      id: 'Editor dokumen kolaboratif ringan berbasis teks polos (.md) dengan kompresi media WebP/AVIF, autosave SSO, dan ekspor PDF instan.',
      en: 'Lightweight collaborative document editor built on plain text (.md) with WebP/AVIF media compression, SSO autosave, and instant PDF export.',
    },
    formatNote: {
      id: 'Format .md + embed gambar terkompresi · Siap ekspor PDF & bundel offline .enc (MyVault)',
      en: '.md source + compressed media embeds · Instant PDF & offline .enc export (MyVault)',
    },
  },
  {
    id: 'desk-sheets',
    domain: 'sheets.vz.gay',
    group: 'documents_publishing',
    iconName: 'table-2',
    name: { id: 'VZ Sheets', en: 'VZ Sheets' },
    reference: { id: 'Spreadsheet / XLS', en: 'Spreadsheets / XLS' },
    description: {
      id: 'Lembar kerja data tabular berkecepatan tinggi berbasis .csv dan tabel terstruktur dengan integrasi langsung ke NurDB.',
      en: 'High-speed tabular spreadsheet workspace backed by lightweight .csv sheets with planned NurDB data binding.',
    },
    formatNote: {
      id: 'Format .csv ringan · Kompatibel Excel/Sheets & siap tersambung ke NurDB',
      en: 'Lightweight .csv sheets · Excel/Sheets compatible & NurDB integration ready',
    },
  },
  {
    id: 'desk-presentations',
    domain: 'presentations.vz.gay',
    group: 'documents_publishing',
    iconName: 'presentation',
    name: { id: 'VZ Presentations', en: 'VZ Presentations' },
    reference: { id: 'Presentasi / PPT', en: 'Slide Decks / PPT' },
    description: {
      id: 'Pembuat slide presentasi modern berbasis Markdown (gaya Marp/Slidev) yang ringan, siap layar penuh, dan dapat diekspor ke PDF/PPTX.',
      en: 'Modern Markdown-driven slide deck creator (Marp/Slidev style) with fullscreen presenting and PDF/PPTX export.',
    },
    formatNote: {
      id: 'Slide berbasis teks polos (---) · Gambar WebP/AVIF & ekspor PDF rapi',
      en: 'Plain-text slide decks (---) · WebP/AVIF visuals & crisp PDF export',
    },
  },
  {
    id: 'desk-forms',
    domain: 'forms.vz.gay',
    group: 'documents_publishing',
    iconName: 'clipboard-list',
    name: { id: 'VZ Forms', en: 'VZ Forms' },
    reference: { id: 'Formulir / Google Forms', en: 'Online Forms / GForm' },
    description: {
      id: 'Pembuat formulir survei, pendaftaran, dan kuesioner publik yang langsung menyimpan respons secara terstruktur ke VZ Sheets atau NurDB.',
      en: 'Public survey, registration, and questionnaire builder that streams responses directly into VZ Sheets or NurDB.',
    },
    formatNote: {
      id: 'Formulir publik instan · Sinkronisasi respons ke VZ Sheets & NurDB',
      en: 'Instant public forms · Direct response sync to VZ Sheets & NurDB',
    },
  },
  {
    id: 'desk-diary',
    domain: 'diary.vz.gay',
    group: 'documents_publishing',
    iconName: 'notebook-pen',
    name: { id: 'VZ Diary', en: 'VZ Diary' },
    reference: { id: 'Buku Catatan / MS OneNote', en: 'Notebooks / MS OneNote' },
    description: {
      id: 'Ruang buku catatan terstruktur, kliping ide, dan jurnal pribadi dengan penandaan YAML frontmatter serta backlinks antar catatan.',
      en: 'Structured digital notebooks, idea clippings, and personal journals with YAML metadata and linked notes.',
    },
    formatNote: {
      id: 'Markdown + YAML Frontmatter · Mendukung arsip terenkripsi offline .enc',
      en: 'Markdown + YAML Frontmatter · Supports offline .enc encrypted vaults',
    },
  },
  {
    id: 'desk-press',
    domain: 'press.vz.gay',
    group: 'documents_publishing',
    iconName: 'newspaper',
    name: { id: 'VZ Press', en: 'VZ Press' },
    reference: { id: 'Tata Letak Cetak / MS Publisher', en: 'Desktop Publishing / MS Publisher' },
    description: {
      id: 'Alat desktop publishing untuk brosur, buletin, pamflet, dan publikasi siap cetak berpresisi tinggi berbasis Typst/CSS Paged Media.',
      en: 'Precision desktop publishing tool for brochures, newsletters, and print-ready layouts powered by Typst/CSS Paged Media.',
    },
    formatNote: {
      id: 'Sumber teks polos (.typ / HTML+CSS) · Hasil ekspor PDF kualitas cetak',
      en: 'Plain-text layout source (.typ / HTML+CSS) · Print-grade PDF output',
    },
  },

  // Visual, 3D & Diagrams
  {
    id: 'desk-craft',
    domain: 'craft.vz.gay',
    group: 'visual_3d',
    iconName: 'box',
    name: { id: 'VZ Craft', en: 'VZ Craft' },
    reference: { id: 'Pembuat Objek 3D (OBJ)', en: '3D OBJ Creator' },
    description: {
      id: 'Studio pemodelan 3D berbasis browser untuk merancang, mengedit, dan mengekspor aset objek 3D (.obj) secara langsung.',
      en: 'Browser-native 3D modeling workspace to build, inspect, and export 3D object (.obj) assets directly online.',
    },
    formatNote: {
      id: 'Ekspor standar .obj · Ringan di browser tanpa instalasi aplikasi berat',
      en: 'Standard .obj export · Runs in-browser without heavy desktop installs',
    },
  },
  {
    id: 'desk-design',
    domain: 'design.vz.gay',
    group: 'visual_3d',
    iconName: 'palette',
    name: { id: 'VZ Design', en: 'VZ Design' },
    reference: { id: 'Canva-lite / Photoshop Online', en: 'Canva-lite / Online Photoshop' },
    description: {
      id: 'Editor desain grafis dan olah gambar berbasis web (Canva-lite & Photoshop online) untuk poster, media sosial, dan aset visual cepat.',
      en: 'Web-based graphic design and image editor (Canva-lite & online Photoshop) for posters, thumbnails, and social assets.',
    },
    formatNote: {
      id: 'Ekspor otomatis WebP/AVIF & PNG · Terintegrasi dengan media.vz.gay',
      en: 'Optimized WebP/AVIF & PNG output · Connects cleanly with media.vz.gay',
    },
  },
  {
    id: 'desk-motion',
    domain: 'motion.vz.gay',
    group: 'visual_3d',
    iconName: 'clapperboard',
    name: { id: 'VZ Motion', en: 'VZ Motion' },
    reference: { id: 'Pembuat & Editor Animasi', en: 'Animation Maker & Editor' },
    description: {
      id: 'Studio animasi berbasis timeline di browser untuk menyusun motion graphics, animasi vektor SVG, dan klip pendek interaktif.',
      en: 'Timeline-driven browser animation studio for motion graphics, SVG vector animations, and interactive clips.',
    },
    formatNote: {
      id: 'Timeline keyframe ringan · Ekspor SVG animasi, WebM, atau GIF',
      en: 'Lightweight keyframe timeline · Export animated SVG, WebM, or GIF',
    },
  },
  {
    id: 'desk-draw',
    domain: 'draw.vz.gay',
    group: 'visual_3d',
    iconName: 'pen-tool',
    name: { id: 'VZ Draw', en: 'VZ Draw' },
    reference: { id: 'Google Drawings / Libre Draw', en: 'Google Drawings / Libre Draw' },
    description: {
      id: 'Kanvas gambar vektor bebas berbasis SVG/JSON ringan untuk ilustrasi sketsa, diagram cepat, dan grafis dokumen.',
      en: 'Freeform vector drawing canvas stored as lightweight SVG/JSON for sketches, quick visuals, and clean document graphics.',
    },
    formatNote: {
      id: 'Vektor murni .svg / JSON · Tidak pecah saat diperbesar & mudah disematkan',
      en: 'Pure .svg / JSON vector format · Infinite zoom & easy document embed',
    },
  },
  {
    id: 'desk-flowcharts',
    domain: 'flowcharts.vz.gay',
    group: 'visual_3d',
    iconName: 'git-branch',
    name: { id: 'VZ Flowcharts', en: 'VZ Flowcharts' },
    reference: { id: 'Diagram Alur / MS Visio', en: 'Diagramming / MS Visio' },
    description: {
      id: 'Pembuat diagram arsitektur, flowchart, ERD, dan bagan sistem berbasis Mermaid/D2 serta editor node visual ala MS Visio.',
      en: 'Architecture, flowchart, ERD, and system diagramming tool combining visual nodes with Mermaid/D2 declarative text.',
    },
    formatNote: {
      id: 'Kode diagram Mermaid/D2 + kanvas visual · Ekspor SVG & PDF presisi',
      en: 'Mermaid/D2 declarative syntax + visual canvas · Crisp SVG & PDF export',
    },
  },

  // Analytics & Quantitative
  {
    id: 'desk-math',
    domain: 'math.vz.gay',
    group: 'analytics_math',
    iconName: 'calculator',
    name: { id: 'VZ Math', en: 'VZ Math' },
    reference: { id: 'Kalkulator Ilmiah Online', en: 'Online Scientific Calculator' },
    description: {
      id: 'Kalkulator sains online, pembuat grafik fungsi, dan penyusun notasi persamaan matematika LaTeX/Typst Math.',
      en: 'Online scientific calculator, function plotter, and LaTeX/Typst mathematical equation workbench.',
    },
    formatNote: {
      id: 'Dukungan persamaan LaTeX / Typst Math · Siap salin ke VZ Docs',
      en: 'LaTeX & Typst Math rendering · Ready to embed directly into VZ Docs',
    },
  },
  {
    id: 'desk-ekonometrics',
    domain: 'ekonometrics.vz.gay',
    group: 'analytics_math',
    iconName: 'trending-up',
    name: { id: 'VZ Ekonometrics', en: 'VZ Ekonometrics' },
    reference: { id: 'Alat Analisis Ekonomi', en: 'Economic Analysis Tools' },
    description: {
      id: 'Perangkat analisis ekonometrika, regresi statistik, pemodelan deret waktu, dan visualisasi indikator ekonomi langsung di browser.',
      en: 'Econometrics and statistical modeling suite for regression, time-series analysis, and economic data visualization.',
    },
    formatNote: {
      id: 'Impor dataset .csv / VZ Sheets · Terhubung dengan pipeline data NurDB',
      en: 'Direct .csv / VZ Sheets import · Compatible with NurDB data pipelines',
    },
  },
  {
    id: 'desk-metrics',
    domain: 'metrics.vz.gay',
    group: 'analytics_math',
    iconName: 'bar-chart-3',
    name: { id: 'VZ Metrics', en: 'VZ Metrics' },
    reference: { id: 'Google Analytics / Yandex Metrica', en: 'Google Analytics / Yandex Metrica' },
    description: {
      id: 'Analitik trafik situs web, pelacakan konversi, dan metrik performa aplikasi yang ringan dan ramah privasi.',
      en: 'Lightweight, privacy-respecting web traffic analytics, conversion tracking, and product telemetry dashboard.',
    },
    formatNote: {
      id: 'Skrip pelacakan ringan · Penyimpanan agregasi cepat siap integrasi NurDB',
      en: 'Minimal tracking script · Fast event aggregation ready for NurDB',
    },
  },

  // Communication & People
  {
    id: 'desk-chat',
    domain: 'chat.vz.gay',
    group: 'communication',
    iconName: 'message-square',
    name: { id: 'VZ Chat', en: 'VZ Chat' },
    reference: { id: 'Google Chat (Terhubung VZ Mail)', en: 'Google Chat (Linked to VZ Mail)' },
    description: {
      id: 'Pesan instan dan ruang kolaborasi tim bergaya Google Chat yang terhubung erat dengan percakapan email di mail.vz.gay.',
      en: 'Instant team and direct messaging modeled after Google Chat, deeply connected with mail.vz.gay threads.',
    },
    formatNote: {
      id: 'Terhubung langsung dengan mail.vz.gay & sesi identitas accounts.vz.gay',
      en: 'Directly connected to mail.vz.gay and accounts.vz.gay SSO sessions',
    },
  },
  {
    id: 'desk-groups',
    domain: 'groups.vz.gay',
    group: 'communication',
    iconName: 'users',
    name: { id: 'VZ Groups', en: 'VZ Groups' },
    reference: { id: 'Milis & Grup / Google Groups', en: 'Mailing Lists / Google Groups' },
    description: {
      id: 'Grup diskusi, milis komunitas, dan pengelolaan izin akses tim terpusat ala Google Groups untuk proyek di VZ Desk.',
      en: 'Discussion groups, mailing lists, and team access management modeled after Google Groups across VZ Desk.',
    },
    formatNote: {
      id: 'Sinkron dengan mail.vz.gay, chat.vz.gay, dan hak akses dokumen VZ Desk',
      en: 'Synced with mail.vz.gay, chat.vz.gay, and VZ Desk sharing permissions',
    },
  },
  {
    id: 'desk-contacts',
    domain: 'contacts.vz.gay',
    group: 'communication',
    iconName: 'contact',
    name: { id: 'VZ Contacts', en: 'VZ Contacts' },
    reference: { id: 'Buku Kontak / vCard (.vcf)', en: 'Contacts / vCard (.vcf)' },
    description: {
      id: 'Buku alamat dan direktori kontak pribadi maupun tim berbasis standar terbuka vCard (.vcf) yang tersinkron dengan VZ Mail & VZ Chat.',
      en: 'Personal and team address book built on open vCard (.vcf) standards, synced with VZ Mail and VZ Chat.',
    },
    formatNote: {
      id: 'Standar terbuka .vcf · Ekspor/impor mudah & integrasi NurDB',
      en: 'Open .vcf standard · Easy export/import & NurDB directory sync',
    },
  },
];

export function deskToolToService(tool: VzDeskTool): VzService {
  return {
    id: tool.id,
    primaryDomain: tool.domain,
    category: 'productivity',
    status: 'development',
    iconName: tool.iconName,
    name: tool.name,
    shortType: tool.reference,
    description: tool.description,
    architectureNotes: {
      id: `Bagian dari ekosistem VZ Desk (desk.vz.gay). ${tool.formatNote.id}. Terhubung dengan cloud identity SSO (accounts.vz.gay), dukungan enkripsi offline .enc lewat myvault.app.vz.gay, serta integrasi data NurDB (nurdb.vz.gay).`,
      en: `Part of the VZ Desk suite (desk.vz.gay). ${tool.formatNote.en}. Built for Auth0 SSO cloud autosave (accounts.vz.gay), optional offline .enc encryption via myvault.app.vz.gay, and NurDB integration (nurdb.vz.gay).`,
    },
    highlights: [
      {
        label: { id: 'Payung Suite', en: 'Parent Suite' },
        value: { id: 'VZ Desk (desk.vz.gay)', en: 'VZ Desk (desk.vz.gay)' },
      },
      {
        label: { id: 'Format & Efisiensi', en: 'Format & Storage' },
        value: tool.formatNote,
      },
      {
        label: { id: 'Integrasi Masa Depan', en: 'Planned Integrations' },
        value: {
          id: 'NurDB (nurdb.vz.gay) · MyVault .enc · VZ Media',
          en: 'NurDB (nurdb.vz.gay) · MyVault .enc · VZ Media',
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
      id: 'Mesin Pencari',
      en: 'Search Engine',
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
      id: 'Portal Akademik & LMS SaaS',
      en: 'Academic Portal & LMS SaaS',
    },
    description: {
      id: 'Template portal akademik & LMS white-label multi-tenant siap Self-Hosted maupun SaaS Cloud (gaya SIAKADCloud) dengan PPDB Online, Rapor, Student Portal, CMS, AI FAQ, dan Open API.',
      en: 'Multi-tenant white-label academic portal & LMS platform ready for Self-Hosted or SaaS Cloud with Online Admissions (PPDB), Gradebook, Student Portal, Theme Studio, AI FAQ, and Open API.',
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
      id: 'Platform ekosistem edukasi dan literasi kepenulisan Indonesia. Saat ini sudah online pada tahap awal (WP 0) dan terus dikembangkan secara bertahap.',
      en: 'Indonesian writing and digital literacy ecosystem platform. Live in its initial WordPress (WP 0) stage with ongoing editorial expansion.',
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
    category: 'productivity',
    status: 'development',
    iconName: 'briefcase',
    name: {
      id: 'VZ Desk',
      en: 'VZ Desk',
    },
    shortType: {
      id: 'Suite Produktivitas (17 Layanan)',
      en: 'Productivity Suite (17 Apps)',
    },
    description: {
      id: 'Meja kerja digital terpadu (Docs, Sheets, Presentations, Craft 3D, Design, Motion, Draw, Forms, Math, Ekonometrics, Metrics, Diary, Press, Flowcharts, Chat, Groups, Contacts) berbasis teks polos, kompresi WebP/AVIF, autosave SSO, dan integrasi NurDB.',
      en: 'Unified cloud workspace uniting 17 productivity, creative, analytics, and communication tools built on lightweight plain-text formats, WebP/AVIF media, Auth0 SSO autosave, offline .enc MyVault encryption, and NurDB.',
    },
    clientDomainPatterns: [
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
    architectureNotes: {
      id: 'Menyimpan berkas secara hemat ruang di server (.md, .csv, .svg, .typ, .vcf) dengan gambar terkompresi WebP/AVIF, cloud autosave lewat accounts.vz.gay, opsi enkripsi offline .enc menggunakan myvault.app.vz.gay (CipherVaultPro), serta integrasi data langsung dengan NurDB.',
      en: 'Server-side autosave backed by compact plain-text formats (.md, .csv, .svg, .typ, .vcf) and WebP/AVIF media compression, authenticated via accounts.vz.gay SSO, with optional offline .enc encryption via myvault.app.vz.gay (CipherVaultPro) and native NurDB integration.',
    },
    highlights: [
      {
        label: { id: 'Mode Web Cloud', en: 'Web Cloud Mode' },
        value: {
          id: 'Autosave otomatis terikat Auth0 SSO + ekspor PDF instan di browser',
          en: 'Automatic cloud autosave tied to Auth0 SSO + instant in-browser PDF export',
        },
      },
      {
        label: { id: 'Mode Offline Native (.enc)', en: 'Native Offline Mode (.enc)' },
        value: {
          id: 'Kontainer terenkripsi AES via myvault.app.vz.gay (tidak bisa dibaca lewat Notepad tanpa login)',
          en: 'Encrypted .enc containers via myvault.app.vz.gay (unreadable outside authenticated decrypt)',
        },
      },
      {
        label: { id: 'Integrasi Data', en: 'Data Integration' },
        value: {
          id: 'Terhubung dengan mail.vz.gay, media.vz.gay, dan basis data nurdb.vz.gay',
          en: 'Connects with mail.vz.gay, media.vz.gay, and nurdb.vz.gay databases',
        },
      },
    ],
  },
  {
    id: 'app',
    primaryDomain: 'app.vz.gay',
    category: 'productivity',
    status: 'development',
    iconName: 'layout-grid',
    name: {
      id: 'VZ App Hub',
      en: 'VZ App Hub',
    },
    shortType: {
      id: 'Peluncur Aplikasi',
      en: 'App Workspace',
    },
    description: {
      id: 'Pusat aplikasi web terpadu untuk mengelola ruang kerja, utilitas harian, dan integrasi akun terpusat.',
      en: 'Unified web application launcher for managing daily workspaces, utilities, and central account integrations.',
    },
    architectureNotes: {
      id: 'Saat ini sedang dalam pengembangan aktif dan akan terhubung ke SSO accounts.vz.gay.',
      en: 'Currently under active development and will integrate directly with accounts.vz.gay SSO.',
    },
  },
  {
    id: 'mail',
    primaryDomain: 'mail.vz.gay',
    category: 'productivity',
    status: 'development',
    iconName: 'mail',
    name: {
      id: 'VZ Mail',
      en: 'VZ Mail',
    },
    shortType: {
      id: 'Email Privat Gaya Chat',
      en: 'Offline-First Chat Email',
    },
    description: {
      id: 'Klien email dengan antarmuka percakapan ala WhatsApp yang terhubung dengan chat.vz.gay. Data disimpan lokal di perangkat tanpa beban penyimpanan server.',
      en: 'Email client with a WhatsApp-style conversational UI connected to chat.vz.gay. Messages live locally on your device with zero server retention.',
    },
    architectureNotes: {
      id: 'Privasi maksimal tanpa penyimpanan email di server. Sinkronisasi antar perangkat dilakukan melalui fitur ekspor & impor berkas backup.',
      en: 'Privacy-first local-device architecture: zero server mailbox storage; cross-device sync works via export/import backup files.',
    },
  },
  {
    id: 'builder',
    primaryDomain: 'builder.cloud.vz.gay',
    category: 'web_business',
    status: 'development',
    iconName: 'globe',
    name: {
      id: 'VZ Web Builder',
      en: 'VZ Web Builder',
    },
    shortType: {
      id: 'Website Builder',
      en: 'Website Builder',
    },
    description: {
      id: 'Pembuat situs web instan berbasis cloud dengan penerbitan cepat dan dukungan banyak subdomain klien.',
      en: 'Cloud-powered website builder with rapid publishing and multi-domain client routing.',
    },
    clientDomainPatterns: [
      '*.orgz.top',
      '*.kopi.pw',
      '*.jajanan.online',
      '*.web.vz.gay',
      '*.site.vz.gay',
    ],
    architectureNotes: {
      id: 'Menargetkan publikasi situs statis dan dinamis secara instan dengan opsi domain kustom klien yang beragam.',
      en: 'Designed to publish static and dynamic sites rapidly with flexible client subdomain choices.',
    },
  },
  {
    id: 'go-blog',
    primaryDomain: 'go-blog.vz.gay',
    altDomains: ['goblog.vz.gay'],
    category: 'web_business',
    status: 'development',
    iconName: 'pen-line',
    name: {
      id: 'Go-Blog',
      en: 'Go-Blog',
    },
    shortType: {
      id: 'Platform Blogging',
      en: 'Blogging Platform',
    },
    description: {
      id: 'Platform penerbitan blog modern ala Blogspot dan WordPress dengan dukungan domain tulisan khusus.',
      en: 'Modern blogging platform inspired by Blogspot and WordPress with dedicated writer subdomains.',
    },
    clientDomainPatterns: ['*.kaca.blog', '*.blog.vz.gay'],
    redirectRules: [
      { from: 'kaca.blog', to: 'https://go-blog.vz.gay', code: 301 },
      { from: 'blog.vz.gay', to: 'https://goblog.vz.gay', code: 301 },
    ],
    architectureNotes: {
      id: 'Domain root kaca.blog dan blog.vz.gay diarahkan permanen (HTTP 301) menuju go-blog.vz.gay dan goblog.vz.gay.',
      en: 'Root domains kaca.blog and blog.vz.gay perform a permanent HTTP 301 redirect to go-blog.vz.gay and goblog.vz.gay.',
    },
  },
  {
    id: 'business',
    primaryDomain: 'business.vz.gay',
    category: 'web_business',
    status: 'development',
    iconName: 'store',
    name: {
      id: 'VZ Business',
      en: 'VZ Business',
    },
    shortType: {
      id: 'Marketplace Generator SaaS',
      en: 'Marketplace Generator SaaS',
    },
    description: {
      id: 'Generator marketplace dan etalase toko online siap pakai bagi pelaku usaha dengan domain bisnis instan.',
      en: 'Turnkey SaaS marketplace and storefront generator for merchants with instant business subdomains.',
    },
    clientDomainPatterns: [
      '*.jajanan.online',
      '*.biz.orgz.top',
      '*.biz.vz.gay',
    ],
    sponsor: 'jajanserver.com',
    architectureNotes: {
      id: 'Didukung dan disponsori oleh jajanserver.com untuk menopang trafik katalog dan transaksi tenant marketplace.',
      en: 'Supported and sponsored by jajanserver.com to power multi-tenant storefronts and high-traffic merchant catalogs.',
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
      id: 'Pembayaran & Transaksi',
      en: 'Payment Service',
    },
    description: {
      id: 'Layanan pembayaran digital dan manajemen transaksi terpadu untuk layanan vz.gay serta toko klien.',
      en: 'Unified digital payment and transaction management service for vz.gay tools and merchant storefronts.',
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
    status: 'development',
    iconName: 'link-2',
    name: {
      id: 'VZ Links',
      en: 'VZ Links',
    },
    shortType: {
      id: 'SaaS Link-in-Bio & Short Links',
      en: 'Link-in-Bio & URL Shortener',
    },
    description: {
      id: 'Platform SaaS untuk membuat halaman tautan bio (link-in-bio), pemendek tautan cepat, dan pelacakan klik terintegrasi.',
      en: 'SaaS platform for customizable link-in-bio pages, fast short URLs, and integrated click tracking.',
    },
    architectureNotes: {
      id: 'Dapat dihubungkan dengan analitik metrics.vz.gay serta halaman profil publik profile.vz.gay/$USERNAME.',
      en: 'Connects cleanly with metrics.vz.gay analytics and public pages on profile.vz.gay/$USERNAME.',
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
      id: 'Jaringan Iklan / AdSense',
      en: 'Ad Network / AdSense',
    },
    description: {
      id: 'Jaringan monetisasi dan pemasangan iklan bergaya AdSense bagi penerbit situs, blog, dan aplikasi di ekosistem vz.gay.',
      en: 'AdSense-style advertising and monetization network for publishers, blogs, and apps across the vz.gay ecosystem.',
    },
    architectureNotes: {
      id: 'Terintegrasi dengan pelaporan metrics.vz.gay dan pencairan transaksi melalui pay.vz.gay.',
      en: 'Designed to integrate with metrics.vz.gay reporting and payouts through pay.vz.gay.',
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
      id: 'Native Universal Rapid Databases',
      en: 'Native Universal Rapid Databases',
    },
    description: {
      id: 'Native Universal Rapid Databases — terinspirasi dari makna "Nur" (cahaya), menghadirkan basis data multi-model (NoSQL + Relasional) berkecepatan tinggi dalam satu file portabel (.nur) untuk self-host maupun managed cloud.',
      en: 'Native Universal Rapid Databases — inspired by "Nur" (light), combining multi-model NoSQL + relational power, single-file portable .nur vaults, visual studio tools, and sub-millisecond edge speed for self-host or managed cloud.',
    },
    clientDomainPatterns: [
      'nurdb.vz.gay/docs',
      'cloud.vz.gay/nurdb',
      'cloud.vz.gay/console/nurdb',
      '[vault-id]-nurdb.vz.gay',
      'nurdb.vz.gay/v1/[vault-id]',
    ],
    architectureNotes: {
      id: 'Memadukan fleksibilitas dokumen JSON (Schema-on-Read), relasi visual ala MS Access, isolasi 1 project per ruang eksekusi dengan banyak file Vault .nur, instant CoW branching, local-first sync, TTL ephemeral micro-DB, hingga rencana Fase 3 Polymorphic Query / Custom Lexer Dictionary.',
      en: 'Blends schemaless JSON documents with relational visual modeling, isolated per-project multi-vault .nur packaging, instant CoW branching, zero-latency local-first sync, TTL ephemeral micro-DBs, and a Phase 3 Polymorphic Query / Custom Lexer Dictionary security engine.',
    },
    highlights: [
      {
        label: { id: 'NURDB Studio', en: 'NURDB Studio' },
        value: {
          id: 'Grids (Tables) · Synapse (Relations) · Lenses (Queries) · Portals (Forms) · Canvas (Reports) · Flows (Triggers)',
          en: 'Grids (Tables) · Synapse (Relations) · Lenses (Queries) · Portals (Forms) · Canvas (Reports) · Flows (Triggers)',
        },
      },
      {
        label: { id: 'Inovasi Inti', en: 'Core Innovations' },
        value: {
          id: 'Instant Branching (<50ms) · Bundel Portabel .nur (Data + UI + Logic) · Local-First Sync · Auto-Expire TTL Vaults',
          en: 'Instant Branching (<50ms) · Portable .nur Bundles (Data + UI + Logic) · Local-First Sync · Auto-Expire TTL Vaults',
        },
      },
      {
        label: { id: 'Keamanan Lanjutan (Fase 3)', en: 'Advanced Security (Phase 3)' },
        value: {
          id: 'Polymorphic Query Engine dengan Custom Dictionary / Tokenizer per-tenant (C/Rust/LLVM)',
          en: 'Polymorphic Query Engine with per-tenant Custom Dictionary / Tokenizer (C/Rust/LLVM)',
        },
      },
      {
        label: { id: 'Distribusi & Konsol', en: 'Distribution & Console' },
        value: {
          id: 'Self-Host & Docs di nurdb.vz.gay/docs · Managed Cloud di cloud.vz.gay/nurdb · Konsol di cloud.vz.gay/console/nurdb',
          en: 'Self-Host & Docs at nurdb.vz.gay/docs · Managed Cloud at cloud.vz.gay/nurdb · Console at cloud.vz.gay/console/nurdb',
        },
      },
    ],
  },
  {
    id: 'codeplace',
    primaryDomain: 'codeplace.vz.gay',
    category: 'developer_cloud',
    status: 'development',
    iconName: 'code-2',
    name: {
      id: 'Codeplace',
      en: 'Codeplace',
    },
    shortType: {
      id: 'Marketplace Template Kode',
      en: 'Modern Code Marketplace',
    },
    description: {
      id: 'Pusat template dan source code modern berbasis Node.js, TypeScript, hingga aplikasi Android Kotlin dengan demo langsung.',
      en: 'Modern source code and template hub for Node.js, TypeScript, and Kotlin Android apps with live subdomain demos.',
    },
    clientDomainPatterns: ['*.code.vz.gay'],
    liveChildren: [
      {
        name: 'Lensa Studio',
        domain: 'lensastudio.code.vz.gay',
        kind: 'demo',
        description: {
          id: 'Demo aplikasi & showcase template aktif pertama',
          en: 'First live production demo showcase',
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
    ],
    architectureNotes: {
      id: 'Alternatif modern bergaya CodeCanyon di mana setiap script atau source code memiliki demo aktif di *.code.vz.gay.',
      en: 'Modern CodeCanyon alternative where every template or script ships with a live preview at *.code.vz.gay.',
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
      id: 'Layanan Infrastruktur Cloud',
      en: 'Cloud Infrastructure',
    },
    description: {
      id: 'Payung layanan komputasi, hosting, konsol manajemen proyek (cloud.vz.gay/console), dan Managed NurDB Cloud.',
      en: 'Managed cloud umbrella for compute, hosting, centralized project console (cloud.vz.gay/console), and Managed NurDB Cloud.',
    },
    clientDomainPatterns: ['cloud.vz.gay/nurdb', 'cloud.vz.gay/console/nurdb'],
    sponsor: 'jajanserver.com',
    architectureNotes: {
      id: 'Segera hadir melalui kolaborasi infrastruktur bersama sponsor jajanserver.com.',
      en: 'Coming soon in infrastructure partnership with sponsor jajanserver.com.',
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
      id: 'Gerbang REST API',
      en: 'REST API Gateway',
    },
    description: {
      id: 'Dokumentasi pengembang, kunci akses, dan endpoint REST API terpadu untuk mengintegrasikan seluruh layanan vz.gay.',
      en: 'Developer documentation, access keys, and unified REST API endpoints connecting the vz.gay ecosystem.',
    },
    architectureNotes: {
      id: 'Menyediakan endpoint REST API dengan latensi rendah untuk integrasi lintas layanan di seluruh wilayah.',
      en: 'Provides low-latency REST API endpoints for cross-service integration across regions.',
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
      id: 'Utilitas Publik Developer',
      en: 'Public Developer Utilities',
    },
    description: {
      id: 'Kumpulan alat bantu publik serbaguna untuk developer (formatter, encoder/decoder, validator, inspektor payload, dan konverter cepat).',
      en: 'Collection of fast, generic public developer tools including formatters, encoders, validators, and quick converters.',
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
      id: 'Rangkaian alat bantu kecerdasan buatan untuk produktivitas teks, analisis, dan otomasi alur kerja lintas VZ Desk.',
      en: 'Focused AI workspace for text workflows, analysis, and smart automation across vz.gay services and VZ Desk.',
    },
  },
  {
    id: 'play',
    primaryDomain: 'play.vz.gay',
    category: 'media_content',
    status: 'development',
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
      id: 'Direktori game ringan dan aplikasi utilitas web. Beberapa aplikasi dan game sudah aktif dan dapat langsung digunakan.',
      en: 'Hub for browser games and lightweight web utilities. Several standalone apps and games are already live.',
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
          id: 'Konversi dokumen PDF ke template Blade secara cepat',
          en: 'Fast PDF document to Blade template converter',
        },
      },
      {
        name: 'DirectQR',
        domain: 'directqr.app.vz.gay',
        kind: 'app',
        description: {
          id: 'Generator QR code instan tanpa perantara pelacakan',
          en: 'Instant direct QR code generator without tracking hops',
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
      id: 'Memisahkan namespace *.game.vz.gay untuk game dan *.app.vz.gay untuk aplikasi non-game.',
      en: 'Separates *.game.vz.gay for games and *.app.vz.gay for non-game web utilities.',
    },
  },
  {
    id: 'wonderplace',
    primaryDomain: 'wonderplace.vz.gay',
    category: 'media_content',
    status: 'development',
    iconName: 'heart-handshake',
    name: {
      id: 'Wonderplace',
      en: 'Wonderplace',
    },
    shortType: {
      id: 'Jejaring Sosial Ruang Aman',
      en: 'Safe-Space Social Network',
    },
    description: {
      id: 'Media sosial berbasis WoWonder (Laravel PHP) sebagai ruang aman inklusif berlandaskan humanisme universal serta kesetaraan sesuai ToS TLD .gay.',
      en: 'WoWonder (Laravel PHP) social platform built as an inclusive safe space rooted in universal humanism, equality, and full .gay TLD Terms of Service compliance.',
    },
    architectureNotes: {
      id: 'Dikelola dengan moderasi aktif untuk menjaga ruang interaksi yang aman, setara, dan bebas kebencian sesuai kebijakan TLD .gay.',
      en: 'Operated with active moderation to uphold an inclusive, harassment-free environment aligned with .gay TLD policy.',
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
      id: 'Basis Data Film & Sinema',
      en: 'Film Database (IMDb-style)',
    },
    description: {
      id: 'Direktori referensi film, serial, pemeran, sinopsis, dan rating komunitas bergaya IMDb.',
      en: 'Reference database for movies, series, cast credits, synopses, and community ratings in an IMDb-like catalog.',
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
      id: 'Pustaka Lirik & Makna Lagu',
      en: 'Lyrics & Song Meanings',
    },
    description: {
      id: 'Pustaka musik untuk mencari lirik, kredit lagu, dan interpretasi makna lagu—bukan layanan pemutar audio streaming.',
      en: 'Curated music reference library for searching lyrics, credits, and song meanings—not an audio streaming player.',
    },
    architectureNotes: {
      id: 'Berfokus pada teks lirik, metadata rilisan, dan anotasi makna lagu (berbeda dari YT Music, Spotify, atau iTunes).',
      en: 'Focused strictly on lyrics, release metadata, and lyrical annotations rather than audio playback.',
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
      id: 'Papan Inspirasi & Hosting Gambar',
      en: 'Pinterest + Imgur Hybrid',
    },
    description: {
      id: 'Hibrida 2-in-1 ala Pinterest dan Imgur untuk kurasi inspirasi visual sekaligus hosting gambar publik yang ringan.',
      en: '2-in-1 Pinterest and Imgur hybrid built for visual moodboards and fast public image hosting—not private cloud backup.',
    },
    architectureNotes: {
      id: 'Aset media publik dioptimalkan dengan kompresi WebP/AVIF untuk pemuatan gambar berkecepatan tinggi.',
      en: 'Public visual uploads are optimized with WebP/AVIF compression for fast, reliable global image delivery.',
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
      id: 'Pustaka Komik Digital',
      en: 'Digital Comics Hub',
    },
    description: {
      id: 'Ruang baca dan katalog komik digital independen maupun seri grafis lintas genre dengan pembaca ringan.',
      en: 'Reading platform and catalog for independent digital comics and graphic series with a lightweight reader.',
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
      id: 'Direktori dan pembaca manga digital dengan tata letak halaman vertikal maupun kanan-ke-kiri yang nyaman.',
      en: 'Digital manga catalog and reader supporting smooth vertical scroll and right-to-left page navigation.',
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
      id: 'Katalog & Buku Digital',
      en: 'Digital Books Catalog',
    },
    description: {
      id: 'Platform katalog, resensi, dan bacaan buku digital terstruktur untuk literasi umum dan akademik.',
      en: 'Structured catalog, reviews, and digital reading hub for general and academic books.',
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
      id: 'Perpustakaan digital serba guna yang tidak hanya menghimpun buku, melainkan juga arsip riset, manuskrip, materi ajar, dan koleksi multimedia.',
      en: 'Comprehensive digital library housing not only books, but also research archives, manuscripts, courseware, and multimedia collections.',
    },
  },
  {
    id: 'journal',
    primaryDomain: 'journal.vz.gay',
    category: 'education',
    status: 'development',
    iconName: 'file-text',
    name: {
      id: 'VZ Journal (OJS)',
      en: 'VZ Journal (OJS)',
    },
    shortType: {
      id: 'Open Journal Systems (OJS)',
      en: 'Open Journal Systems (OJS)',
    },
    description: {
      id: 'Sistem penerbitan jurnal ilmiah berbasis Open Journal Systems (OJS) untuk manajemen naskah, peer-review, dan publikasi riset terbuka.',
      en: 'Academic journal publishing portal built on Open Journal Systems (OJS) for submissions, peer review, and open-access research.',
    },
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
      id: 'Tiket Bantuan, Live Chat & Kontak',
      en: 'Ticketing, Live Chat & Contact',
    },
    description: {
      id: 'Pusat bantuan resmi untuk seluruh platform vz.gay yang menyediakan sistem tiket (ticketing), live chat, dan kanal kontak pengguna.',
      en: 'Official help center for the vz.gay platform offering ticketing, live chat support, and direct contact channels.',
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
      id: 'Area Dewasa Terverifikasi (SSO 21+)',
      en: 'Age-Verified Adult Zone (SSO 21+)',
    },
    description: {
      id: 'Layanan konten dewasa (NSFW) khusus pengguna terverifikasi SSO dengan usia 21 tahun ke atas, tunduk penuh pada pembatasan wilayah IP dan hukum internasional.',
      en: 'Restricted adult (NSFW) service visible exclusively to SSO-authenticated users aged 21+, governed by regional IP restrictions and strict international compliance.',
    },
    architectureNotes: {
      id: 'Hanya ditampilkan setelah pengguna masuk melalui SSO (accounts.vz.gay) dan memverifikasi tanggal lahir usia 21+.',
      en: 'Only revealed after signing in via SSO (accounts.vz.gay) with a verified Date of Birth of 21 years or older.',
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
          id: 'Verifikasi Wajib SSO + Usia 21+: Layanan ini disembunyikan dari publik dan hanya tampil bagi akun SSO terautentikasi dengan tanggal lahir (BoD) berusia 21 tahun ke atas.',
          en: 'Mandatory SSO + 21+ Verification: Hidden from public directories and accessible only to authenticated SSO accounts with a verified Date of Birth of 21+.',
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
    service: 'builder.cloud.vz.gay',
    roleId: 'Website Builder',
    roleEn: 'Website Builder',
    patterns: ['*.orgz.top', '*.kopi.pw', '*.jajanan.online', '*.web.vz.gay', '*.site.vz.gay'],
    routingNoteId: 'Subdomain situs klien otomatis',
    routingNoteEn: 'Automated client site routing',
  },
  {
    service: 'go-blog.vz.gay / goblog.vz.gay',
    roleId: 'Platform Blogging',
    roleEn: 'Blogging Platform',
    patterns: ['*.kaca.blog', '*.blog.vz.gay'],
    routingNoteId: '301 kaca.blog & blog.vz.gay ke portal blog',
    routingNoteEn: '301 kaca.blog & blog.vz.gay to blog portal',
  },
  {
    service: 'business.vz.gay',
    roleId: 'Marketplace Generator',
    roleEn: 'Marketplace Generator',
    patterns: ['*.jajanan.online', '*.biz.orgz.top', '*.biz.vz.gay'],
    routingNoteId: 'Sponsor oleh jajanserver.com',
    routingNoteEn: 'Sponsored by jajanserver.com',
  },
  {
    service: 'play.vz.gay',
    roleId: 'Pusat Game & Aplikasi',
    roleEn: 'Games & Apps Hub',
    patterns: ['*.game.vz.gay', '*.app.vz.gay'],
    routingNoteId: '4 aplikasi & game aktif tersedia',
    routingNoteEn: '4 live apps & games available',
  },
  {
    service: 'codeplace.vz.gay',
    roleId: 'Marketplace Template Kode',
    roleEn: 'Code Template Hub',
    patterns: ['*.code.vz.gay'],
    routingNoteId: '2 demo aktif: lensastudio.code.vz.gay & wiyataxlms.code.vz.gay',
    routingNoteEn: '2 live demos: lensastudio.code.vz.gay & wiyataxlms.code.vz.gay',
  },
  {
    service: 'nurdb.vz.gay',
    roleId: 'Native Universal Rapid Databases',
    roleEn: 'Native Universal Rapid Databases',
    patterns: ['[vault-id]-nurdb.vz.gay', 'nurdb.vz.gay/v1/[vault-id]', 'cloud.vz.gay/console/nurdb'],
    routingNoteId: 'Subdomain satu tingkat + path konsol & docs',
    routingNoteEn: 'Single-level hostnames + console & docs paths',
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
