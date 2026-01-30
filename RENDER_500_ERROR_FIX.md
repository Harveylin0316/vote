# Render 500 錯誤修復指南

## 🔍 問題：500 Internal Server Error

這通常是後端服務器錯誤，可能的原因：

1. **數據庫遷移未運行**（最常見）
2. **數據庫連接問題**
3. **環境變量未設置**
4. **代碼錯誤**

## ✅ 解決步驟

### 步驟 1：檢查 Render 日誌

1. 在 Render Dashboard，進入你的 **Web Service**
2. 點擊 **Logs** 標籤
3. 查看最新的錯誤訊息
4. 複製錯誤訊息

常見錯誤：
- `Table 'users' does not exist` → 數據庫遷移未運行
- `Connection refused` → 數據庫連接問題
- `Environment variable not found` → 環境變量未設置

### 步驟 2：運行數據庫遷移（最重要）

如果看到 `Table does not exist` 錯誤：

**方法 A：使用 Render Shell**

1. 在 Web Service 頁面，點擊 **Shell** 標籤
2. 運行：
```bash
npx prisma migrate deploy
```

**方法 B：在本地運行**

1. 從 Render Dashboard 複製 `DATABASE_URL`
   - Web Service → Settings → Environment Variables → DATABASE_URL
2. 在本地終端運行：
```bash
cd backend
DATABASE_URL="你的_DATABASE_URL" npx prisma migrate deploy
```

### 步驟 3：檢查環境變量

確認以下環境變量都已設置：

- [ ] `DATABASE_URL` - PostgreSQL 連接字符串
- [ ] `JWT_SECRET` - JWT 加密密鑰
- [ ] `CORS_ORIGIN` - 允許的前端域名
- [ ] `NODE_ENV` - `production`

### 步驟 4：檢查數據庫連接

1. 確認 PostgreSQL 服務正在運行
2. 確認 `DATABASE_URL` 使用 **Internal Database URL**（不是 Public URL）
3. 確認數據庫和 Web Service 在同一區域

### 步驟 5：重新部署

如果修改了環境變量或代碼：

1. 在 Web Service 頁面
2. 點擊 **Manual Deploy** → **Deploy latest commit**
3. 等待部署完成
4. 查看日誌確認是否成功

## 🔍 調試方法

### 查看實時日誌

1. 在 Render Dashboard，進入 Web Service
2. 點擊 **Logs** 標籤
3. 實時查看錯誤訊息
4. 訪問前端觸發錯誤，觀察日誌

### 測試 API 端點

在瀏覽器或使用 curl：

```bash
# 測試健康檢查
curl https://your-app.onrender.com/api/health

# 測試獲取投票列表
curl https://your-app.onrender.com/api/polls
```

### 使用 Render Shell 調試

1. 點擊 **Shell** 標籤
2. 運行：
```bash
# 檢查環境變量
echo $DATABASE_URL

# 測試數據庫連接
npx prisma db pull

# 查看數據表
npx prisma studio
```

## ⚠️ 常見錯誤和解決方案

### 錯誤 1：Table 'users' does not exist

**原因**：數據庫遷移未運行

**解決**：
```bash
npx prisma migrate deploy
```

### 錯誤 2：Connection refused

**原因**：數據庫連接字符串錯誤

**解決**：
- 確認使用 **Internal Database URL**
- 確認數據庫服務正在運行
- 確認數據庫和 Web Service 在同一區域

### 錯誤 3：Environment variable not found

**原因**：環境變量未設置

**解決**：
- 檢查 Settings → Environment Variables
- 確認所有必需的變量都已設置
- 重新部署服務

### 錯誤 4：Prisma Client not generated

**原因**：Prisma Client 未生成

**解決**：
```bash
npx prisma generate
```

## 📝 檢查清單

- [ ] 數據庫遷移已運行
- [ ] 所有環境變量已設置
- [ ] 數據庫服務正在運行
- [ ] Web Service 正在運行
- [ ] 日誌中沒有錯誤
- [ ] `/api/health` 端點返回正常
- [ ] `/api/polls` 端點可以訪問

## 🆘 如果還是不行

1. **查看完整日誌**
   - 複製 Render Logs 中的完整錯誤訊息
   - 發給我，我可以幫你分析

2. **檢查數據庫**
   - 確認數據庫服務狀態
   - 確認數據庫連接

3. **重新創建服務**
   - 如果問題持續，可以嘗試重新創建 Web Service

## 💡 提示

- Render 免費方案首次訪問需要約 30 秒喚醒
- 檢查日誌是最重要的調試方法
- 數據庫遷移是最常見的問題原因
