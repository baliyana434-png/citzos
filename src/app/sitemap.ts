import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.citzos.in';
  const routes = [
    '',
    '/helpline',
    '/skills',
    '/saved',
    '/forms',
    '/login',
    '/privacy',
    '/terms',
    '/refund',
    '/contact',
    '/disclaimer',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === '' || route === '/helpline' || route === '/skills' || route === '/forms' ? 'daily' : 'monthly') as 'daily' | 'monthly',
    priority: route === '' ? 1.0 : (route === '/helpline' || route === '/skills' || route === '/forms') ? 0.9 : 0.7,
  }));
}
