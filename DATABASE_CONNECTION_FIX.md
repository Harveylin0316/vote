# 數據庫連接錯誤修復

## 🔍 問題

錯誤：`P1001: Can't reach database server at dpg-xxxxx-a:5432`

這表示你使用了 **Internal Database URL**（內部連接），但從本地無法訪問 Render 的內部網絡。

## ✅ 解決方案：使用 External Database URL

### 步驟 1：獲取 External Database URL

1. **進入 Render Dashboard**
   - 前往 https://dashboard.render.com
   - 登入你的帳號

2. **進入 PostgreSQL 服務**（不是 Web Service）
   - 點擊你的 **PostgreSQL** 服務（例如 `vote-db`）

3. **找到 Connection Info**
   - 在數據庫詳情頁面，找到 **Connection Info** 或 **Connections** 部分
   - 找到 **External Database URL** 或 **Public Database URL**
   - 格式類似：
     ```
     postgresql://user:password@dpg-xxxxx-a.singapore-postgres.render.com:5432/database
     ```
   - **複製這個連接字符串**

### 步驟 2：使用 External URL 運行遷移

在本地終端運行：

```bash
cd backend
DATABASE_URL="你的_External_DATABASE_URL" npx prisma migrate deploy
```

**重要**：
- 使用 **External Database URL**（不是 Internal）
- External URL 通常包含完整的主機名，例如：`dpg-xxxxx-a.singapore-postgres.render.com`
- Internal URL 通常只有主機名，例如：`dpg-xxxxx-a`

### 步驟 3：驗證連接

運行遷移後，應該會看到：

```
✅ All migrations have been successfully applied.
```

## 🔍 如何區分 Internal 和 External URL？

### Internal Database URL（內部連接）
- 格式：`postgresql://user:password@dpg-xxxxx-a:5432/database`
- 主機名：`dpg-xxxxx-a`（沒有域名）
- **只能從 Render 內部網絡訪問**
- 用於 Web Service 連接數據庫

### External Database URL（外部連接）
- 格式：`postgresql://user:password@dpg-xxxxx-a.singapore-postgres.render.com:5432/database`
- 主機名：`dpg-xxxxx-a.singapore-postgres.render.com`（完整域名）
- **可以從任何地方訪問**
- 用於本地開發或遷移

## ⚠️ 重要提示

1. **Web Service 環境變量**
   - 在 Render Web Service 的環境變量中，應該使用 **Internal Database URL**
   - 這樣可以減少延遲並提高安全性

2. **本地遷移**
   - 在本地運行遷移時，必須使用 **External Database URL**
   - 否則無法連接到數據庫

3. **安全性**
   - External URL 包含敏感信息
   - 不要分享給他人
   - 不要在公開場所顯示

## 📝 完整步驟

1. **獲取 External Database URL**
   - PostgreSQL 服務 → Connection Info → External Database URL

2. **運行遷移**
   ```bash
   cd backend
   DATABASE_URL="你的_External_DATABASE_URL" npx prisma migrate deploy
   ```

3. **驗證**
   - 訪問：`https://your-app.onrender.com/api/health`
   - 應該返回正常

## 🎯 如果找不到 External URL

如果 Render Dashboard 中沒有顯示 External URL：

1. **檢查數據庫設置**
   - 確認數據庫服務正在運行
   - 確認數據庫是公開的（Public）

2. **使用連接字符串構建**
   - 從 Internal URL 構建 External URL
   - 格式：將 `dpg-xxxxx-a` 改為 `dpg-xxxxx-a.singapore-postgres.render.com`

3. **聯繫 Render 支持**
   - 如果還是有問題，聯繫 Render 支持

## 💡 提示

- External URL 通常以 `.singapore-postgres.render.com` 或類似域名結尾
- 確保端口是 `5432`（PostgreSQL 默認端口）
- 確保連接字符串格式正確
