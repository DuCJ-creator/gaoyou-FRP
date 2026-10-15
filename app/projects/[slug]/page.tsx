import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import LiveContent from '../../components/LiveContent';
import { projectBySlug, projects } from '../project-data';

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug[slug];
  if (!project) return {};
  return {
    title: `${project.title}｜五徑學堂`,
    description: project.intro,
    openGraph: { title: `${project.title}｜五徑學堂`, description: project.intro, images: [] },
    twitter: { card: 'summary', title: `${project.title}｜五徑學堂`, description: project.intro, images: [] },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectBySlug[slug];
  if (!project) notFound();

  return (
    <main className={`project-page ${project.theme}`}>
      <nav className="project-nav" aria-label="專案導覽">
        <Link className="brand" href="/"><span className="brand-mark">高</span><span>五徑學堂</span></Link>
        <div className="project-switcher">
          {projects.map((item) => (
            <Link key={item.slug} href={`/projects/${item.slug}`} aria-current={item.slug === slug ? 'page' : undefined} title={item.title}>
              {item.number}
            </Link>
          ))}
        </div>
        <Link className="back-home" href="/">所有專案 ↗</Link>
      </nav>

      <header className="project-hero">
        <div className="project-hero-copy">
          <p className="project-eyebrow">PROJECT {project.number} · {project.eyebrow}</p>
          <h1>{project.title}</h1>
          <p className="project-english">{project.english}</p>
          <p className="project-intro">{project.intro}</p>
        </div>
        <div className="project-art" aria-hidden="true">
          <span className="art-ring art-ring-one" /><span className="art-ring art-ring-two" />
          <span className="art-line" /><strong>{project.symbol}</strong>
        </div>
        <p className="project-quote">“{project.quote}”</p>
      </header>

      <section className="content-section">
        <div className="content-heading">
          <div><p>{project.sectionNote}</p><h2>{project.sectionTitle}</h2></div>
          <span>內容會從 GitHub 取得最新版本</span>
        </div>
        <LiveContent slug={slug} />
      </section>

      <section className="resource-preview" aria-labelledby="resource-title">
        <div className="resource-title-wrap"><p>RESOURCE FRAMEWORK</p><h2 id="resource-title">內容模組</h2></div>
        <div className="resource-list">
          {[
            ['01', '文字文章', '主題說明、學習筆記與長文內容'],
            ['02', '圖片圖輯', '作品照片、插圖與說明文字'],
            ['03', '影音探索', 'YouTube 影片與教學內容'],
            ['04', '延伸連結', '外部網站與更多學習資源'],
          ].map(([number, title, description]) => (
            <div className="resource-row" key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p><i>即將加入</i></div>
          ))}
        </div>
      </section>

      <footer className="project-footer">
        <Link href="/">← 回到五個專案</Link><span>PROJECT {project.number} / 05</span>
      </footer>
    </main>
  );
}
