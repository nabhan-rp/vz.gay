import type { PagesFunction } from './types';

const DEFAULT_HOST_REDIRECTS: Record<string, string> = {
  'kaca.blog': 'https://go-blog.vz.gay',
  'www.kaca.blog': 'https://go-blog.vz.gay',
  'blog.vz.gay': 'https://goblog.vz.gay',
};

export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url);
  const host = url.hostname.toLowerCase();

  // 1. Check KV edge cache for host-based 301 redirects
  if (context.env.PORTAL_KV) {
    try {
      const kvTarget = await context.env.PORTAL_KV.get(`redirect:${host}`, 'text');
      if (typeof kvTarget === 'string' && kvTarget.startsWith('http')) {
        return Response.redirect(`${kvTarget}${url.pathname}${url.search}`, 301);
      }
    } catch {
      // Fall through to static/default redirect map
    }
  }

  // 2. Built-in 301 root domain redirects for go-blog / goblog ecosystem
  const defaultTarget = DEFAULT_HOST_REDIRECTS[host];
  if (defaultTarget) {
    return Response.redirect(`${defaultTarget}${url.pathname}${url.search}`, 301);
  }

  const response = await context.next();
  const headers = new Headers(response.headers);
  headers.set('X-Edge-Platform', 'Cloudflare-Pages-Workers');
  headers.set('X-Content-Type-Options', 'nosniff');

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
};
