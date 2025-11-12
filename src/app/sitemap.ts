import type { MetadataRoute } from 'next';
import { serviceRoutesForSitemap, staticRoutesForSitemap } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutesForSitemap,
    ...serviceRoutesForSitemap,
  ].map((route) => ({
    url: route.url,
    lastModified: route.lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
