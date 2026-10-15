import Link from 'next/link';
import ImageCarousel from './ImageCarousel';

export type ProjectData = {
  number: string;
  title: string;
  english: string;
  taglineZh: string;
  taglineEn: string;
  introZh: string;
  introEn: string;
  theme: string;
  symbol: string;
  imageFolder: string;
  logo: { src: string; altZh: string; altEn: string };
  embed: { titleZh: string; titleEn: string; url: string };
  sections: { titleZh: string; titleEn: string; textZh: string; textEn: string }[];
  youtube: { titleZh: string; titleEn: string; url: string }[];
  links: { labelZh: string; labelEn: string; url: string }[];
};

const isSafeUrl = (url: string) => /^(https?:\/\/|\/)/.test(url);

export default function ProjectIndex({ data }: { data: ProjectData }) {
  const showLogo = data.logo.src && isSafeUrl(data.logo.src);
  const showEmbed = data.embed.url && /^https?:\/\//.test(data.embed.url);

  return (
    <main className={`simple-project ${data.theme}`}>
      <nav className="simple-nav">
        <Link className="brand" href="/">
          <span className="brand-mark">忠</span>
          <span className="brand-copy"><b>忠信雙語教案特色課程</b><small>Signature Bi-Lingual Courses @ FRP CHHS</small></span>
        </Link>
        <Link href="/">回到五個專案 / All Projects</Link>
      </nav>

      <header className="simple-hero">
        <div>
          <p>專案 {data.number} / PROJECT {data.number}</p>
          <h1>{data.title}</h1>
          <span>{data.english}</span>
        </div>
        <div className="project-logo" aria-label="專案標誌 / Project logo">
          {showLogo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={data.logo.src} alt={`${data.logo.altZh} / ${data.logo.altEn}`} />
          ) : (
            <><strong aria-hidden="true">{data.symbol}</strong><p>專案標誌<br /><span>PROJECT LOGO</span></p></>
          )}
        </div>
        <p className="simple-intro">{data.introZh}<span>{data.introEn}</span></p>
      </header>

      <section className="carousel-section" aria-labelledby={`gallery-title-${data.number}`}>
        <div className="simple-section-title"><p>圖片集 / GALLERY</p><h2 id={`gallery-title-${data.number}`}>影像紀錄 <span>Visual Stories</span></h2></div>
        <ImageCarousel folder={data.imageFolder} title={`${data.title} / ${data.english}`} />
      </section>

      {data.sections.length > 0 && (
        <section className="text-section">
          {data.sections.map((section) => (
            <article key={section.titleEn}>
              <h2>{section.titleZh}<span>{section.titleEn}</span></h2>
              <p>{section.textZh}<span>{section.textEn}</span></p>
            </article>
          ))}
        </section>
      )}

      <section className="embed-section" aria-labelledby={`embed-title-${data.number}`}>
        <div className="simple-section-title"><p>外部頁面 / EXTERNAL PAGE</p><h2 id={`embed-title-${data.number}`}>{data.embed.titleZh}<span>{data.embed.titleEn}</span></h2></div>
        {showEmbed ? (
          <div className="embed-frame">
            <iframe src={data.embed.url} title={`${data.embed.titleZh} / ${data.embed.titleEn}`} loading="lazy" allowFullScreen sandbox="allow-forms allow-popups allow-presentation allow-same-origin allow-scripts" />
            <a href={data.embed.url} target="_blank" rel="noreferrer">無法顯示？另開頁面 / Open in a new tab ↗</a>
          </div>
        ) : (
          <div className="embed-empty"><span>IFRAME</span><p>在 data.json 填入外部網址後，頁面會嵌入顯示在這裡。<br />Add an external URL in data.json to embed the page here.</p></div>
        )}
      </section>

      {(data.youtube.length > 0 || data.links.length > 0) && (
        <section className="link-section" aria-label="影音與延伸連結 / Videos and additional links">
          {data.youtube.map((video) => <a key={video.url} href={video.url} target="_blank" rel="noreferrer">▶ {video.titleZh} / {video.titleEn}</a>)}
          {data.links.map((link) => <a key={link.url} href={link.url} target="_blank" rel="noreferrer">{link.labelZh} / {link.labelEn} ↗</a>)}
        </section>
      )}

      <footer className="project-footer"><span>{data.taglineZh} / {data.taglineEn}</span><span>專案 {data.number} / PROJECT {data.number} OF 05</span></footer>
    </main>
  );
}
