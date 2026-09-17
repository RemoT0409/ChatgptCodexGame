# NOVA Cloud Gaming

NOVA 是一個雲端遊戲平台的互動式前端原型，提供遊戲探索、搜尋、分類、收藏及模擬串流啟動體驗。

> [!IMPORTANT]
> GitHub Pages 只能託管靜態網站，不能執行 GPU 遊戲主機、Node.js 後端或真正的 WebRTC 遊戲串流。本專案部署到 Pages 後會展示完整前端；若要真的遊玩 Steam／MMO 遊戲，仍需另外建置具有合法遊戲授權的雲端 GPU、登入服務與串流後端。

## 本機預覽

需要 Node.js 18 或更新版本，不需要安裝第三方套件：

```bash
npm run dev
```

接著開啟 <http://localhost:4173>。

## 部署至 GitHub Pages

專案已包含 [GitHub Actions 部署工作流程](.github/workflows/deploy-pages.yml)。每次推送到 `main` 或 `work` 分支時，Actions 都會建置 `dist/` 並發佈網站。

### 1. 將程式碼推送到 GitHub

如果尚未設定遠端儲存庫：

```bash
git remote add origin https://github.com/YOUR_ACCOUNT/YOUR_REPOSITORY.git
git push -u origin work
```

請將 `YOUR_ACCOUNT` 與 `YOUR_REPOSITORY` 換成自己的 GitHub 帳號和儲存庫名稱。如果你使用 `main` 分支，也可以執行 `git push -u origin main`。

### 2. 啟用 GitHub Actions 作為 Pages 來源

1. 開啟 GitHub 儲存庫。
2. 前往 **Settings → Pages**。
3. 在 **Build and deployment** 的 **Source** 選擇 **GitHub Actions**。
4. 前往 **Actions** 頁籤，等待 **Deploy NOVA to GitHub Pages** 完成。

### 3. 開啟網站

部署成功後，網站網址通常是：

```text
https://YOUR_ACCOUNT.github.io/YOUR_REPOSITORY/
```

也可以在 **Settings → Pages** 或 Actions 執行結果中的 `github-pages` environment 找到實際網址。工作流程亦支援從 Actions 頁面按 **Run workflow** 手動重新部署。

## 建置指令

```bash
npm run build
```

建置結果會輸出至 `dist/`。入口檔使用相對資源路徑，因此可以正常運作於 `username.github.io/repository/` 這類 GitHub Pages 專案子路徑。

## 自訂網域（選用）

在 **Settings → Pages → Custom domain** 輸入網域，並依 GitHub 顯示的提示設定 DNS。建議完成驗證後開啟 **Enforce HTTPS**。若要讓每次部署保留網域設定，可在 `public` 輸出流程中加入 `CNAME`；目前專案尚未預設任何網域。

## 常見問題

### Actions 沒有自動執行

- 確認推送的是 `main` 或 `work` 分支。
- 到 **Actions** 頁籤確認工作流程已啟用。
- 確認 **Settings → Pages → Source** 已選擇 **GitHub Actions**。

### 頁面能開啟，但圖片沒有顯示

遊戲示意圖目前來自 Unsplash，瀏覽器必須能連線至外部圖片服務。正式產品建議將取得授權的圖片放入儲存庫並由 Pages 一同發布。

### 頁面完全空白

先到 **Actions** 確認最新的 Pages 部署已成功，再按 `Ctrl + Shift + R` 強制重新整理。建置流程會先檢查前端 JavaScript 語法，避免語法錯誤的版本再次被部署；入口頁也會以相對路徑載入 JavaScript 與 CSS，因此可在 GitHub Pages 的專案子路徑運作。

### 可以直接在 GitHub Pages 執行真正的雲端遊戲嗎？

不行。Pages 僅負責前端介面。正式雲端遊戲服務至少還需要：

- GPU 遊戲執行節點與遊戲授權；
- WebRTC 影音串流與鍵盤、滑鼠、手把輸入回傳；
- 使用者登入、遊戲庫授權驗證及存檔同步；
- 配對、排隊、計費、安全防護及區域節點調度。
