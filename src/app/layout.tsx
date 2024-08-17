import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { siteInfo } from '@/constants/site-info';

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

export const runtime = 'edge';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}