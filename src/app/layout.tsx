import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { siteInfo } from '@/constants/site-info';

// 导入ClientProvider
import { ClientProvider } from '@/components/common/client-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: siteInfo.metaInfo.title,
  description: siteInfo.metaInfo.description,
  keywords: siteInfo.metaInfo.keywords,
  openGraph: {
    title: siteInfo.ogInfo.title,
    description: siteInfo.ogInfo.description,
    images: [siteInfo.ogInfo.image],
    url: siteInfo.ogInfo.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
    >
      <body className={inter.className}>
        <ClientProvider>
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
