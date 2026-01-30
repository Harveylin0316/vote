# Render 環境變量設置詳細指南

## 🎯 在哪裡設置環境變量？

在 Render Dashboard 中，進入你的 **Web Service**（不是數據庫服務），然後找到 **Environment** 部分。

## 📝 詳細步驟

### 步驟 1：進入 Web Service 設置

1. 登入 Render Dashboard：https://dashboard.render.com
2. 點擊你的 **Web Service**（名稱類似 `vote-backend`）
3. 進入服務詳情頁面

### 步驟 2：找到 Environment 部分

在服務詳情頁面，你會看到多個標籤：
- **Logs**（日誌）
- **Metrics**（指標）
- **Events**（事件）
- **Settings**（設置）← **點擊這裡**
- **Shell**（終端）

點擊 **Settings** 標籤。

### 步驟 3：添加環境變量

在 **Settings** 頁面，向下滾動找到 **Environment Variables**（環境變量）部分。

你會看到：
- 一個表格，顯示現有的環境變量
- **Add Environment Variable**（添加環境變量）按鈕

### 步驟 4：添加每個環境變量

點擊 **Add Environment Variable**，然後逐一添加以下變量：

#### 1. DATABASE_URL（最重要）

**Key**: `DATABASE_URL`

**Value**: 
1. 前往你的 **PostgreSQL** 服務（在 Render Dashboard）
2. 點擊進入數據庫詳情頁
3. 找到 **Connection Info** 或 **Internal Database URL**
4. 複製完整的連接字符串
5. 格式類似：`postgresql://user:password@host:port/database`

**重要**：使用 **Internal Database URL**（內部連接），不是 Public URL（公開連接）

#### 2. JWT_SECRET

**Key**: `JWT_SECRET`

**Value**: 一個隨機字符串（例如：`my-super-secret-jwt-key-2024-change-this`）

**生成隨機密鑰的方法**：
```bash
# 在終端運行
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

或使用在線工具：https://randomkeygen.com/

#### 3. CORS_ORIGIN

**Key**: `CORS_ORIGIN`

**Value**: `http://localhost:5173,https://votepractice.netlify.app`

**注意**：用逗號分隔多個域名，不要有空格

#### 4. NODE_ENV

**Key**: `NODE_ENV`

**Value**: `production`

### 步驟 5：保存並重新部署

1. 添加完所有環境變量後
2. Render 會自動保存
3. 如果服務正在運行，Render 會自動重新部署
4. 如果沒有自動部署，點擊 **Manual Deploy** → **Deploy latest commit**

## 📋 環境變量檢查清單

請確認以下變量都已設置：

- [ ] `DATABASE_URL` = PostgreSQL 內部連接字符串
- [ ] `JWT_SECRET` = 隨機密鑰字符串
- [ ] `CORS_ORIGIN` = `http://localhost:5173,https://votepractice.netlify.app`
- [ ] `NODE_ENV` = `production`

## 🔍 如何驗證環境變量已設置？

### 方法 1：查看 Settings 頁面
- 在 **Settings** → **Environment Variables** 部分
- 應該能看到所有已設置的變量

### 方法 2：查看日誌
- 部署後，在 **Logs** 標籤查看
- 如果環境變量設置正確，應用應該能正常啟動
- 如果 `DATABASE_URL` 錯誤，會看到數據庫連接錯誤

### 方法 3：使用 Shell
- 點擊 **Shell** 標籤
- 運行：`echo $DATABASE_URL`
- 應該能看到數據庫連接字符串（部分隱藏）

## ⚠️ 常見問題

### 問題 1：找不到 Environment Variables 部分
**解決方案**：
- 確認你點擊的是 **Web Service**，不是數據庫服務
- 確認你在 **Settings** 標籤頁
- 向下滾動，應該能看到

### 問題 2：DATABASE_URL 應該用哪個？
**解決方案**：
- 使用 **Internal Database URL**（內部連接）
- 格式：`postgresql://user:password@host:port/database`
- 不要使用 Public URL

### 問題 3：添加後沒有生效
**解決方案**：
- 環境變量添加後，需要重新部署
- 點擊 **Manual Deploy** → **Deploy latest commit**
- 或等待自動部署

### 問題 4：CORS 錯誤
**解決方案**：
- 確認 `CORS_ORIGIN` 包含前端域名
- 確認格式正確（用逗號分隔，無空格）
- 重新部署後端

## 📸 視覺指引

### Render Dashboard 結構：
```
Render Dashboard
├── PostgreSQL (數據庫服務)
│   └── Connection Info
│       └── Internal Database URL ← 複製這個
│
└── Web Service (應用服務)
    └── Settings
        └── Environment Variables ← 在這裡添加
            ├── DATABASE_URL
            ├── JWT_SECRET
            ├── CORS_ORIGIN
            └── NODE_ENV
```

## 💡 提示

1. **DATABASE_URL** 最重要，必須正確設置
2. **JWT_SECRET** 應該是一個長且隨機的字符串
3. 環境變量添加後會自動保存
4. 修改環境變量後需要重新部署
5. 可以在 **Logs** 中查看應用是否正常啟動

## 🎉 完成後

設置完所有環境變量並重新部署後：
1. 檢查 **Logs** 確認應用正常啟動
2. 測試 API：訪問 `https://your-app.onrender.com/api/health`
3. 應該返回：`{"status":"ok","message":"Vote API is running"}`
