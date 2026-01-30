# 註冊功能 500 錯誤修復

## 🔍 問題

註冊會員時出現 500 錯誤，這通常是後端服務器錯誤。

## ✅ 調試步驟

### 步驟 1：查看 Render 日誌（最重要）

1. **進入 Render Dashboard**
   - 前往 https://dashboard.render.com
   - 登入你的帳號

2. **進入 Web Service**
   - 點擊你的 Web Service（例如 `vote-backend`）

3. **查看 Logs**
   - 點擊 **Logs** 標籤
   - 嘗試註冊一次（觸發錯誤）
   - 查看最新的錯誤訊息
   - **複製完整的錯誤訊息**

常見錯誤：
- `bcrypt is not a function` → bcryptjs 導入問題
- `phone already exists` → 手機號已存在
- `Database connection error` → 數據庫連接問題
- `Validation error` → 數據驗證失敗

### 步驟 2：檢查常見問題

#### 問題 1：bcryptjs 導入錯誤

如果錯誤訊息包含 `bcrypt` 或 `bcryptjs`：

**檢查代碼**：
- 確認 `backend/src/utils/password.ts` 使用正確的導入
- 應該是：`import bcrypt from 'bcryptjs'`
- 不應該是：`import * as bcrypt from 'bcryptjs'`

#### 問題 2：手機號已存在

如果錯誤訊息包含 `Unique constraint` 或 `already exists`：

**解決方案**：
- 這是正常的，表示該手機號已經註冊過
- 嘗試使用不同的手機號註冊
- 或先登入現有帳號

#### 問題 3：數據驗證失敗

如果錯誤訊息包含 `Validation`：

**檢查**：
- 確認手機號格式正確（10 碼，09 開頭）
- 確認密碼不為空
- 確認所有必填字段都已填寫

#### 問題 4：數據庫連接問題

如果錯誤訊息包含 `Connection` 或 `Database`：

**解決方案**：
- 確認數據庫服務正在運行
- 確認 `DATABASE_URL` 環境變量正確
- 確認數據庫遷移已運行

## 🔧 修復方法

### 方法 1：檢查 Render 日誌

1. 查看 Logs 中的具體錯誤
2. 根據錯誤訊息修復問題
3. 重新部署（如果需要）

### 方法 2：檢查代碼

確認以下文件正確：

1. **`backend/src/utils/password.ts`**
   ```typescript
   import bcrypt from 'bcryptjs'
   
   export async function hashPassword(password: string): Promise<string> {
     return await bcrypt.hash(password, 10)
   }
   
   export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
     return await bcrypt.compare(password, hashedPassword)
   }
   ```

2. **`backend/src/controllers/authController.ts`**
   - 確認導入：`import { hashPassword } from '../utils/password'`
   - 確認使用：`const hashedPassword = await hashPassword(password)`

### 方法 3：測試 API 直接調用

使用 curl 或 Postman 測試註冊 API：

```bash
curl -X POST https://your-app.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "0912345678",
    "password": "password123"
  }'
```

查看返回的錯誤訊息。

## 📝 請告訴我

1. **Render 日誌中的具體錯誤訊息是什麼？**
   - 這是最重要的信息
   - 可以幫我精確定位問題

2. **你輸入的手機號和密碼是什麼格式？**
   - 手機號：10 碼，09 開頭？
   - 密碼：是否有特殊字符？

3. **是否已經有帳號使用這個手機號？**
   - 如果已存在，會返回錯誤

## 🆘 快速檢查

請先：
1. 查看 Render Logs 中的錯誤訊息
2. 複製完整的錯誤訊息
3. 告訴我具體的錯誤

這樣我可以幫你精確修復問題！
