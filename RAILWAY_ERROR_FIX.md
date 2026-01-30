# Railway 部署錯誤修復：Failed to get private network endpoint

## 🔍 錯誤說明

"Failed to get private network endpoint" 通常發生在：
- Railway 嘗試連接數據庫時
- 服務之間的私有網路連接問題
- 數據庫服務尚未完全啟動

## ✅ 解決方案

### 方法 1：確保服務啟動順序（推薦）

1. **先創建數據庫服務**
   - 在 Railway 項目中，點擊 **+ New**
   - 選擇 **Database** → **Add PostgreSQL**
   - 等待數據庫完全啟動（狀態顯示為 Running）

2. **然後創建應用服務**
   - 數據庫啟動後，再創建應用服務
   - 或重新部署應用服務

3. **檢查環境變量**
   - 確認 `DATABASE_URL` 已自動設置
   - 在服務的 **Variables** 標籤中查看

### 方法 2：使用公共連接字符串

如果私有網路連接有問題，可以使用公共連接字符串：

1. **獲取數據庫連接字符串**
   - 點擊 PostgreSQL 服務
   - 進入 **Variables** 標籤
   - 找到 `DATABASE_URL` 或 `POSTGRES_URL`
   - 複製連接字符串

2. **更新應用服務的環境變量**
   - 進入應用服務的 **Variables**
   - 找到 `DATABASE_URL`
   - 如果值以 `postgres://` 開頭（私有網路），替換為公共連接字符串
   - 公共連接字符串格式：`postgresql://user:password@host:port/database`

### 方法 3：重新創建服務

1. **刪除現有服務**
   - 在 Railway 項目中，刪除有問題的服務
   - 保留數據庫服務（如果已創建）

2. **重新創建應用服務**
   - 點擊 **+ New** → **GitHub Repo**
   - 選擇你的倉庫
   - 設置 **Root Directory** 為 `backend`
   - Railway 會自動檢測到數據庫並設置 `DATABASE_URL`

### 方法 4：檢查構建配置

確保構建命令正確：

1. **進入服務設置**
   - 點擊服務 → **Settings** → **Deploy**

2. **設置構建命令**
   ```
   npm install && npm run build && npx prisma generate
   ```

3. **設置啟動命令**
   ```
   npm start
   ```

4. **設置根目錄**
   ```
   backend
   ```

### 方法 5：手動設置環境變量

如果自動設置有問題，手動設置：

1. **獲取數據庫連接信息**
   - 進入 PostgreSQL 服務
   - 查看 **Variables** 中的連接信息：
     - `PGHOST`
     - `PGPORT`
     - `PGDATABASE`
     - `PGUSER`
     - `PGPASSWORD`

2. **構建 DATABASE_URL**
   格式：
   ```
   postgresql://PGUSER:PGPASSWORD@PGHOST:PGPORT/PGDATABASE
   ```

3. **在應用服務中設置**
   - 進入應用服務的 **Variables**
   - 添加或更新 `DATABASE_URL`
   - 使用上面構建的連接字符串

## 🔧 詳細步驟（推薦流程）

### 步驟 1：創建數據庫
1. 在 Railway 項目中，點擊 **+ New**
2. 選擇 **Database** → **Add PostgreSQL**
3. 等待數據庫啟動（可能需要 1-2 分鐘）
4. 確認狀態為 **Running**

### 步驟 2：創建應用服務
1. 點擊 **+ New** → **GitHub Repo**
2. 選擇 `Harveylin0316/vote`
3. Railway 會自動檢測並創建服務

### 步驟 3：配置服務
1. 點擊應用服務進入設置
2. **Settings** → **Source**：
   - **Root Directory**: `backend`
3. **Settings** → **Deploy**：
   - **Build Command**: `npm install && npm run build && npx prisma generate`
   - **Start Command**: `npm start`

### 步驟 4：檢查環境變量
1. 進入 **Variables** 標籤
2. 確認以下變量存在：
   - `DATABASE_URL`（應該自動設置）
   - `JWT_SECRET`（需要手動添加）
   - `CORS_ORIGIN`（需要手動添加）
   - `NODE_ENV=production`（可選）

### 步驟 5：添加必要的環境變量
在 **Variables** 中添加：

```
JWT_SECRET=your-random-secret-key-here
CORS_ORIGIN=http://localhost:5173,https://votepractice.netlify.app
NODE_ENV=production
```

### 步驟 6：運行數據庫遷移
部署完成後，運行遷移：

**方法 A：使用 Railway CLI**
```bash
railway run npx prisma migrate deploy
```

**方法 B：在本地運行**
1. 從 Railway 複製 `DATABASE_URL`
2. 在本地終端運行：
```bash
cd backend
DATABASE_URL="你的_DATABASE_URL" npx prisma migrate deploy
```

### 步驟 7：重新部署
1. 點擊服務的 **Deployments**
2. 點擊 **Redeploy** 或觸發新的部署
3. 等待部署完成

## ⚠️ 常見問題

### 問題 1：數據庫連接失敗
**解決方案**：
- 確認數據庫服務已啟動
- 檢查 `DATABASE_URL` 是否正確
- 嘗試使用公共連接字符串

### 問題 2：構建失敗
**解決方案**：
- 檢查構建命令是否正確
- 確認 `package.json` 中的腳本正確
- 查看構建日誌找出具體錯誤

### 問題 3：Prisma 錯誤
**解決方案**：
- 確認 `npx prisma generate` 在構建命令中
- 確認數據庫遷移已運行
- 檢查 `DATABASE_URL` 格式是否正確

## 📝 驗證部署

部署成功後，測試 API：

```bash
curl https://your-app.up.railway.app/api/health
```

應該返回：
```json
{
  "status": "ok",
  "message": "Vote API is running"
}
```

## 🆘 如果還是不行

1. **檢查 Railway 狀態**
   - 前往 https://status.railway.app

2. **查看詳細日誌**
   - 在服務的 **Deploy Logs** 中查看完整錯誤信息

3. **聯繫 Railway 支持**
   - 在 Railway Dashboard 右下角有支持按鈕

4. **嘗試其他平台**
   - Render：https://render.com
   - Fly.io：https://fly.io
