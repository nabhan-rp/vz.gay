import { useCallback, useEffect, useState } from 'react';
import type { DirectoryFilter } from '../components/ServiceDirectory';

export type RouteView = 'home' | 'services' | 'desk' | 'live_domains' | 'about' | 'legal';
export type LegalTab = 'terms' | 'privacy' | 'abuse';

export interface ParsedRoute {
  view: RouteView;
  filter: DirectoryFilter;
  legalTab: LegalTab;
  pathname: string;
}

const SLUG_TO_FILTER: Record<string, DirectoryFilter> = {
  all: 'all',
  live: 'live',
  productivity: 'productivity',
  web: 'web_business',
  web_business: 'web_business',
  cloud: 'developer_cloud',
  developer_cloud: 'developer_cloud',
  media: 'media_content',
  media_content: 'media_content',
  edu: 'education',
  education: 'education',
  system: 'system_community',
  system_community: 'system_community',
};

const FILTER_TO_PATH: Record<DirectoryFilter, string> = {
  all: '/services',
  live: '/services/live',
  productivity: '/services/productivity',
  web_business: '/services/web',
  developer_cloud: '/services/cloud',
  media_content: '/services/media',
  education: '/services/edu',
  system_community: '/services/system',
};

export function filterToPath(filter: DirectoryFilter): string {
  return FILTER_TO_PATH[filter] || '/services';
}

export function legalTabToPath(tab: LegalTab): string {
  return `/legal/${tab}`;
}

export function parsePathname(rawPathname: string): ParsedRoute {
  const clean = rawPathname.replace(/\/+$/, '').toLowerCase() || '/';

  if (clean === '/') {
    return { view: 'home', filter: 'all', legalTab: 'terms', pathname: '/' };
  }

  if (clean === '/desk' || clean === '/vz-desk') {
    return { view: 'desk', filter: 'all', legalTab: 'terms', pathname: '/desk' };
  }

  if (clean === '/live-domains' || clean === '/live' || clean === '/domains') {
    return { view: 'live_domains', filter: 'all', legalTab: 'terms', pathname: '/live-domains' };
  }

  if (clean === '/about' || clean === '/infrastructure' || clean === '/partners') {
    return { view: 'about', filter: 'all', legalTab: 'terms', pathname: '/about' };
  }

  if (clean === '/legal' || clean === '/legal/terms' || clean === '/terms' || clean === '/tos') {
    return { view: 'legal', filter: 'all', legalTab: 'terms', pathname: '/legal/terms' };
  }

  if (clean === '/legal/privacy' || clean === '/privacy') {
    return { view: 'legal', filter: 'all', legalTab: 'privacy', pathname: '/legal/privacy' };
  }

  if (
    clean === '/legal/abuse' ||
    clean === '/legal/dmca' ||
    clean === '/abuse' ||
    clean === '/dmca'
  ) {
    return { view: 'legal', filter: 'all', legalTab: 'abuse', pathname: '/legal/abuse' };
  }

  if (clean === '/services') {
    return { view: 'services', filter: 'all', legalTab: 'terms', pathname: '/services' };
  }

  if (clean.startsWith('/services/')) {
    const slug = clean.slice('/services/'.length).split('/')[0];
    const mappedFilter = SLUG_TO_FILTER[slug] || 'all';
    return {
      view: 'services',
      filter: mappedFilter,
      legalTab: 'terms',
      pathname: filterToPath(mappedFilter),
    };
  }

  return { view: 'home', filter: 'all', legalTab: 'terms', pathname: '/' };
}

export function usePathRouter() {
  const [pathname, setPathname] = useState<string>(() =>
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((to: string) => {
    if (typeof window === 'undefined') return;
    const target = to.startsWith('/') ? to : `/${to}`;
    if (window.location.pathname !== target) {
      window.history.pushState({}, '', target);
      setPathname(target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const route = parsePathname(pathname);

  return {
    route,
    navigate,
  };
}
