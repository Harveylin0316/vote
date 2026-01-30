# Railway 設置疑難排解

## 🔍 問題：連接 GitHub 後看不到倉庫

### 可能原因和解決方案

#### 原因 1：需要安裝 Railway GitHub App
Railway 需要通過 GitHub App 來訪問你的倉庫。

**解決步驟：**
1. 在 Railway Dashboard 中，點擊右上角的頭像
2. 選擇 **Settings** 或 **Account Settings**
3. 找到 **GitHub** 或 **Connected Services** 部分
4. 點擊 **Connect GitHub** 或 **Authorize Railway**
5. 會跳轉到 GitHub 授權頁面
6. 確認授權 Railway 訪問你的倉庫
7. 如果倉庫是私有的，確保勾選了 **Private repositories** 選項

#### 原因 2：需要授權訪問私有倉庫
如果你的倉庫是私有的，需要特別授權。

**解決步驟：**
1. 在 GitHub 中，前往 **Settings** → **Applications** → **Installed GitHub Apps**
2. 找到 **Railway** 應用
3. 點擊進入設置
4. 在 **Repository access** 部分：
   - 選擇 **All repositories**（推薦）
   - 或選擇 **Only select repositories**，然後選擇 `vote` 倉庫
5. 保存設置

#### 原因 3：使用 New Project 而不是從 GitHub 部署
有時候需要明確選擇從 GitHub 部署。

**解決步驟：**
1. 在 Railway Dashboard 中，點擊 **New Project**
2. 選擇 **Deploy from GitHub repo**
3. 如果還是看不到倉庫，點擊 **Configure GitHub App** 或 **Authorize**
4. 重新授權後，應該就能看到倉庫了

#### 原因 4：倉庫名稱或組織問題
確認倉庫是否在正確的帳號下。

**檢查步驟：**
1. 確認你的 GitHub 帳號是 `Harveylin0316`
2. 確認倉庫名稱是 `vote`
3. 確認倉庫是公開的，或者已授權 Railway 訪問私有倉庫

---

## 🚀 正確的部署流程

### 步驟 1：確保 GitHub 授權
1. 前往 Railway Dashboard
2. 點擊右上角頭像 → **Settings**
3. 在 **GitHub** 部分，確認已連接
4. 如果沒有，點擊 **Connect GitHub** 並完成授權

### 步驟 2：創建新項目
1. 點擊 **New Project**
2. 選擇 **Deploy from GitHub repo**
3. 在搜索框中輸入 `vote` 或 `Harveylin0316/vote`
4. 選擇你的倉庫

### 步驟 3：如果還是看不到倉庫
嘗試以下方法：

**方法 A：直接通過 GitHub 部署**
1. 在 GitHub 中，前往你的 `vote` 倉庫
2. 點擊 **Settings** → **Integrations** → **Railway**
3. 如果沒有看到 Railway，前往 https://railway.app/new
4. 選擇 **Deploy from GitHub repo**
5. 授權後應該能看到倉庫

**方法 B：手動輸入倉庫**
1. 在 Railway 的 **New Project** 頁面
2. 如果搜索不到，嘗試直接輸入：`Harveylin0316/vote`
3. 或使用完整 URL：`https://github.com/Harveylin0316/vote`

**方法 C：使用 Railway CLI**
如果網頁界面有問題，可以使用命令行：
```bash
# 安裝 Railway CLI
npm i -g @railway/cli

# 登入
railway login

# 初始化項目
railway init

# 連接 GitHub 倉庫
railway link
```

---

## 🔧 快速檢查清單

- [ ] Railway 帳號已創建並登入
- [ ] GitHub 帳號已連接到 Railway
- [ ] Railway GitHub App 已安裝並授權
- [ ] 已授權訪問私有倉庫（如果倉庫是私有的）
- [ ] 倉庫名稱正確：`Harveylin0316/vote`
- [ ] 嘗試刷新頁面或重新登入 Railway

---

## 💡 替代方案：手動部署

如果 GitHub 連接有問題，也可以手動部署：

1. **使用 Railway CLI**
   ```bash
   npm i -g @railway/cli
   railway login
   cd backend
   railway init
   railway up
   ```

2. **使用 Docker**
   - 創建 Dockerfile
   - 在 Railway 中選擇 **Deploy from Dockerfile**

---

## 🆘 如果還是不行

1. **檢查 Railway 狀態**
   - 前往 https://status.railway.app 查看服務狀態

2. **聯繫 Railway 支持**
   - 在 Railway Dashboard 右下角有支持按鈕
   - 或發送郵件到 support@railway.app

3. **嘗試其他平台**
   - Render：https://render.com
   - Fly.io：https://fly.io
   - 詳細步驟見 `DEPLOY_BACKEND.md`

---

## 📝 常見錯誤訊息

### "No repositories found"
- **原因**：未授權訪問倉庫
- **解決**：前往 GitHub Settings → Applications → Railway，授權訪問倉庫

### "Repository not found"
- **原因**：倉庫名稱錯誤或沒有訪問權限
- **解決**：確認倉庫名稱和權限設置

### "Authentication failed"
- **原因**：GitHub 授權過期
- **解決**：重新連接 GitHub 帳號
