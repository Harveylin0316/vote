# 數據庫欄位缺失錯誤修復

## 🔍 問題

錯誤：`The column users.phone does not exist in the current database.`

這表示數據庫中的 `users` 表沒有 `phone` 欄位，可能是：
1. 遷移沒有正確執行
2. 數據庫結構與 Prisma schema 不匹配
3. Prisma Client 沒有重新生成

## ✅ 解決方案

### 方法 1：重新運行遷移（推薦）

1. **檢查遷移文件**
   - 確認 `backend/prisma/migrations/20260130074120_init/migration.sql` 包含 `phone` 欄位

2. **重新運行遷移**
   ```bash
   cd backend
   DATABASE_URL="你的_External_DATABASE_URL" npx prisma migrate deploy
   ```

3. **重新生成 Prisma Client**
   ```bash
   DATABASE_URL="你的_External_DATABASE_URL" npx prisma generate
   ```

4. **重新部署**
   - 在 Render Dashboard，觸發重新部署
   - 或推送代碼觸發自動部署

### 方法 2：重置數據庫（如果方法 1 不行）

⚠️ **警告**：這會刪除所有數據！

1. **重置數據庫**
   ```bash
   cd backend
   DATABASE_URL="你的_External_DATABASE_URL" npx prisma migrate reset
   ```

2. **重新運行遷移**
   ```bash
   DATABASE_URL="你的_External_DATABASE_URL" npx prisma migrate deploy
   ```

### 方法 3：手動創建遷移（如果遷移文件有問題）

1. **創建新的遷移**
   ```bash
   cd backend
   DATABASE_URL="你的_External_DATABASE_URL" npx prisma migrate dev --name add_phone_column
   ```

2. **部署遷移**
   ```bash
   DATABASE_URL="你的_External_DATABASE_URL" npx prisma migrate deploy
   ```

## 🔍 檢查步驟

### 步驟 1：檢查 Prisma Schema

確認 `backend/prisma/schema.prisma` 中 User 模型有 `phone` 欄位：

```prisma
model User {
  id        String   @id @default(uuid())
  phone     String   @unique  // 確認這一行存在
  password  String
  role      UserRole @default(USER)
  ...
}
```

### 步驟 2：檢查遷移文件

確認 `backend/prisma/migrations/20260130074120_init/migration.sql` 包含：

```sql
CREATE TABLE "users" (
  "id" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "password" TEXT NOT NULL,
  ...
  CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");
```

### 步驟 3：檢查數據庫結構

使用 Prisma Studio 檢查：

```bash
cd backend
DATABASE_URL="你的_External_DATABASE_URL" npx prisma studio
```

查看 `users` 表是否有 `phone` 欄位。

## 🎯 推薦步驟

1. **重新運行遷移**
   ```bash
   cd backend
   DATABASE_URL="你的_External_DATABASE_URL" npx prisma migrate deploy
   ```

2. **重新生成 Prisma Client**
   ```bash
   DATABASE_URL="你的_External_DATABASE_URL" npx prisma generate
   ```

3. **重新部署 Render 服務**
   - 在 Render Dashboard，觸發重新部署
   - 或推送代碼觸發自動部署

4. **測試註冊**
   - 嘗試註冊新帳號
   - 應該能成功

## ⚠️ 如果還是不行

如果重新運行遷移後還是有問題：

1. **檢查遷移文件是否正確**
   - 確認 migration.sql 包含 `phone` 欄位

2. **手動檢查數據庫**
   - 使用 Prisma Studio 或數據庫管理工具
   - 查看 `users` 表的結構

3. **重置數據庫**（最後手段）
   - 這會刪除所有數據
   - 只在必要時使用

## 💡 提示

- 確保使用 External Database URL 運行遷移
- 遷移完成後，重新生成 Prisma Client
- 重新部署 Render 服務以使用新的 Prisma Client
