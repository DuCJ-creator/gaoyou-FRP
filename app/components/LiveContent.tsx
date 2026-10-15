'use client';

import { useEffect, useState } from 'react';
import { githubContentBaseUrl } from '../../site.config';

type ContentItem = { type: 'text' | 'image' | 'youtube' | 'link'; title: string; body?: string; url?: string; caption?: string };
type ProjectContent = { updatedAt?: string; items: ContentItem[] };

const isSafeUrl = (url = '') => /^(https?:\/\/|\/)/.test(url);

export default function LiveContent({ slug }: { slug: string }) {
  const [content, setContent] = useState<ProjectContent | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'fallback'>('loading');

  useEffect(() => {
    const controller = new AbortController();
    const base = githubContentBaseUrl.replace(/\/$/, '') || '/content';
    fetch(`${base}/${slug}.json?fresh=${Date.now()}`, { cache: 'no-store', signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Content unavailable');
        return response.json();
      })
      .then((data: ProjectContent) => { setContent(data); setStatus('ready'); })
      .catch((error) => { if (error.name !== 'AbortError') setStatus('fallback'); });
    return () => controller.abort();
  }, [slug]);

  if (status === 'loading') return <p className="content-status">正在讀取最新內容…</p>;
  if (!content?.items?.length) {
    return (
      <div className="empty-content">
        <span>＋</span><h3>等待第一篇內容</h3>
        <p>未來在 GitHub 更新文字、圖片、影片或連結後，內容會顯示在這裡。</p>
      </div>
    );
  }

  return (
    <div className="live-content-grid">
      {content.items.map((item, index) => (
        <article className={`content-item content-${item.type}`} key={`${item.title}-${index}`}>
          <span className="content-type">{item.type}</span>
          {item.type === 'image' && item.url && isSafeUrl(item.url) && (
            // Content editors may use any trusted GitHub-hosted image URL, so a fixed image host allowlist is intentionally avoided.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={item.url} alt={item.caption || item.title} />
          )}
          {item.type === 'youtube' && item.url && isSafeUrl(item.url) && (
            <div className="video-frame"><iframe src={item.url} title={item.title} loading="lazy" allowFullScreen /></div>
          )}
          <div className="content-copy">
            <h3>{item.title}</h3>{item.body && <p>{item.body}</p>}
            {item.type === 'link' && item.url && isSafeUrl(item.url) && <a href={item.url} target="_blank" rel="noreferrer">開啟外部連結 ↗</a>}
          </div>
        </article>
      ))}
      {content.updatedAt && <p className="updated-time">內容更新：{content.updatedAt}</p>}
    </div>
  );
}
