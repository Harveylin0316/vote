# Railway 部署最終解決方案

## 🎯 問題
Railway 無法正確檢測 `backend` 目錄，導致構建失敗。

## ✅ 解決方案：使用 Railway CLI（最可靠）

網頁界面可能有問題，建議使用命令行工具。

### 步驟 1：安裝 Railway CLI

```bash
npm install -g @railway/cli
```

### 步驟 2：登入 Railway

```bash
railway login
```

這會打開瀏覽器讓你登入。

### 步驟 3：進入 backend 目錄並初始化

```bash
cd backend
railway init
```

**重要**：必須在 `backend` 目錄下運行 `railway init`，這樣 Railway 會自動使用當前目錄作為根目錄。

### 步驟 4：選擇或創建項目

- 如果已有項目，選擇它
- 如果沒有，創建新項目

### 步驟 5：設置環境變量

```bash
# JWT Secret
railway variables set JWT_SECRET="your-random-secret-key-here"

# CORS Origin
railway variables set CORS_ORIGIN="http://localhost:5173,https://votepractice.netlify.app"

# Node Environment
railway variables set NODE_ENV="production"
```

### 步驟 6：添加 PostgreSQL 數據庫

```bash
railway add postgres
```

這會自動創建數據庫並設置 `DATABASE_URL` 環境變量。

### 步驟 7：運行數據庫遷移

```bash
railway run npx prisma migrate deploy
```

### 步驟 8：部署

```bash
railway up
```

### 步驟 9：獲取 API 地址

```bash
railway domain
```

或查看 Railway Dashboard，在服務的 **Networking** 部分可以看到域名。

你的 API 地址格式：`https://your-app.up.railway.app/api`

## 🔄 替代方案：使用 Render（如果 Railway 持續有問題）

如果 Railway CLI 還是有問題，可以嘗試 Render：

1. 前往 https://render.com
2. 使用 GitHub 登入
3. 點擊 **New** → **Web Service**
4. 連接你的 GitHub 倉庫
5. 設置：
   - **Root Directory**: `backend`
   - **Build Command**: `npm install --legacy-peer-deps && npm run build && npx prisma generate`
   - **Start Command**: `npm start`
6. 添加 PostgreSQL 數據庫
7. 設置環境變量

## 📝 為什麼 CLI 更可靠？

1. **自動檢測目錄**：在 `backend` 目錄下運行，Railway 會自動使用該目錄
2. **不需要配置文件**：不需要 `railway.toml` 或 `nixpacks.toml`
3. **更直接**：直接控制部署過程
4. **錯誤更清晰**：可以看到詳細的錯誤信息

## ⚠️ 重要提示

- 確保在 `backend` 目錄下運行所有 Railway CLI 命令
- 數據庫遷移必須在部署後運行
- 記住你的 API 地址，需要在 Netlify 設置 `VITE_API_URL`

## 🎉 完成後

部署成功後：
1. 測試 API：訪問 `https://your-api.up.railway.app/api/health`
2. 在 Netlify 設置 `VITE_API_URL` 環境變量
3. 重新部署前端
