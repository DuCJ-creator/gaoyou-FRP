export type Project = {
  slug: string;
  number: string;
  eyebrow: string;
  title: string;
  english: string;
  intro: string;
  quote: string;
  symbol: string;
  theme: string;
  sectionTitle: string;
  sectionNote: string;
};

export const projects: Project[] = [
  {
    slug: 'ivocab', number: '01', eyebrow: 'Words become worlds',
    title: '指尖上的「愛單字」', english: 'iVocab Online',
    intro: '收藏一個字，也收藏一種看世界的方法。這裡將彙整單字學習、語境例句、發音影片與延伸資源。',
    quote: 'Touch a word. Open a world.', symbol: 'Aa', theme: 'theme-vocab',
    sectionTitle: '今日字景', sectionNote: 'VOCABULARY · CONTEXT · PRACTICE',
  },
  {
    slug: 'stories', number: '02', eyebrow: 'Follow the narrative trail',
    title: '漫遊故事林', english: 'To Wander in Stories',
    intro: '每篇故事都是林間岔路。閱讀、聆聽、觀看，再沿著線索走向自己的理解與想像。',
    quote: 'Every story leaves a trail.', symbol: '⌁', theme: 'theme-stories',
    sectionTitle: '林間新章', sectionNote: 'STORIES · VOICES · IMAGINATION',
  },
  {
    slug: 'world', number: '03', eyebrow: 'Look closer, travel further',
    title: '縱覽人間世', english: 'To Explore the World',
    intro: '從一張地圖、一幅影像或一段日常出發，理解不同地方的人如何生活、思考與連結。',
    quote: 'The world begins where curiosity leads.', symbol: '◎', theme: 'theme-world',
    sectionTitle: '世界切片', sectionNote: 'PLACES · PEOPLE · CULTURES',
  },
  {
    slug: 'science', number: '04', eyebrow: 'Ask, observe, discover',
    title: '共舞科學園', english: 'To Dance with Science',
    intro: '讓問題領舞，讓證據接續節拍。從現象、實驗到解釋，在科學園裡練習好奇。',
    quote: 'Curiosity is where discovery moves.', symbol: '✦', theme: 'theme-science',
    sectionTitle: '探索現場', sectionNote: 'QUESTION · EVIDENCE · DISCOVERY',
  },
  {
    slug: 'ai-writing', number: '05', eyebrow: 'Human ideas, amplified',
    title: '筆尖下的 AI 魔法', english: 'To Write with AI',
    intro: '把 AI 當作思考夥伴，從靈感、草稿到修訂，留下屬於創作者自己的聲音與選擇。',
    quote: 'The magic still begins with your idea.', symbol: '✎', theme: 'theme-ai',
    sectionTitle: '共創手記', sectionNote: 'IDEA · DIALOGUE · CREATION',
  },
];

export const projectBySlug = Object.fromEntries(projects.map((project) => [project.slug, project]));
