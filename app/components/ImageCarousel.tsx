'use client';

import { useCallback, useEffect, useState } from 'react';
import { githubImages } from '../../site.config';

type GitHubFile = { name: string; type: string; download_url: string | null };
type Slide = { name: string; url: string };
const imagePattern = /\.(avif|gif|jpe?g|png|webp)$/i;

export default function ImageCarousel({ folder, title }: { folder: string; title: string }) {
  const configured = Boolean(githubImages.owner && githubImages.repo);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [current, setCurrent] = useState(0);
  const [state, setState] = useState<'loading' | 'ready' | 'setup' | 'empty' | 'error'>(configured ? 'loading' : 'setup');
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!configured) return;
    const controller = new AbortController();
    const safeFolder = folder.split('/').map(encodeURIComponent).join('/');
    const url = `https://api.github.com/repos/${encodeURIComponent(githubImages.owner)}/${encodeURIComponent(githubImages.repo)}/contents/${safeFolder}?ref=${encodeURIComponent(githubImages.branch)}`;
    fetch(url, { cache: 'no-store', signal: controller.signal, headers: { Accept: 'application/vnd.github+json' } })
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load images');
        return response.json();
      })
      .then((files: GitHubFile[]) => {
        const images = files
          .filter((file) => file.type === 'file' && file.download_url && imagePattern.test(file.name))
          .map((file) => ({ name: file.name.replace(/[-_]/g, ' ').replace(/\.[^.]+$/, ''), url: file.download_url as string }));
        setSlides(images);
        setState(images.length ? 'ready' : 'empty');
      })
      .catch((error) => { if (error.name !== 'AbortError') setState('error'); });
    return () => controller.abort();
  }, [configured, folder]);

  const goTo = useCallback((index: number) => {
    if (slides.length) setCurrent((index + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (state !== 'ready' || paused || slides.length < 2) return;
    const timer = window.setInterval(() => goTo(current + 1), 5000);
    return () => window.clearInterval(timer);
  }, [current, goTo, paused, slides.length, state]);

  if (state !== 'ready') {
    const message = {
      loading: '正在從 GitHub 讀取圖片… / Loading images from GitHub…',
      setup: '設定 GitHub repository 後，圖片會自動顯示在這裡。 / Connect a GitHub repository to display images automatically.',
      empty: `GitHub 的 ${folder} 資料夾目前沒有圖片。 / No images were found in ${folder}.`,
      error: '暫時無法讀取 GitHub 圖片，請稍後再試。 / Images are temporarily unavailable. Please try again later.',
      ready: '',
    }[state];
    return <div className="carousel-empty"><span>圖片輪播 / IMAGE CAROUSEL</span><p>{message}</p></div>;
  }

  return (
    <div className="carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <div className="carousel-stage" aria-live="polite">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={slides[current].url} alt={`${title}：${slides[current].name}`} />
        <p>{slides[current].name}</p>
      </div>
      {slides.length > 1 && (
        <div className="carousel-controls">
          <button type="button" onClick={() => goTo(current - 1)} aria-label="上一張圖片 / Previous image">←</button>
          <div className="carousel-dots" aria-label="選擇圖片 / Choose an image">
            {slides.map((slide, index) => (
              <button key={slide.url} type="button" className={index === current ? 'active' : ''} onClick={() => goTo(index)} aria-label={`第 ${index + 1} 張 / Image ${index + 1}: ${slide.name}`} />
            ))}
          </div>
          <button type="button" onClick={() => goTo(current + 1)} aria-label="下一張圖片 / Next image">→</button>
        </div>
      )}
    </div>
  );
}
