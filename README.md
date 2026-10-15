# 五徑學堂

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

- `intro`：頁面介紹
- `sections`：文字段落
- `youtube`：YouTube 連結，可留空
- `links`：外部連結，可留空
- `imageFolder`：該專案在 GitHub repository 裡的圖片資料夾

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
