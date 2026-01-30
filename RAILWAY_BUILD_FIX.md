# Railway 構建錯誤修復：Error creating build plan with Railpack

## 🔍 錯誤說明

"Error creating build plan with Railpack" 通常發生在：
- Railway 無法正確檢測項目類型
- 構建配置文件有問題
- 根目錄設置不正確

## ✅ 解決方案

### 方法 1：檢查服務設置（最重要）

1. **確認根目錄設置**
   - 進入服務 → **Settings** → **Source**
   - **Root Directory** 必須設置為：`backend`
   - 如果沒有設置，Railway 會在項目根目錄查找，導致找不到 `package.json`

2. **檢查構建配置**
   - **Settings** → **Deploy**
   - **Build Command** 應該為：`npm install --legacy-peer-deps && npm run build`
   - **Start Command** 應該為：`npm start`
   - 或者留空，讓 Railway 使用 `nixpacks.toml` 配置

### 方法 2：使用 nixpacks.toml（已創建）

我已經創建了 `backend/nixpacks.toml` 文件，Railway 會自動使用它。

如果還是有問題，可以手動設置構建命令：

1. 進入服務 → **Settings** → **Deploy**
2. **Build Command**：
   ```
   npm install --legacy-peer-deps && npm run build && npx prisma generate
   ```
3. **Start Command**：
   ```
   npm start
   ```

### 方法 3：檢查文件結構

確保 Railway 能找到以下文件：
- `backend/package.json` ✅
- `backend/tsconfig.json` ✅
- `backend/src/index.ts` ✅
- `backend/nixpacks.toml` ✅（已創建）

### 方法 4：重新創建服務

如果以上方法都不行：

1. **刪除現有服務**
   - 在 Railway 項目中，刪除有問題的服務
   - 保留數據庫服務

2. **重新創建服務**
   - 點擊 **+ New** → **GitHub Repo**
   - 選擇 `Harveylin0316/vote`
   - **立即設置 Root Directory**：
     - 點擊服務 → **Settings** → **Source**
     - **Root Directory**: `backend`
   - 保存

3. **設置構建命令**（可選，如果 nixpacks.toml 不工作）
   - **Settings** → **Deploy**
   - **Build Command**: `npm install --legacy-peer-deps && npm run build && npx prisma generate`
   - **Start Command**: `npm start`

## 🔧 詳細步驟

### 步驟 1：確認當前設置

1. 進入 Railway Dashboard
2. 選擇你的項目
3. 點擊應用服務
4. 進入 **Settings** → **Source**
5. **確認 Root Directory 是 `backend`**

### 步驟 2：檢查構建配置

1. **Settings** → **Deploy**
2. 查看 **Build Command** 和 **Start Command**
3. 如果為空，Railway 會使用 `nixpacks.toml`
4. 如果有值，確認它們正確

### 步驟 3：重新部署

1. 點擊 **Deployments**
2. 點擊 **Redeploy** 或觸發新的部署
3. 查看構建日誌

## 📝 正確的配置

### railway.json（已更新）
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm install && npm run build && npx prisma generate"
  },
  "deploy": {
    "startCommand": "npm start"
  }
}
```

### nixpacks.toml（已創建）
```toml
[phases.setup]
nixPkgs = ["nodejs-20_x"]

[phases.install]
cmds = [
  "npm install --legacy-peer-deps",
  "npm run build"
]

[start]
cmd = "npm start"
```

## ⚠️ 常見問題

### 問題 1：Root Directory 未設置
**症狀**：構建失敗，找不到 package.json
**解決**：設置 **Root Directory** 為 `backend`

### 問題 2：構建命令錯誤
**症狀**：構建失敗，npm 錯誤
**解決**：使用 `npm install --legacy-peer-deps` 而不是 `npm ci`

### 問題 3：Prisma 未生成
**症狀**：運行時錯誤，找不到 Prisma Client
**解決**：確保構建命令包含 `npx prisma generate`

## 🎯 快速檢查清單

- [ ] Root Directory 設置為 `backend`
- [ ] `backend/nixpacks.toml` 存在
- [ ] `backend/package.json` 存在
- [ ] 構建命令包含 `prisma generate`
- [ ] 已重新部署服務

## 🆘 如果還是不行

1. **查看詳細日誌**
   - 點擊 **View logs** 查看完整錯誤信息
   - 複製錯誤信息給我

2. **嘗試手動構建命令**
   - 在 **Settings** → **Deploy** 中明確設置構建命令
   - 不要依賴自動檢測

3. **檢查 Railway 狀態**
   - 前往 https://status.railway.app
