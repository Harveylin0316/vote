# 修復 phone 欄位缺失問題

## 🔍 問題原因

遷移文件 `20260130074120_init/migration.sql` 是舊版本的，創建的是 `username` 和 `email` 欄位，但代碼需要 `phone` 欄位。

## ✅ 解決方案：創建新遷移

我已經創建了一個新的遷移文件來修復這個問題。

### 步驟 1：運行新遷移

在本地終端運行：

```bash
cd backend
DATABASE_URL="你的_External_DATABASE_URL" npx prisma migrate deploy
```

這會應用新的遷移，將 `username` 和 `email` 欄位改為 `phone`。

### 步驟 2：如果遷移失敗（因為欄位已存在）

如果數據庫中已經有 `phone` 欄位，但遷移失敗，可以手動執行 SQL：

```sql
-- 確保 phone 欄位存在
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "phone" TEXT;

-- 創建唯一索引
CREATE UNIQUE INDEX IF NOT EXISTS "users_phone_key" ON "users"("phone");

-- 刪除舊的欄位（如果存在）
ALTER TABLE "users" DROP COLUMN IF EXISTS "username";
ALTER TABLE "users" DROP COLUMN IF EXISTS "email";

-- 刪除舊的索引
DROP INDEX IF EXISTS "users_username_key";
DROP INDEX IF EXISTS "users_email_key";
```

### 步驟 3：重新生成 Prisma Client

```bash
cd backend
DATABASE_URL="你的_External_DATABASE_URL" npx prisma generate
```

### 步驟 4：重新部署 Render 服務

1. 在 Render Dashboard，觸發重新部署
2. 或推送代碼觸發自動部署

## 🎯 快速修復（推薦）

如果數據庫是空的（沒有重要數據），可以重置數據庫：

```bash
cd backend
DATABASE_URL="你的_External_DATABASE_URL" npx prisma migrate reset
```

然後重新運行遷移：

```bash
DATABASE_URL="你的_External_DATABASE_URL" npx prisma migrate deploy
```

## ⚠️ 注意

- 如果數據庫中已有數據，重置會刪除所有數據
- 建議先備份數據（如果有重要數據）
- 或者使用手動 SQL 修復

## 📝 驗證

修復後，測試註冊：

1. 訪問前端網站
2. 嘗試註冊新帳號
3. 應該能成功註冊

## 🆘 如果還是不行

如果遷移後還是有問題：

1. **檢查數據庫結構**
   - 使用 Prisma Studio：`npx prisma studio`
   - 查看 `users` 表是否有 `phone` 欄位

2. **手動執行 SQL**
   - 使用數據庫管理工具或 Render 的數據庫界面
   - 執行上面的 SQL 語句

3. **重新生成 Prisma Client**
   - 確保 Prisma Client 與數據庫結構匹配
