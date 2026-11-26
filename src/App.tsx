import { lazy, Suspense, useEffect, useState } from 'react';
import { AdultGateModal } from './components/AdultGateModal';
import { Footer } from './components/Footer';
import { HeroSearch } from './components/HeroSearch';
import { HomeOverview } from './components/HomeOverview';
import type { DirectoryFilter } from './components/ServiceDirectory';
import { ServiceModal } from './components/ServiceModal';
import { TopBar } from './components/TopBar';
import { UI_COPY } from './data/i18n';
import { VZ_SERVICES, type VzService } from './data/services';
import { useLanguage } from './hooks/useLanguage';
import { filterToPath, usePathRouter } from './hooks/usePathRouter';
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

const LazyLegalPage = lazy(async () => {
  const mod = await import('./components/LegalPage');
  return { default: mod.LegalPage };
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
  const { route, navigate } = usePathRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<VzService | null>(null);
  const [adultGateService, setAdultGateService] = useState<VzService | null>(null);

  const handleSelectService = (svc: VzService) => {
    if (svc.ageRestricted) {
      setAdultGateService(svc);
      return;
    }
    setSelectedService(svc);
  };

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
    } else if (route.view === 'legal') {
      const legalLabel =
        route.legalTab === 'terms'
          ? t.footer.termsLink
          : route.legalTab === 'privacy'
            ? t.footer.privacyLink
            : t.footer.abuseLink;
      pageTitle = `${legalLabel} — vz.gay`;
    }

    document.title = pageTitle;

    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) {
      canonical.href = `https://vz.gay${route.pathname === '/' ? '/' : route.pathname}`;
    }
  }, [route.view, route.filter, route.legalTab, route.pathname, lang]);

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
        onNavigate={navigate}
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
            onNavigate={navigate}
            onSelectService={handleSelectService}
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
                onSelectService={handleSelectService}
              />
            )}

            {route.view === 'desk' && (
              <LazyVzDeskSection
                lang={lang}
                searchQuery={searchQuery}
                onSelectService={handleSelectService}
              />
            )}

            {route.view === 'live_domains' && (
              <LazyLiveAndDomainsSection lang={lang} />
            )}

            {route.view === 'about' && (
              <LazyEdgeAndSsoSection
                lang={lang}
                onNavigate={navigate}
              />
            )}

            {route.view === 'legal' && (
              <LazyLegalPage
                lang={lang}
                activeTab={route.legalTab}
                onNavigate={navigate}
              />
            )}
          </Suspense>
        )}
      </main>

      <Footer lang={lang} onNavigate={navigate} />

      <ServiceModal
        service={selectedService}
        lang={lang}
        onClose={() => setSelectedService(null)}
      />

      <AdultGateModal
        service={adultGateService}
        lang={lang}
        onClose={() => setAdultGateService(null)}
      />
    </div>
  );
}
