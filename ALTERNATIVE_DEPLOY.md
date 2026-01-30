# 後端部署替代方案

## 🎯 推薦順序

1. **Render** ⭐⭐⭐⭐⭐（最推薦）
2. **Fly.io** ⭐⭐⭐⭐
3. **Vercel** ⭐⭐⭐（適合無服務器函數）
4. **Heroku** ⭐⭐⭐（需要信用卡）

---

## 1. Render（最推薦）⭐

### 優點
- ✅ 免費方案充足
- ✅ 自動部署
- ✅ 內建 PostgreSQL
- ✅ 設置簡單
- ✅ 穩定可靠

### 缺點
- ⚠️ 免費方案會休眠（15 分鐘無活動）

### 詳細指南
請參考：`RENDER_DEPLOY.md`

---

## 2. Fly.io

### 優點
- ✅ 免費方案
- ✅ 全球 CDN
- ✅ 不會休眠
- ✅ 性能好

### 缺點
- ⚠️ 設置較複雜
- ⚠️ 需要安裝 CLI

### 快速開始

```bash
# 1. 安裝 Fly CLI
curl -L https://fly.io/install.sh | sh

# 2. 登入
fly auth login

# 3. 進入 backend 目錄
cd backend

# 4. 初始化
fly launch

# 5. 設置環境變量
fly secrets set DATABASE_URL="your-database-url"
fly secrets set JWT_SECRET="your-secret"
fly secrets set CORS_ORIGIN="http://localhost:5173,https://votepractice.netlify.app"

# 6. 部署
fly deploy
```

### 需要創建的文件

**`backend/fly.toml`**:
```toml
app = "your-app-name"
primary_region = "sin"  # 新加坡

[build]

[env]
  PORT = "8080"

[[services]]
  internal_port = 8080
  protocol = "tcp"

  [[services.ports]]
    port = 80
    handlers = ["http"]
    force_https = true

  [[services.ports]]
    port = 443
    handlers = ["tls", "http"]
```

---

## 3. Vercel

### 優點
- ✅ 免費方案
- ✅ 自動部署
- ✅ 全球 CDN
- ✅ 設置簡單

### 缺點
- ⚠️ 更適合無服務器函數
- ⚠️ 需要適配 Express 應用

### 快速開始

1. 前往 https://vercel.com
2. 使用 GitHub 登入
3. 導入項目
4. 設置：
   - **Root Directory**: `backend`
   - **Framework Preset**: `Other`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install --legacy-peer-deps`

### 需要創建的文件

**`backend/vercel.json`**:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "dist/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "dist/index.js"
    }
  ]
}
```

---

## 4. Heroku

### 優點
- ✅ 穩定可靠
- ✅ 生態系統完善

### 缺點
- ⚠️ 免費方案已取消
- ⚠️ 需要信用卡
- ⚠️ 價格較貴

### 快速開始

```bash
# 1. 安裝 Heroku CLI
# macOS
brew tap heroku/brew && brew install heroku

# 2. 登入
heroku login

# 3. 進入 backend 目錄
cd backend

# 4. 創建應用
heroku create your-app-name

# 5. 添加 PostgreSQL
heroku addons:create heroku-postgresql:mini

# 6. 設置環境變量
heroku config:set JWT_SECRET="your-secret"
heroku config:set CORS_ORIGIN="http://localhost:5173,https://votepractice.netlify.app"
heroku config:set NODE_ENV="production"

# 7. 部署
git push heroku main

# 8. 運行遷移
heroku run npx prisma migrate deploy
```

---

## 🎯 我的推薦

### 首選：Render
- 最簡單
- 免費方案充足
- 設置清晰
- 穩定可靠

### 次選：Fly.io
- 如果 Render 有問題
- 性能更好
- 不會休眠

### 不推薦：Vercel
- 需要較多適配
- 更適合前端和無服務器函數

### 不推薦：Heroku
- 免費方案已取消
- 需要付費

---

## 📋 通用檢查清單

無論使用哪個平台：

- [ ] Root Directory 設置為 `backend`
- [ ] Build Command 包含 `prisma generate`
- [ ] 數據庫已創建並連接
- [ ] 環境變量已設置
- [ ] 數據庫遷移已運行
- [ ] API 地址已獲取
- [ ] Netlify 環境變量已更新

---

## 🆘 需要幫助？

告訴我你選擇的平台，我可以提供更詳細的指導！
