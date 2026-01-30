# 後端部署指南

## 🎯 目標
將後端 API 部署到雲端平台，獲取公開的 API 地址。

## 📋 推薦平台

### 選項 1：Railway（推薦，最簡單）⭐
- ✅ 免費額度充足
- ✅ 自動部署
- ✅ 內建 PostgreSQL 數據庫
- ✅ 簡單易用

### 選項 2：Render
- ✅ 免費方案
- ✅ 自動部署
- ⚠️ 需要單獨設置數據庫

### 選項 3：Fly.io
- ✅ 免費方案
- ⚠️ 設置較複雜

---

## 🚀 方法一：使用 Railway 部署（推薦）

### 步驟 1：註冊 Railway
1. 前往 https://railway.app
2. 使用 GitHub 帳號登入
3. 點擊 **New Project**

### 步驟 2：連接 GitHub 倉庫
1. 選擇 **Deploy from GitHub repo**
2. 選擇你的倉庫：`Harveylin0316/vote`
3. Railway 會自動檢測到項目

### 步驟 3：設置服務
1. Railway 會自動創建一個服務
2. 點擊服務進入設置
3. 設置 **Root Directory** 為 `backend`

### 步驟 4：添加 PostgreSQL 數據庫
1. 在項目中點擊 **+ New**
2. 選擇 **Database** → **Add PostgreSQL**
3. Railway 會自動創建數據庫並設置 `DATABASE_URL` 環境變量

### 步驟 5：設置環境變量
在服務的 **Variables** 標籤中添加：

```
DATABASE_URL=自動設置（Railway 會自動添加）
JWT_SECRET=你的隨機密鑰（例如：my-super-secret-jwt-key-2024）
PORT=自動設置（Railway 會自動設置）
CORS_ORIGIN=http://localhost:5173,https://votepractice.netlify.app
NODE_ENV=production
```

### 步驟 6：設置構建命令
在服務的 **Settings** → **Deploy** 中：
- **Build Command**: `npm install && npm run build && npx prisma generate`
- **Start Command**: `npm start`

### 步驟 7：運行數據庫遷移
1. 部署完成後，點擊服務的 **Deploy Logs**
2. 在 **Variables** 中找到 `DATABASE_URL`
3. 複製 `DATABASE_URL` 的值
4. 在本地終端運行：
```bash
cd backend
DATABASE_URL="你的_DATABASE_URL" npx prisma migrate deploy
```

或者使用 Railway CLI：
```bash
railway run npx prisma migrate deploy
```

### 步驟 8：獲取 API 地址
1. 部署完成後，Railway 會自動生成一個域名
2. 在服務的 **Settings** → **Networking** 中可以看到
3. 格式類似：`https://your-app-name.up.railway.app`
4. **你的 API 地址就是**：`https://your-app-name.up.railway.app/api`

### 步驟 9：更新 Netlify 環境變量
1. 前往 Netlify Dashboard
2. 進入你的網站設置
3. 添加環境變量：
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-app-name.up.railway.app/api`（使用步驟 8 獲取的地址）

---

## 🚀 方法二：使用 Render 部署

### 步驟 1：註冊 Render
1. 前往 https://render.com
2. 使用 GitHub 帳號登入

### 步驟 2：創建 Web Service
1. 點擊 **New** → **Web Service**
2. 連接你的 GitHub 倉庫
3. 設置：
   - **Name**: `vote-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build && npx prisma generate`
   - **Start Command**: `npm start`

### 步驟 3：添加 PostgreSQL 數據庫
1. 點擊 **New** → **PostgreSQL**
2. 創建數據庫
3. 記下數據庫的連接信息

### 步驟 4：設置環境變量
在 Web Service 的 **Environment** 中添加：
```
DATABASE_URL=你的數據庫連接字符串
JWT_SECRET=你的隨機密鑰
CORS_ORIGIN=http://localhost:5173,https://votepractice.netlify.app
NODE_ENV=production
```

### 步驟 5：運行數據庫遷移
部署完成後，使用 Render Shell 或本地運行：
```bash
DATABASE_URL="你的_DATABASE_URL" npx prisma migrate deploy
```

### 步驟 6：獲取 API 地址
1. Render 會自動生成域名
2. 格式：`https://vote-backend.onrender.com`
3. **你的 API 地址**：`https://vote-backend.onrender.com/api`

---

## 🔍 如何測試 API 是否正常

部署完成後，在瀏覽器訪問：
```
https://your-api-domain.com/api/health
```

應該看到：
```json
{
  "status": "ok",
  "message": "Vote API is running"
}
```

---

## ⚠️ 常見問題

### 問題 1：構建失敗
**解決方案**：
- 檢查 `package.json` 中的構建腳本
- 確保所有依賴都已安裝
- 檢查 Railway/Render 的構建日誌

### 問題 2：數據庫連接失敗
**解決方案**：
- 確認 `DATABASE_URL` 環境變量已正確設置
- 確認數據庫已創建並運行
- 檢查數據庫遷移是否已運行

### 問題 3：CORS 錯誤
**解決方案**：
- 確認 `CORS_ORIGIN` 包含你的前端域名
- 格式：`http://localhost:5173,https://votepractice.netlify.app`

### 問題 4：找不到 API 端點
**解決方案**：
- 確認 API 地址以 `/api` 結尾
- 例如：`https://your-api.com/api`（正確）
- 例如：`https://your-api.com`（錯誤）

---

## 📝 部署後檢查清單

- [ ] 後端已成功部署
- [ ] 數據庫已創建並連接
- [ ] 數據庫遷移已運行
- [ ] 環境變量已設置
- [ ] `/api/health` 端點返回正常
- [ ] 獲取了 API 地址（格式：`https://xxx.com/api`）
- [ ] 在 Netlify 設置了 `VITE_API_URL` 環境變量
- [ ] 前端可以成功連接到後端

---

## 🎉 完成後

完成部署後，你的後端 API 地址格式會是：
- Railway: `https://your-app-name.up.railway.app/api`
- Render: `https://your-app-name.onrender.com/api`

將這個地址設置到 Netlify 的 `VITE_API_URL` 環境變量中，前端就能正常運作了！
