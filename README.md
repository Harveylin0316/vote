# 投票系統 (Vote System)

一個功能完整的投票系統，支援手機號註冊登入、建立投票、參與投票功能。

## 技術棧

### 前端
- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router

### 後端
- Node.js
- Express
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT 認證

## 項目結構

```
Vote/
├── frontend/                    # 前端項目（部署到 Netlify）
│   ├── src/
│   │   ├── pages/              # 頁面組件
│   │   │   ├── auth/           # 登入註冊頁面
│   │   │   ├── home/           # 首頁
│   │   │   └── polls/          # 投票相關頁面
│   │   ├── components/         # 組件
│   │   │   └── layout/         # 佈局組件
│   │   ├── utils/              # 工具函數
│   │   └── ...
│   └── package.json
├── backend/                     # 後端項目（需單獨部署）
│   ├── src/
│   │   ├── routes/             # 路由
│   │   ├── controllers/        # 控制器
│   │   ├── middleware/         # 中間件
│   │   └── utils/              # 工具函數
│   ├── prisma/
│   │   └── schema.prisma       # 數據庫模型
│   └── package.json
├── netlify.toml                 # Netlify 配置
└── README.md                    # 項目說明
```

## 功能特性

- ✅ 手機號註冊和登入（台灣10碼格式）
- ✅ 建立投票（普通用戶）
- ✅ 參與投票（需登入）
- ✅ 投票結果統計和可視化
- ✅ 防止重複投票
- ✅ 繁體中文界面

## 開發指南

### 前端開發
```bash
cd frontend
npm install
npm run dev
```

### 後端開發
```bash
cd backend
npm install
# 創建 .env 文件（參考 env.example.txt）
npm run dev
```

### 數據庫設置
1. 確保已安裝 PostgreSQL 並創建數據庫
2. 配置 `backend/.env` 中的 `DATABASE_URL`
3. 運行遷移：
```bash
cd backend
npx prisma migrate dev
npx prisma generate
```

## 環境變量

### 後端 (.env)
```
DATABASE_URL="postgresql://user:password@localhost:5432/vote_db"
JWT_SECRET="your-secret-key"
PORT=3001
CORS_ORIGIN="http://localhost:5173"
```

### 前端 (.env)
```
VITE_API_URL=http://localhost:3001/api
```

## 🚀 部署

### Netlify 部署（前端）

詳細部署指南請參考：[NETLIFY_DEPLOY.md](./NETLIFY_DEPLOY.md)

**快速部署步驟：**

1. 前往 https://app.netlify.com
2. 連接 GitHub 倉庫 `Harveylin0316/vote`
3. 配置構建設置：
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/dist`
4. 設置環境變量：
   - `VITE_API_URL` = 你的後端 API 地址
5. 點擊 "Deploy site"

### 後端部署

後端需要單獨部署到其他平台（Railway、Render、Fly.io 等）。

## 📝 API 端點

### 認證相關
- `POST /api/auth/register` - 用戶註冊
- `POST /api/auth/login` - 用戶登入
- `GET /api/auth/me` - 獲取當前用戶（需要認證）

### 投票相關
- `GET /api/polls` - 獲取所有投票
- `GET /api/polls/:id` - 獲取投票詳情
- `POST /api/polls` - 建立投票（需要認證）
- `POST /api/polls/:id/vote` - 提交投票（需要認證）

## 🔒 安全功能

- 密碼加密存儲（bcrypt）
- JWT Token 認證
- 路由保護（需要認證的接口）
- 防止重複投票
- 輸入驗證

## 📄 許可證

ISC
