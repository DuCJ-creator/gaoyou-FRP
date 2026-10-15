# 忠信雙語教案特色課程

Signature Bi-Lingual Courses @ FRP CHHS

網站只有一個首頁，以及五個獨立專案頁面。

```text
app/
├── page.tsx                       # 五個專案的首頁 index
└── projects/
    ├── ivocab/
    │   ├── page.tsx               # 專案 index
    │   └── data.json              # 專案資料
    ├── stories/
    │   ├── page.tsx
    │   └── data.json
    ├── world/
    │   ├── page.tsx
    │   └── data.json
    ├── science/
    │   ├── page.tsx
    │   └── data.json
    └── ai-writing/
        ├── page.tsx
        └── data.json
```

## 更新專案內容

直接修改該專案資料夾裡的 `data.json`：

- `introZh`、`introEn`：中英文頁面介紹
- `sections`：中英文文字段落
- `youtube`：YouTube 連結，可留空
- `links`：外部連結，可留空
- `galleries`：圖片輪播清單；每增加一筆就會增加一組 Carousel
- `embeds`：iframe 外部頁面清單；每增加一筆就會增加一個嵌入區塊
- `logo.src`：專案 Logo 的圖片網址或網站內路徑；留空時顯示 Logo 預留區
- `embed.url`：要用 iframe 嵌入的外部網址；留空時顯示嵌入預留區

Logo 若放在網站的 `public/logos` 資料夾，可填入：

```json
"logo": {
  "src": "/logos/ivocab.png",
  "altZh": "愛單字專案標誌",
  "altEn": "iVocab project logo"
}
```

多組圖片輪播範例：

```json
"galleries": [
  {
    "titleZh": "課堂活動",
    "titleEn": "Class Activities",
    "folder": "images/ivocab/class"
  },
  {
    "titleZh": "學生作品",
    "titleEn": "Student Work",
    "folder": "images/ivocab/work"
  }
]
```

多個外部頁面嵌入範例：

```json
"embeds": [
  {
    "titleZh": "愛單字線上學習",
    "titleEn": "iVocab Online Learning",
    "url": "https://example.com"
  },
  {
    "titleZh": "練習平台",
    "titleEn": "Practice Platform",
    "url": "https://example.org"
  }
]
```

部分網站會禁止被 iframe 嵌入；遇到這種情況，頁面下方仍會提供另開視窗的連結。

## 圖片自動輪播

在 `site.config.ts` 填入公開 GitHub repository 的資料：

```ts
export const githubImages = {
  owner: '你的 GitHub 帳號',
  repo: 'repository 名稱',
  branch: 'main',
}
```

然後把圖片放進以下資料夾：

```text
images/ivocab/
images/stories/
images/world/
images/science/
images/ai-writing/
```

頁面開啟時會從 GitHub 自動讀取資料夾內的 JPG、PNG、WebP、GIF 或 AVIF，並每五秒輪播。新增或刪除圖片不需要修改頁面程式。

> 這個免登入的方式適用於公開 repository。私人 repository 不應把存取權杖放在瀏覽器程式中。

## 本機預覽

```bash
npm install
npm run dev
```

## 發布至 GitHub Pages

本專案會由 GitHub Actions 自動把 `page.tsx` 建置成 GitHub Pages 可用的 HTML；不需要手動改寫成 `.html`。

1. 把更新推送至 `main` 分支。
2. 在 GitHub repository 打開 **Settings → Pages**。
3. 將 **Build and deployment → Source** 設為 **GitHub Actions**。
4. 等待 **Actions** 頁面的 `Deploy GitHub Pages` 顯示成功。

網站網址：<https://ducj-creator.github.io/gaoyou-FRP/>

如需在本機檢查 GitHub Pages 版本：

```bash
GITHUB_PAGES=true npm run build:pages
```

建置完成的 HTML 會出現在 `out/`，這個資料夾不需要提交至 GitHub。

## Cloudflare（下一階段）

原本的 Cloudflare 建置仍然保留：

```bash
npm run build
```

因此之後轉至 Cloudflare 時，不需要重做網站或改寫頁面。
