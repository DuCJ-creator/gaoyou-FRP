import Link from 'next/link';

const projects = [
  { number: '01', title: '指尖上的「愛單字」', english: 'iVocab Online', description: '讓單字不只被記住，也能在指尖被理解、使用與收藏。', descriptionEn: 'Understand, use, and collect new words right at your fingertips.', href: '/projects/ivocab', className: 'project-vocab', symbol: 'Aa' },
  { number: '02', title: '漫遊故事林', english: 'To Wander in Stories', description: '循著文字的小徑，走進故事深處，遇見想像與共鳴。', descriptionEn: 'Follow the trail of words into imagination, meaning, and connection.', href: '/projects/stories', className: 'project-stories', symbol: '⌁' },
  { number: '03', title: '縱覽人間世', english: 'To Explore the World', description: '把世界化作一張可展開的地圖，看見文化與生活的多種樣貌。', descriptionEn: 'Explore the many ways people, cultures, and communities shape our world.', href: '/projects/world', className: 'project-world', symbol: '◎' },
  { number: '04', title: '共舞科學園', english: 'To Dance with Science', description: '從好奇出發，在觀察、提問與實驗之間，和科學一起舞動。', descriptionEn: 'Let curiosity lead through observation, questions, and experiments.', href: '/projects/science', className: 'project-science', symbol: '✦' },
  { number: '05', title: '筆尖下的 AI 魔法', english: 'To Write with AI', description: '讓創意與人工智慧並肩，把一個念頭寫成更遠的可能。', descriptionEn: 'Write alongside AI and turn a single idea into new possibilities.', href: '/projects/ai-writing', className: 'project-ai', symbol: '✎' },
];

export default function Home() {
  return (
    <main className="home-shell">
      <nav className="topbar" aria-label="主要導覽">
        <Link className="brand" href="/" aria-label="回到首頁">
          <span className="brand-mark">忠</span><span className="brand-copy"><b>忠信雙語教案特色課程</b><small>Signature Bi-Lingual Courses @ FRP CHHS</small></span>
        </Link>
        <span className="nav-note">五種探索 · 一段學習旅程 / Five paths · One learning journey</span>
      </nav>

      <section className="home-hero">
        <div className="hero-copy">
          <p className="eyebrow">2026 · 特色課程 / SIGNATURE COURSES</p>
          <h1>五種探索，<br /><em>打開學習的五扇門。</em><span className="hero-en">Five paths. Five doors to learning.</span></h1>
          <p className="hero-intro">從單字、故事與世界出發，走進科學，再以 AI 寫下新的想像。選一條路，開始你的探索。<span>Begin with words, stories, and the world; step into science, then write new possibilities with AI. Choose a path and start exploring.</span></p>
        </div>
        <div className="hero-orbit" aria-hidden="true">
          <span className="orbit-ring" /><span className="orbit-dot dot-one" />
          <span className="orbit-dot dot-two" /><span className="orbit-dot dot-three" />
          <span className="orbit-core">5</span>
        </div>
      </section>

      <section className="projects-section" aria-labelledby="projects-heading">
        <div className="section-heading">
          <p id="projects-heading">選擇探索路徑 / CHOOSE YOUR PATH</p><span>點選任一專案，進入專屬學習空間 / Select a project to enter its learning space</span>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <Link key={project.number} href={project.href} className={`project-card ${project.className}`}>
              <div className="card-topline"><span className="project-number">專案 {project.number} / PROJECT {project.number}</span><span className="project-arrow" aria-hidden="true">↗</span></div>
              <div className="project-symbol" aria-hidden="true">{project.symbol}</div>
              <div className="card-copy">
                <h2>{project.title}</h2><p className="english-title">{project.english}</p>
                <p className="project-description">{project.description}<span>{project.descriptionEn}</span></p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="site-footer"><span>忠信雙語教案特色課程</span><span>Signature Bi-Lingual Courses @ FRP CHHS</span></footer>
    </main>
  );
}
