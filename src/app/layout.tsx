import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { siteInfo } from '@/constants/site-info';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: siteInfo.title,
  description: siteInfo.description,
};

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
