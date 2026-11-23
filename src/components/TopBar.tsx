import { UI_COPY, type Language } from '../data/i18n';

interface TopBarProps {
  lang: Language;
  onOpenSso: () => void;
}

export function TopBar({ lang, onOpenSso }: TopBarProps) {
  const t = UI_COPY[lang].nav;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 dark:border-[#232732] bg-[#FAFAFA]/90 dark:bg-[#0B0D11]/90 backdrop-blur-md">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-8">
        <a
          href="#top"
          className="font-display text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-sm"
        >
          vz.gay
        </a>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
          <a
            href="#services"
            className="hover:text-slate-900 dark:hover:text-white transition-colors duration-150 whitespace-nowrap shrink-0 underline-offset-4 hover:underline"
          >
            {t.services}
          </a>
          <a
            href="#live-apps"
            className="hover:text-slate-900 dark:hover:text-white transition-colors duration-150 whitespace-nowrap shrink-0 underline-offset-4 hover:underline"
          >
            {t.liveApps}
          </a>
          <a
            href="#domains"
            className="hover:text-slate-900 dark:hover:text-white transition-colors duration-150 whitespace-nowrap shrink-0 underline-offset-4 hover:underline"
          >
            {t.domains}
          </a>
          <a
            href="#infrastructure"
            className="hover:text-slate-900 dark:hover:text-white transition-colors duration-150 whitespace-nowrap shrink-0 underline-offset-4 hover:underline"
          >
            {t.infrastructure}
          </a>
        </nav>

        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenSso}
            className="px-4 py-2 text-xs sm:text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0B0D11] cursor-pointer"
          >
            {t.signIn}
          </button>
        </div>
      </div>
    </header>
  );
}
