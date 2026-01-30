# 在本地運行數據庫遷移

## 🎯 問題

Render 免費方案可能無法使用 Shell，需要在本地運行數據庫遷移。

## ✅ 解決方案：在本地運行遷移

### 步驟 1：獲取 DATABASE_URL

1. **進入 Render Dashboard**
   - 前往 https://dashboard.render.com
   - 登入你的帳號

2. **進入 Web Service**
   - 點擊你的 Web Service（例如 `vote-backend`）

3. **進入 Settings**
   - 點擊 **Settings** 標籤

4. **找到 Environment Variables**
   - 向下滾動找到 **Environment Variables** 部分
   - 找到 `DATABASE_URL`
   - 點擊 **Reveal** 或眼睛圖標顯示值
   - **複製完整的連接字符串**

   格式類似：
   ```
   postgresql://user:password@host:port/database
   ```

### 步驟 2：在本地運行遷移

1. **打開終端**
   - 確保你在項目目錄中

2. **進入 backend 目錄**
   ```bash
   cd backend
   ```

3. **運行遷移命令**
   ```bash
   DATABASE_URL="你的_DATABASE_URL" npx prisma migrate deploy
   ```

   **重要**：將 `你的_DATABASE_URL` 替換為步驟 1 複製的完整連接字符串

   完整命令範例：
   ```bash
   DATABASE_URL="postgresql://user:password@dpg-xxxxx-a.singapore-postgres.render.com/vote_db" npx prisma migrate deploy
   ```

4. **等待完成**
   - 應該會看到類似這樣的輸出：
   ```
   Environment variables loaded from .env
   Prisma schema loaded from prisma/schema.prisma
   Datasource "db": PostgreSQL database "xxx", schema "public"
   
   Applying migration `20260130074120_init`
   The following migration(s) have been applied:
   
   migrations/
     └─ 20260130074120_init/
       └─ migration.sql
   
   ✅ All migrations have been successfully applied.
   ```

### 步驟 3：驗證遷移成功

1. **測試 API**
   - 在瀏覽器訪問：
     ```
     https://your-app.onrender.com/api/health
     ```
   - 應該返回：`{"status":"ok","message":"Vote API is running"}`

2. **測試投票列表**
   - 訪問：
     ```
     https://your-app.onrender.com/api/polls
     ```
   - 應該返回：`{"polls":[]}`（空數組是正常的）

3. **刷新前端頁面**
   - 應該不再顯示 500 錯誤
   - 應該能看到投票列表（即使為空）

## 🔍 如果遇到問題

### 問題 1：找不到 DATABASE_URL
**解決方案**：
- 確認你在 Web Service 的 Settings 頁面
- 確認 Environment Variables 部分已展開
- 如果看不到，可能需要檢查權限

### 問題 2：連接失敗
**解決方案**：
- 確認 DATABASE_URL 格式正確
- 確認數據庫服務正在運行
- 確認網絡連接正常

### 問題 3：遷移失敗
**解決方案**：
- 查看錯誤訊息
- 確認 DATABASE_URL 正確
- 確認數據庫服務正在運行
- 確認 Prisma schema 正確

## 💡 提示

1. **DATABASE_URL 格式**
   - 必須是完整的連接字符串
   - 包含用戶名、密碼、主機、端口和數據庫名
   - 格式：`postgresql://user:password@host:port/database`

2. **安全性**
   - DATABASE_URL 包含敏感信息
   - 不要分享給他人
   - 不要在公開場所顯示

3. **一次性操作**
   - 遷移只需要運行一次
   - 之後數據表就會存在
   - 不需要每次部署都運行

## 🎉 完成後

遷移完成後：
- ✅ 數據表已創建（users, polls, options, votes）
- ✅ API 應該能正常運作
- ✅ 前端應該能正常連接後端
- ✅ 可以開始使用投票系統了！

## 📝 快速命令

如果你已經複製了 DATABASE_URL，直接運行：

```bash
cd backend
DATABASE_URL="貼上你的_DATABASE_URL" npx prisma migrate deploy
```

記得將 `貼上你的_DATABASE_URL` 替換為實際的連接字符串！
