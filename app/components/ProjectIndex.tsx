import Link from 'next/link';
import ImageCarousel from './ImageCarousel';

export type ProjectData = {
  number: string;
  title: string;
  english: string;
  tagline: string;
  intro: string;
  theme: string;
  symbol: string;
  imageFolder: string;
  sections: { title: string; text: string }[];
  youtube: { title: string; url: string }[];
  links: { label: string; url: string }[];
};

export default function ProjectIndex({ data }: { data: ProjectData }) {
  return (
    <main className={`simple-project ${data.theme}`}>
      <nav className="simple-nav">
        <Link className="brand" href="/"><span className="brand-mark">高</span><span>五徑學堂</span></Link>
        <Link href="/">回到五個專案</Link>
      </nav>
      <header className="simple-hero">
        <div><p>PROJECT {data.number}</p><h1>{data.title}</h1><span>{data.english}</span></div>
        <strong aria-hidden="true">{data.symbol}</strong>
        <p className="simple-intro">{data.intro}</p>
      </header>
      <section className="carousel-section" aria-labelledby="gallery-title">
        <div className="simple-section-title"><p>GALLERY</p><h2 id="gallery-title">圖片集</h2></div>
        <ImageCarousel folder={data.imageFolder} title={data.title} />
      </section>
      {data.sections.length > 0 && (
        <section className="text-section">
          {data.sections.map((section) => <article key={section.title}><h2>{section.title}</h2><p>{section.text}</p></article>)}
        </section>
      )}
      {(data.youtube.length > 0 || data.links.length > 0) && (
        <section className="link-section">
          {data.youtube.map((video) => <a key={video.url} href={video.url} target="_blank" rel="noreferrer">▶ {video.title}</a>)}
          {data.links.map((link) => <a key={link.url} href={link.url} target="_blank" rel="noreferrer">{link.label} ↗</a>)}
        </section>
      )}
      <footer className="project-footer"><span>{data.tagline}</span><span>PROJECT {data.number} / 05</span></footer>
    </main>
  );
}
