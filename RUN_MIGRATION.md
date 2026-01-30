# 運行數據庫遷移

## 🎯 問題

錯誤訊息：`The table 'public.polls' does not exist`

這表示數據庫表還沒有創建，需要運行數據庫遷移。

## ✅ 解決方案：運行數據庫遷移

### 方法 1：使用 Render Shell（推薦）

1. **進入 Render Dashboard**
   - 前往 https://dashboard.render.com
   - 登入你的帳號

2. **進入 Web Service**
   - 點擊你的 Web Service（例如 `vote-backend`）

3. **打開 Shell**
   - 點擊 **Shell** 標籤
   - 等待 Shell 連接（可能需要幾秒鐘）

4. **運行遷移命令**
   ```bash
   npx prisma migrate deploy
   ```

5. **等待完成**
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

6. **完成！**
   - 遷移完成後，數據表已創建
   - 刷新前端頁面，應該就能正常運作了

### 方法 2：在本地運行（如果 Shell 有問題）

1. **獲取 DATABASE_URL**
   - 在 Render Dashboard
   - Web Service → Settings → Environment Variables
   - 找到 `DATABASE_URL`，點擊顯示值
   - 複製完整的連接字符串

2. **在本地終端運行**
   ```bash
   cd backend
   DATABASE_URL="你的_DATABASE_URL" npx prisma migrate deploy
   ```

3. **等待完成**
   - 應該會看到遷移成功的訊息

## 🔍 驗證遷移是否成功

### 方法 1：測試 API

在瀏覽器訪問：
```
https://your-app.onrender.com/api/health
```

應該返回：
```json
{"status":"ok","message":"Vote API is running"}
```

然後訪問：
```
https://your-app.onrender.com/api/polls
```

應該返回：
```json
{"polls":[]}
```
（空數組是正常的，因為還沒有投票）

### 方法 2：使用 Prisma Studio

在 Render Shell 中運行：
```bash
npx prisma studio
```

這會打開一個網頁界面，可以查看數據庫表。

## ⚠️ 常見問題

### 問題 1：Shell 無法連接
**解決方案**：
- 確認 Web Service 正在運行
- 等待幾秒鐘再試
- 刷新頁面

### 問題 2：遷移失敗
**解決方案**：
- 查看錯誤訊息
- 確認 `DATABASE_URL` 正確
- 確認數據庫服務正在運行

### 問題 3：遷移後還是 500 錯誤
**解決方案**：
- 確認遷移成功完成
- 重新部署 Web Service
- 查看日誌確認沒有其他錯誤

## 📝 遷移後檢查清單

- [ ] 遷移命令成功運行
- [ ] 看到 "All migrations have been successfully applied"
- [ ] `/api/health` 返回正常
- [ ] `/api/polls` 返回 `{"polls":[]}`
- [ ] 前端頁面不再顯示 500 錯誤

## 🎉 完成後

遷移完成後：
1. 數據表已創建（users, polls, options, votes）
2. API 應該能正常運作
3. 前端應該能正常連接後端
4. 可以開始使用投票系統了！
