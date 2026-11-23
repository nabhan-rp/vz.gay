export type ServiceStatus = 'live' | 'development' | 'coming_soon';

export type ServiceCategory =
  | 'web_business'
  | 'media_content'
  | 'developer_cloud'
  | 'productivity';

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

export interface VzService {
  id: string;
  primaryDomain: string;
  altDomains?: string[];
  category: ServiceCategory;
  status: ServiceStatus;
  iconName:
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
    | 'credit-card';
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
  clientDomainPatterns?: string[];
  redirectRules?: RedirectRule[];
  liveChildren?: LiveChildApp[];
  sponsor?: string;
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
      id: 'Saat ini sedang dalam pengembangan aktif dan akan terhubung ke SSO acccounts.vz.gay.',
      en: 'Currently under active development and will integrate directly with acccounts.vz.gay SSO.',
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
      id: 'Saat ini sedang dalam pengembangan dan akan terhubung dengan business.vz.gay serta SSO acccounts.vz.gay.',
      en: 'Currently in development and designed to integrate with business.vz.gay and acccounts.vz.gay SSO.',
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
          id: 'Aplikasi penyimpanan catatan & brankas pribadi',
          en: 'Personal vault and secure records utility',
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
        name: 'WiyataX LMS',
        domain: 'wiyataxlms.code.vz.gay',
        altDomain: 'wiyataxlms.orgz.top',
        kind: 'demo',
        description: {
          id: 'Demo platform Learning Management System (LMS) siap pakai',
          en: 'Live Learning Management System (LMS) template demo',
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
      id: 'Layanan komputasi dan infrastruktur cloud untuk kebutuhan hosting serta penyebaran aplikasi modern.',
      en: 'Managed cloud infrastructure and compute services for hosting modern workloads.',
    },
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
      id: 'Rangkaian alat bantu kecerdasan buatan untuk produktivitas teks, analisis, dan otomasi alur kerja.',
      en: 'Focused AI workspace for text workflows, analysis, and smart automation across vz.gay services.',
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
      id: 'Klien email dengan antarmuka percakapan ala WhatsApp. Data disimpan lokal di perangkat tanpa beban dan penyimpanan server.',
      en: 'Email client with a WhatsApp-style conversational UI. Messages live locally on your device with zero server retention.',
    },
    architectureNotes: {
      id: 'Privasi maksimal tanpa penyimpanan email di server. Sinkronisasi antar perangkat dilakukan melalui fitur ekspor & impor berkas backup.',
      en: 'Privacy-first local-device architecture: zero server mailbox storage; cross-device sync works via encrypted export/import backup files.',
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
      id: 'Aset media publik dioptimalkan untuk pemuatan dan pengiriman gambar berkecepatan tinggi.',
      en: 'Public visual uploads are optimized for fast, reliable global image delivery.',
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
];
