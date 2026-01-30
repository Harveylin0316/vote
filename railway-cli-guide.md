# 使用 Railway CLI 部署（備選方案）

如果網頁界面無法連接 GitHub，可以使用命令行部署。

## 安裝 Railway CLI

```bash
npm install -g @railway/cli
```

## 登入 Railway

```bash
railway login
```

這會打開瀏覽器讓你登入 Railway 帳號。

## 初始化項目

```bash
cd backend
railway init
```

選擇：
- **Create a new project**（創建新項目）
- 輸入項目名稱：`vote-backend`

## 設置環境變量

```bash
# 添加 JWT Secret
railway variables set JWT_SECRET="your-secret-key-here"

# 設置 CORS
railway variables set CORS_ORIGIN="http://localhost:5173,https://votepractice.netlify.app"

# 設置環境
railway variables set NODE_ENV="production"
```

## 添加 PostgreSQL 數據庫

```bash
railway add postgres
```

這會自動創建數據庫並設置 `DATABASE_URL` 環境變量。

## 運行數據庫遷移

```bash
railway run npx prisma migrate deploy
```

## 部署

```bash
railway up
```

## 獲取部署 URL

```bash
railway domain
```

這會顯示你的 API 地址，格式類似：`https://your-app.up.railway.app`

你的 API 地址就是：`https://your-app.up.railway.app/api`
