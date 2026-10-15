import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: '忠信雙語教案特色課程｜Signature Bi-Lingual Courses @ FRP CHHS',
  description: '五個雙語特色課程：單字、故事、世界、科學與 AI 寫作。Five signature bilingual courses in vocabulary, stories, world exploration, science, and AI writing.',
  openGraph: {
    title: '忠信雙語教案特色課程｜Signature Bi-Lingual Courses @ FRP CHHS',
    description: '五種探索，打開學習的五扇門。Five paths. Five doors to learning.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: '忠信雙語教案特色課程的五條學習路徑' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '忠信雙語教案特色課程｜Signature Bi-Lingual Courses @ FRP CHHS',
    description: '五種探索，打開學習的五扇門。Five paths. Five doors to learning.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-Hant"><body>{children}</body></html>;
}
