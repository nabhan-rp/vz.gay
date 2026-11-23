import { useState } from 'react';
import { EdgeAndSsoSection } from './components/EdgeAndSsoSection';
import { Footer } from './components/Footer';
import { HeroSearch } from './components/HeroSearch';
import { LiveAndDomainsSection } from './components/LiveAndDomainsSection';
import { ServiceDirectory, type DirectoryFilter } from './components/ServiceDirectory';
import { ServiceModal } from './components/ServiceModal';
import { SsoModal } from './components/SsoModal';
import { TopBar } from './components/TopBar';
import { VZ_SERVICES, type VzService } from './data/services';
import { useLanguage } from './hooks/useLanguage';
import { useTheme } from './hooks/useTheme';

export default function App() {
  const { theme, setTheme } = useTheme();
  const { lang, setLang } = useLanguage();
  const [filter, setFilter] = useState<DirectoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<VzService | null>(null);
  const [ssoOpen, setSsoOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-slate-900 dark:bg-[#0B0D11] dark:text-slate-100">
      <TopBar lang={lang} onOpenSso={() => setSsoOpen(true)} />

      <main className="flex-1">
        <HeroSearch
          lang={lang}
          onChangeLang={setLang}
          theme={theme}
          onChangeTheme={setTheme}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
        />

        <ServiceDirectory
          lang={lang}
          services={VZ_SERVICES}
          filter={filter}
          onFilterChange={setFilter}
          searchQuery={searchQuery}
          onSelectService={setSelectedService}
        />

        <LiveAndDomainsSection lang={lang} />

        <EdgeAndSsoSection lang={lang} onOpenSso={() => setSsoOpen(true)} />
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
        onClose={() => setSsoOpen(false)}
      />
    </div>
  );
}
