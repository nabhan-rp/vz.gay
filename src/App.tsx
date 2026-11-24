import { lazy, Suspense, useEffect, useState } from 'react';
import { Footer } from './components/Footer';
import { HeroSearch } from './components/HeroSearch';
import { HomeOverview } from './components/HomeOverview';
import type { DirectoryFilter } from './components/ServiceDirectory';
import { ServiceModal } from './components/ServiceModal';
import { SsoModal } from './components/SsoModal';
import { TopBar } from './components/TopBar';
import { UI_COPY } from './data/i18n';
import { VZ_SERVICES, type VzService } from './data/services';
import { useLanguage } from './hooks/useLanguage';
import { filterToPath, usePathRouter } from './hooks/usePathRouter';
import { useSsoSession } from './hooks/useSsoSession';
import { useTheme } from './hooks/useTheme';

const LazyServiceDirectory = lazy(async () => {
  const mod = await import('./components/ServiceDirectory');
  return { default: mod.ServiceDirectory };
});

const LazyVzDeskSection = lazy(async () => {
  const mod = await import('./components/VzDeskSection');
  return { default: mod.VzDeskSection };
});

const LazyLiveAndDomainsSection = lazy(async () => {
  const mod = await import('./components/LiveAndDomainsSection');
  return { default: mod.LiveAndDomainsSection };
});

const LazyEdgeAndSsoSection = lazy(async () => {
  const mod = await import('./components/EdgeAndSsoSection');
  return { default: mod.EdgeAndSsoSection };
});

function RouteLoadingSkeleton() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
      <div className="h-7 w-64 rounded-lg bg-slate-200/70 dark:bg-[#191E28] animate-pulse" />
      <div className="mt-3 h-4 w-96 max-w-full rounded-lg bg-slate-200/50 dark:bg-[#151922] animate-pulse" />
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[0, 1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="h-48 rounded-xl bg-white dark:bg-[#13161C] border border-slate-200 dark:border-[#232732]"
          />
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const { theme, setTheme } = useTheme();
  const { lang, setLang } = useLanguage();
  const { session, age, isVerifiedAdult21, signIn, signOut } = useSsoSession();
  const { route, navigate } = usePathRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<VzService | null>(null);
  const [ssoOpen, setSsoOpen] = useState(false);

  // Sync document title and canonical link per route
  useEffect(() => {
    const t = UI_COPY[lang];
    let pageTitle = 'vz.gay — Portal Navigasi & Ekosistem SaaS Terpadu';

    if (route.view === 'services') {
      const catLabel = t.directory.tabs[route.filter];
      pageTitle =
        route.filter === 'all'
          ? `${t.directory.sectionTitle} — vz.gay`
          : `${catLabel} · ${t.directory.sectionTitle} — vz.gay`;
    } else if (route.view === 'desk') {
      pageTitle = `${t.vzDesk.sectionTitle} — vz.gay`;
    } else if (route.view === 'live_domains') {
      pageTitle = `${t.liveAndDomains.sectionTitle} — vz.gay`;
    } else if (route.view === 'about') {
      pageTitle = `${t.edgeAndSso.sectionTitle} — vz.gay`;
    }

    document.title = pageTitle;

    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) {
      canonical.href = `https://vz.gay${route.pathname === '/' ? '/' : route.pathname}`;
    }
  }, [route.view, route.filter, route.pathname, lang]);

  const handleFilterChange = (nextFilter: DirectoryFilter) => {
    navigate(filterToPath(nextFilter));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-slate-900 dark:bg-[#0B0D11] dark:text-slate-100">
      <TopBar
        lang={lang}
        onChangeLang={setLang}
        theme={theme}
        onChangeTheme={setTheme}
        route={route}
        isAuthenticated={session.isAuthenticated}
        username={session.username}
        onNavigate={navigate}
        onOpenSso={() => setSsoOpen(true)}
      />

      <main className="flex-1">
        <HeroSearch
          lang={lang}
          onChangeLang={setLang}
          theme={theme}
          onChangeTheme={setTheme}
          route={route}
          onNavigate={navigate}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
        />

        {route.view === 'home' ? (
          <HomeOverview
            lang={lang}
            searchQuery={searchQuery}
            isVerifiedAdult21={isVerifiedAdult21}
            onNavigate={navigate}
            onSelectService={setSelectedService}
          />
        ) : (
          <Suspense fallback={<RouteLoadingSkeleton />}>
            {route.view === 'services' && (
              <LazyServiceDirectory
                lang={lang}
                services={VZ_SERVICES}
                filter={route.filter}
                onFilterChange={handleFilterChange}
                searchQuery={searchQuery}
                isVerifiedAdult21={isVerifiedAdult21}
                onSelectService={setSelectedService}
              />
            )}

            {route.view === 'desk' && (
              <LazyVzDeskSection
                lang={lang}
                searchQuery={searchQuery}
                onSelectService={setSelectedService}
              />
            )}

            {route.view === 'live_domains' && (
              <LazyLiveAndDomainsSection lang={lang} />
            )}

            {route.view === 'about' && (
              <LazyEdgeAndSsoSection
                lang={lang}
                onOpenSso={() => setSsoOpen(true)}
              />
            )}
          </Suspense>
        )}
      </main>

      <Footer lang={lang} onOpenSso={() => setSsoOpen(true)} />

      <ServiceModal
        service={selectedService}
        lang={lang}
        onClose={() => setSelectedService(null)}
      />

      <SsoModal
        isOpen={ssoOpen}
        lang={lang}
        session={session}
        age={age}
        isVerifiedAdult21={isVerifiedAdult21}
        onSignIn={signIn}
        onSignOut={signOut}
        onClose={() => setSsoOpen(false)}
      />
    </div>
  );
}
