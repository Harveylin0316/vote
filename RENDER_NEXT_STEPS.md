# Render 部署成功後的下一步

## 🎉 恭喜！後端已成功部署

現在需要完成以下步驟讓整個系統運作起來。

## 📋 檢查清單

### ✅ 步驟 1：運行數據庫遷移

部署完成後，需要運行數據庫遷移來創建數據表。

**方法 A：使用 Render Shell（推薦）**

1. 在 Render Dashboard，進入你的 Web Service
2. 點擊 **Shell** 標籤
3. 運行：
```bash
npx prisma migrate deploy
```

**方法 B：在本地運行**

1. 從 Render Dashboard 複製 `DATABASE_URL`（在 Web Service → Settings → Environment Variables）
2. 在本地終端運行：
```bash
cd backend
DATABASE_URL="你的_DATABASE_URL" npx prisma migrate deploy
```

### ✅ 步驟 2：獲取 API 地址

1. 在 Render Dashboard，進入你的 Web Service
2. 在服務詳情頁面頂部，你會看到一個 URL
3. 格式：`https://vote-backend.onrender.com`
4. **你的 API 地址**：`https://vote-backend.onrender.com/api`

### ✅ 步驟 3：測試 API

在瀏覽器訪問：
```
https://your-app.onrender.com/api/health
```

應該返回：
```json
{
  "status": "ok",
  "message": "Vote API is running"
}
```

### ✅ 步驟 4：更新 Netlify 環境變量

1. 前往 Netlify Dashboard：https://app.netlify.com
2. 選擇你的網站：`votepractice`
3. 進入 **Site settings** → **Environment variables**
4. 添加或更新環境變量：
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-app.onrender.com/api`（使用步驟 2 獲取的地址）
5. 點擊 **Save**
6. 觸發重新部署：
   - 進入 **Deploys** 標籤
   - 點擊 **Trigger deploy** → **Deploy site**

### ✅ 步驟 5：確認後端 CORS 設置

確認 Render 的環境變量 `CORS_ORIGIN` 包含：
```
http://localhost:5173,https://votepractice.netlify.app
```

如果沒有，請添加或更新。

## 🎯 完成後

完成以上步驟後：

1. ✅ 後端 API 正常運行
2. ✅ 數據庫表已創建
3. ✅ 前端可以連接到後端
4. ✅ 所有功能正常運作

## 🧪 測試完整功能

1. **測試註冊**
   - 訪問 https://votepractice.netlify.app
   - 點擊「註冊」
   - 輸入手機號（10 碼，09 開頭）和密碼
   - 應該能成功註冊

2. **測試登入**
   - 使用剛才註冊的帳號登入
   - 應該能成功登入

3. **測試創建投票**
   - 登入後，點擊「建立投票」
   - 創建一個測試投票
   - 應該能成功創建

4. **測試投票**
   - 查看投票列表
   - 點擊一個投票
   - 選擇選項並投票
   - 應該能成功投票並看到結果

## ⚠️ 常見問題

### 問題 1：API 返回 404
**解決方案**：
- 確認 API 地址以 `/api` 結尾
- 確認後端服務正在運行（查看 Render Logs）

### 問題 2：CORS 錯誤
**解決方案**：
- 確認 `CORS_ORIGIN` 包含前端域名
- 確認後端已重新部署

### 問題 3：數據庫錯誤
**解決方案**：
- 確認數據庫遷移已運行
- 確認 `DATABASE_URL` 正確設置

### 問題 4：免費方案休眠
**解決方案**：
- Render 免費方案在 15 分鐘無活動後會休眠
- 首次訪問需要等待約 30 秒喚醒
- 這是正常的，不影響功能

## 🎉 恭喜！

你的投票系統已經完全部署並運作了！

- ✅ 前端：https://votepractice.netlify.app
- ✅ 後端：https://your-app.onrender.com/api
- ✅ 數據庫：PostgreSQL（Render）

享受你的投票系統吧！🎊
