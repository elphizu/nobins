import type { MetadataRoute } from 'next';

import { env } from '@/env';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: ['/p/', '/d/', '/new'],
    },
    sitemap: `${env.siteUrl}/sitemap.xml`,
  };
}
