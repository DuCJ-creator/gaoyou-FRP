# 五徑學堂

五個學習專案的入口網站，包含：

1. 指尖上的「愛單字」
2. 漫遊故事林
3. 縱覽人間世
4. 共舞科學園
5. 筆尖下的 AI 魔法

## 更新頁面內容

每個專案的內容都放在 `public/content` 對應的 JSON 檔案中。可以加入以下四種內容：

```json
{
  "updatedAt": "2026-10-15",
  "items": [
    { "type": "text", "title": "文章標題", "body": "文章內容" },
    { "type": "image", "title": "圖片標題", "url": "/images/example.jpg", "caption": "圖片說明" },
    { "type": "youtube", "title": "影片標題", "url": "https://www.youtube.com/embed/VIDEO_ID" },
    { "type": "link", "title": "延伸閱讀", "body": "連結簡介", "url": "https://example.com" }
  ]
}
```

若希望網站每次開啟都直接讀取 GitHub 最新檔案，建立 repository 後，請在 `site.config.ts` 的 `githubContentBaseUrl` 填入：

```text
https://raw.githubusercontent.com/你的帳號/你的repo/main/public/content
```

## 本機使用

```bash
npm install
npm run dev
```

發佈前請設定 `NEXT_PUBLIC_SITE_URL` 為正式網站網址，讓分享預覽圖片使用正確網址。
