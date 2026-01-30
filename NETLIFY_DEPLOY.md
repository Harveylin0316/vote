# Netlify 部署指南

## 📋 部署前準備

### 1. 後端 API 部署

**重要**：前端需要連接到後端 API。你需要先部署後端到其他平台（如 Railway、Render、Heroku 等）。

推薦平台：
- **Railway** (https://railway.app) - 簡單易用，支持 PostgreSQL
- **Render** (https://render.com) - 免費方案可用
- **Fly.io** (https://fly.io) - 性能好

### 2. 獲取後端 API URL

部署後端後，記下你的 API URL，例如：
- `https://your-api.railway.app/api`
- `https://your-api.onrender.com/api`

## 🚀 Netlify 部署步驟

### 方式一：通過 GitHub 自動部署（推薦）

1. **連接 GitHub 倉庫**
   - 前往 https://app.netlify.com
   - 點擊 "Add new site" → "Import an existing project"
   - 選擇 "GitHub" 並授權
   - 選擇 `Harveylin0316/vote` 倉庫

2. **配置構建設置**
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`

3. **設置環境變量**
   在 Netlify 的 Site settings → Environment variables 中添加：
   ```
   VITE_API_URL = https://your-backend-api-url.com/api
   ```
   ⚠️ **重要**：將 `your-backend-api-url.com` 替換為你實際的後端 API 地址

4. **部署**
   - 點擊 "Deploy site"
   - Netlify 會自動從 GitHub 拉取代碼並構建

### 方式二：通過 Netlify CLI

1. **安裝 Netlify CLI**
```bash
npm install -g netlify-cli
```

2. **登錄 Netlify**
```bash
netlify login
```

3. **初始化並部署**
```bash
cd frontend
netlify init
# 選擇 "Create & configure a new site"
# 按照提示完成設置

# 設置環境變量
netlify env:set VITE_API_URL https://your-backend-api-url.com/api

# 部署
netlify deploy --prod
```

## ⚙️ 環境變量配置

在 Netlify Dashboard 的 **Site settings → Environment variables** 中設置：

| 變量名 | 值 | 說明 |
|--------|-----|------|
| `VITE_API_URL` | `https://your-api.com/api` | 後端 API 地址（必填） |

## 📁 項目結構

```
Vote/
├── frontend/          # 前端項目（部署到 Netlify）
│   ├── dist/         # 構建輸出目錄
│   ├── public/       # 靜態資源
│   └── src/          # 源代碼
├── backend/          # 後端項目（需單獨部署）
└── netlify.toml      # Netlify 配置文件
```

## 🔧 構建優化

項目已優化：
- ✅ 代碼分割（vendor、axios 分離）
- ✅ 生產環境壓縮
- ✅ SPA 路由重定向配置
- ✅ 構建輸出優化

## 🌐 部署後

部署成功後，你會獲得一個 Netlify URL，例如：
- `https://your-site.netlify.app`

### 更新後端 CORS 設置

記得在後端的 `.env` 文件中更新 `CORS_ORIGIN`：
```
CORS_ORIGIN=https://your-site.netlify.app
```

## 📝 注意事項

1. **後端必須先部署**：前端需要連接到後端 API
2. **環境變量**：確保在 Netlify 中設置了 `VITE_API_URL`
3. **CORS**：確保後端允許 Netlify 域名的請求
4. **數據庫**：確保後端數據庫已配置並運行

## 🔄 自動部署

連接 GitHub 後，每次推送到 `main` 分支，Netlify 會自動：
1. 拉取最新代碼
2. 運行構建命令
3. 部署新版本

## 🐛 常見問題

### 構建失敗
- 檢查 Node.js 版本（Netlify 使用 20）
- 檢查構建命令是否正確
- 查看 Netlify 構建日誌

### API 連接失敗
- 確認 `VITE_API_URL` 環境變量已設置
- 確認後端 API 已部署並運行
- 檢查後端 CORS 設置

### 路由 404
- 確認 `_redirects` 文件已創建
- 確認 `netlify.toml` 中的重定向規則
