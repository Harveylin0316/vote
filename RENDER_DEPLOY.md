# Render 部署指南（推薦）⭐

## 🎯 為什麼選擇 Render？

- ✅ **免費方案**：免費 PostgreSQL 數據庫和 Web 服務
- ✅ **自動部署**：連接 GitHub 自動部署
- ✅ **設置簡單**：界面清晰，容易操作
- ✅ **穩定可靠**：比 Railway 更穩定
- ✅ **支持 Node.js**：完美支持 TypeScript + Express

## 🚀 快速部署步驟

### 步驟 1：註冊 Render

1. 前往 https://render.com
2. 點擊 **Get Started for Free**
3. 使用 **GitHub 帳號**登入（推薦）

### 步驟 2：創建 PostgreSQL 數據庫

1. 在 Render Dashboard，點擊 **New +**
2. 選擇 **PostgreSQL**
3. 設置：
   - **Name**: `vote-db`
   - **Database**: `vote_db`
   - **User**: `vote_user`
   - **Region**: 選擇離你最近的（如 `Singapore`）
   - **PostgreSQL Version**: `16`（最新）
   - **Plan**: `Free`（免費方案）
4. 點擊 **Create Database**
5. **重要**：等待數據庫創建完成（約 1-2 分鐘）
6. 創建完成後，點擊數據庫進入詳情頁
7. 找到 **Internal Database URL**，複製它（格式：`postgresql://user:password@host:port/database`）

### 步驟 3：創建 Web Service

1. 在 Render Dashboard，點擊 **New +**
2. 選擇 **Web Service**
3. 連接 GitHub：
   - 點擊 **Connect GitHub**
   - 授權 Render 訪問你的倉庫
   - 選擇倉庫：`Harveylin0316/vote`
4. 設置服務：
   - **Name**: `vote-backend`
   - **Region**: 選擇與數據庫相同的區域
   - **Branch**: `main`
   - **Root Directory**: `backend` ⚠️ **重要！**
   - **Runtime**: `Node`
   - **Build Command**: `npm install --legacy-peer-deps && npm run build && npx prisma generate`
   - **Start Command**: `npm start`
   - **Plan**: `Free`（免費方案）

### 步驟 4：設置環境變量

在 Web Service 設置頁面的 **Environment** 部分，添加：

```
DATABASE_URL=你的數據庫連接字符串（從步驟 2 複製）
JWT_SECRET=你的隨機密鑰（例如：my-super-secret-jwt-key-2024）
CORS_ORIGIN=http://localhost:5173,https://votepractice.netlify.app
NODE_ENV=production
PORT=10000
```

**注意**：
- `DATABASE_URL`：使用步驟 2 複製的 **Internal Database URL**
- `PORT`：Render 免費方案使用端口 `10000`，但實際上 Render 會自動設置，可以不填

### 步驟 5：部署

1. 點擊 **Create Web Service**
2. Render 會自動開始構建和部署
3. 等待部署完成（約 3-5 分鐘）
4. 查看構建日誌確認是否成功

### 步驟 6：運行數據庫遷移

部署完成後，需要運行數據庫遷移：

**方法 A：使用 Render Shell**
1. 在 Web Service 頁面，點擊 **Shell** 標籤
2. 運行：
```bash
npx prisma migrate deploy
```

**方法 B：在本地運行**
1. 從 Render Dashboard 複製 `DATABASE_URL`
2. 在本地終端運行：
```bash
cd backend
DATABASE_URL="你的_DATABASE_URL" npx prisma migrate deploy
```

### 步驟 7：獲取 API 地址

1. 部署完成後，Render 會自動生成一個域名
2. 格式：`https://vote-backend.onrender.com`
3. **你的 API 地址**：`https://vote-backend.onrender.com/api`

### 步驟 8：更新 Netlify 環境變量

1. 前往 Netlify Dashboard
2. 進入你的網站設置
3. **Environment variables** → **Add variable**
4. 添加：
   - **Key**: `VITE_API_URL`
   - **Value**: `https://vote-backend.onrender.com/api`
5. 保存並重新部署前端

## 📝 重要設置檢查清單

- [ ] Root Directory 設置為 `backend`
- [ ] Build Command 包含 `prisma generate`
- [ ] `DATABASE_URL` 已設置（使用 Internal Database URL）
- [ ] `JWT_SECRET` 已設置
- [ ] `CORS_ORIGIN` 包含 Netlify 域名
- [ ] 數據庫遷移已運行
- [ ] API 地址已獲取並設置到 Netlify

## ⚠️ 常見問題

### 問題 1：構建失敗
**解決方案**：
- 確認 Root Directory 是 `backend`
- 確認 Build Command 正確
- 查看構建日誌找出具體錯誤

### 問題 2：數據庫連接失敗
**解決方案**：
- 確認使用 **Internal Database URL**（不是 Public URL）
- 確認數據庫服務已啟動
- 確認 `DATABASE_URL` 格式正確

### 問題 3：CORS 錯誤
**解決方案**：
- 確認 `CORS_ORIGIN` 包含前端域名
- 確認後端已重新部署

### 問題 4：免費方案休眠
**解決方案**：
- Render 免費方案在 15 分鐘無活動後會休眠
- 首次訪問需要等待約 30 秒喚醒
- 這是正常的，不影響功能

## 🎉 完成後

部署成功後：
1. 測試 API：訪問 `https://vote-backend.onrender.com/api/health`
2. 應該返回：`{"status":"ok","message":"Vote API is running"}`
3. 在 Netlify 設置 `VITE_API_URL`
4. 重新部署前端
5. 測試完整功能

## 💡 提示

- Render 免費方案完全夠用，除非流量很大
- 數據庫和 Web Service 應該在同一區域以減少延遲
- 建議定期備份數據庫（Render 提供自動備份）
