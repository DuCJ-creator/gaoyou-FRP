'use client';

import type { CSSProperties, MouseEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const projects = [
  { number: '01', title: '指尖上的「愛單字」', english: 'iVocab Online', href: '/projects/ivocab', x: 11.5, color: '#dda11f' },
  { number: '02', title: '漫遊故事林', english: 'To Wander in Stories', href: '/projects/stories', x: 30.5, color: '#b85838' },
  { number: '03', title: '縱覽人間世', english: 'To Explore the World', href: '/projects/world', x: 50.5, color: '#718f5f' },
  { number: '04', title: '共舞科學園', english: 'To Dance with Science', href: '/projects/science', x: 70, color: '#287a87' },
  { number: '05', title: '筆尖下的 AI 魔法', english: 'To Write with AI', href: '/projects/ai-writing', x: 89, color: '#303d74' },
];

export default function DoorPortalHome() {
  const router = useRouter();
  const timer = useRef<number | null>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    projects.forEach((project) => router.prefetch(project.href));
    return () => { if (timer.current) window.clearTimeout(timer.current); };
  }, [router]);

  const enterDoor = (event: MouseEvent<HTMLAnchorElement>, index: number) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (active !== null) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      router.push(projects[index].href);
      return;
    }
    setActive(index);
    timer.current = window.setTimeout(() => router.push(projects[index].href), 950);
  };

  const activeProject = active === null ? null : projects[active];
  const transitionStyle = activeProject ? ({ '--portal-x': `${activeProject.x}%`, '--portal-color': activeProject.color } as CSSProperties) : undefined;

  return (
    <main className={`portal-home ${active !== null ? 'is-entering' : ''}`} style={transitionStyle}>
      <h1 className="sr-only">忠信雙語教案特色課程 / Signature Bi-Lingual Courses @ FRP CHHS</h1>
      <header className="portal-mobile-title">
        <p>忠信雙語教案特色課程</p>
        <span>Signature Bi-Lingual Courses @ FRP CHHS</span>
      </header>

      <section className="portal-scene" aria-label="選擇一扇門進入特色課程 / Choose a door to enter a signature course">
        <div className="portal-stage">
          {/* The supplied social-preview artwork is used as the interactive home scene. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="portal-artwork" src="/og.png" alt="五條彩色道路通往五扇學習之門 / Five colorful paths leading to five doors of learning" />
          <div className="portal-light" aria-hidden="true" />
          {projects.map((project, index) => (
            <a
              className={`portal-door ${active === index ? 'is-selected' : ''}`}
              href={project.href}
              key={project.number}
              onClick={(event) => enterDoor(event, index)}
              style={{ '--door-x': `${project.x}%`, '--door-color': project.color } as CSSProperties}
              aria-label={`進入${project.title} / Enter ${project.english}`}
            >
              <span>{project.title} / {project.english}</span>
            </a>
          ))}
        </div>

        <nav className="portal-links" aria-label="特色課程入口 / Signature course entrances">
          {projects.map((project, index) => (
            <a
              href={project.href}
              key={project.number}
              onClick={(event) => enterDoor(event, index)}
              style={{ '--door-color': project.color } as CSSProperties}
              className={active === index ? 'is-selected' : ''}
            >
              <span>專案 {project.number} / PROJECT {project.number}</span>
              <strong>{project.title}</strong>
              <em>{project.english}</em>
              <i aria-hidden="true">進入 / ENTER →</i>
            </a>
          ))}
        </nav>
      </section>

      <footer className="portal-footer">
        <span>選擇一扇門，沿著路徑進入課程。</span>
        <span>Choose a door and follow its path into the course.</span>
      </footer>
      <div className="portal-transition" aria-hidden="true" />
      <p className="sr-only" aria-live="polite">{activeProject ? `正在進入${activeProject.title} / Entering ${activeProject.english}` : ''}</p>
    </main>
  );
}
