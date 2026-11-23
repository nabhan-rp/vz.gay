import { useEffect, useRef } from 'react';
import { ArrowUpRight, Monitor, Moon, Search, Sun, X } from 'lucide-react';
import { UI_COPY, type Language } from '../data/i18n';
import type { ThemePreference } from '../hooks/useTheme';

interface HeroSearchProps {
  lang: Language;
  onChangeLang: (lang: Language) => void;
  theme: ThemePreference;
  onChangeTheme: (theme: ThemePreference) => void;
  searchQuery: string;
  onSearchQueryChange: (val: string) => void;
}

const LIVE_SHORTCUTS = [
  { label: 'search.vz.gay', href: 'https://search.vz.gay' },
  { label: 'files.vz.gay', href: 'https://files.vz.gay' },
  { label: 'myvault.app.vz.gay', href: 'https://myvault.app.vz.gay' },
  { label: 'pdftoblade.app.vz.gay', href: 'https://pdftoblade.app.vz.gay' },
  { label: 'directqr.app.vz.gay', href: 'https://directqr.app.vz.gay' },
  { label: 'inkframeflipbook.game.vz.gay', href: 'https://inkframeflipbook.game.vz.gay' },
  { label: 'lensastudio.vz.gay', href: 'https://lensastudio.vz.gay' },
  { label: 'wiyataxlms.code.vz.gay', href: 'https://wiyataxlms.code.vz.gay' },
];

export function HeroSearch({
  lang,
  onChangeLang,
  theme,
  onChangeTheme,
  searchQuery,
  onSearchQueryChange,
}: HeroSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const t = UI_COPY[lang];

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <section
      id="top"
      className="border-b border-slate-200 dark:border-[#232732] bg-white dark:bg-[#101319]"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-6 pb-12 sm:pb-16">
        {/* Utility Controls Row: Language (ID/EN) & Theme (System/Light/Dark) */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 sm:pb-10">
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {t.hero.kicker}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            {/* Language Switcher */}
            <div
              role="group"
              aria-label="Language"
              className="inline-flex items-center p-1 rounded-lg bg-slate-100 dark:bg-[#191D26] border border-slate-200/80 dark:border-[#262B38]"
            >
              <button
                type="button"
                onClick={() => onChangeLang('id')}
                aria-pressed={lang === 'id'}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                  lang === 'id'
                    ? 'bg-white dark:bg-[#242A37] text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {t.controls.langId}
              </button>
              <button
                type="button"
                onClick={() => onChangeLang('en')}
                aria-pressed={lang === 'en'}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                  lang === 'en'
                    ? 'bg-white dark:bg-[#242A37] text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {t.controls.langEn}
              </button>
            </div>

            {/* Theme Switcher (System default, Light, Dark) */}
            <div
              role="group"
              aria-label="Theme"
              className="inline-flex items-center p-1 rounded-lg bg-slate-100 dark:bg-[#191D26] border border-slate-200/80 dark:border-[#262B38]"
            >
              <button
                type="button"
                onClick={() => onChangeTheme('system')}
                aria-pressed={theme === 'system'}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                  theme === 'system'
                    ? 'bg-white dark:bg-[#242A37] text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>{t.controls.themeSystem}</span>
              </button>
              <button
                type="button"
                onClick={() => onChangeTheme('light')}
                aria-pressed={theme === 'light'}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                  theme === 'light'
                    ? 'bg-white dark:bg-[#242A37] text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span>{t.controls.themeLight}</span>
              </button>
              <button
                type="button"
                onClick={() => onChangeTheme('dark')}
                aria-pressed={theme === 'dark'}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-white dark:bg-[#242A37] text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span>{t.controls.themeDark}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Focal Block: Headline + Yandex-style Omni-Search */}
        <div className="max-w-3xl mx-auto text-center">
          <h1
            className="font-display font-bold tracking-tight text-slate-900 dark:text-white text-balance"
            style={{ fontSize: 'clamp(2.25rem, 4vw, 3.35rem)', lineHeight: 1.12 }}
          >
            {t.hero.title}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {t.hero.subtitle}
          </p>

          {/* Omni-Search Bar targeting search.vz.gay + live directory filtering */}
          <form
            action="https://search.vz.gay/search"
            method="GET"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8"
          >
            <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[#FAFAFA] dark:bg-[#0B0D11] border border-slate-300 dark:border-[#2A303E] focus-within:border-blue-600 dark:focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-600/15 transition-all duration-150">
              <div className="pl-3 text-slate-400 dark:text-slate-500 shrink-0">
                <Search className="w-5 h-5" />
              </div>
              <input
                ref={inputRef}
                type="text"
                name="q"
                value={searchQuery}
                onChange={(e) => onSearchQueryChange(e.target.value)}
                placeholder={t.hero.searchPlaceholder}
                aria-label={t.hero.searchPlaceholder}
                className="w-full min-w-0 bg-transparent py-2.5 px-1 text-sm sm:text-base text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none"
              />
              {searchQuery.trim().length > 0 && (
                <button
                  type="button"
                  onClick={() => onSearchQueryChange('')}
                  aria-label={t.hero.searchClear}
                  className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
              >
                {t.hero.searchSubmit}
              </button>
            </div>
            <p className="mt-2.5 text-xs text-slate-500 dark:text-slate-400">
              {t.hero.searchHint}
            </p>
          </form>
        </div>

        {/* Live Ecosystem Quick-Launch Strip */}
        <div className="mt-10 pt-6 border-t border-slate-200/80 dark:border-[#232732] flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 text-xs sm:text-sm">
          <span className="text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap shrink-0">
            {t.hero.quickLaunchLabel}
          </span>
          {LIVE_SHORTCUTS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-xs text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-150 whitespace-nowrap shrink-0"
            >
              <span>{item.label}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
