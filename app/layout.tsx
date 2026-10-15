import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: '五徑學堂｜高優學習計畫',
  description: '五個主題、五種探索方式：單字、故事、世界、科學與 AI 寫作。',
  openGraph: {
    title: '五徑學堂｜高優學習計畫',
    description: '五種探索，打開學習的五扇門。',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: '五徑學堂的五條學習路徑' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '五徑學堂｜高優學習計畫',
    description: '五種探索，打開學習的五扇門。',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-Hant"><body>{children}</body></html>;
}
