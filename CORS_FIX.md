# CORS 問題修復指南

## 🔧 已修復的問題

### 1. ✅ 後端 CORS 配置
- 已更新為支援多個域名
- 支援用逗號分隔多個域名
- 開發環境自動允許 localhost

### 2. ✅ 前端 API 配置
- 添加了環境變量檢查
- 生產環境會提示缺少環境變量

## 📋 需要你完成的步驟

### 步驟 1：在 Netlify 設置環境變量

1. 前往 Netlify Dashboard
2. 選擇你的網站：`votepractice`
3. 進入 **Site settings** → **Environment variables**
4. 添加環境變量：
   - **Key**: `VITE_API_URL`
   - **Value**: `你的後端 API 地址`（例如：`https://your-api.railway.app/api`）
5. 點擊 **Save**

### 步驟 2：更新後端 CORS 設置

在你的後端部署平台（Railway、Render 等）的環境變量中：

1. 找到 `CORS_ORIGIN` 環境變量
2. 更新為（用逗號分隔）：
   ```
   http://localhost:5173,https://votepractice.netlify.app
   ```
3. 如果後端還沒有部署，部署時記得設置這個環境變量

### 步驟 3：重新部署

#### Netlify（前端）
- 設置環境變量後，Netlify 會自動重新部署
- 或手動觸發：**Deploys** → **Trigger deploy** → **Deploy site**

#### 後端
- 更新 CORS_ORIGIN 後，重啟後端服務
- 或重新部署後端

## 🔍 驗證步驟

1. **檢查 Netlify 環境變量**
   - 確認 `VITE_API_URL` 已設置
   - 值應該是完整的後端 API URL（包含 `/api`）

2. **檢查後端 CORS**
   - 確認 `CORS_ORIGIN` 包含 `https://votepractice.netlify.app`
   - 可以測試：訪問 `https://your-api.com/api/health`

3. **測試前端**
   - 訪問 https://votepractice.netlify.app
   - 打開瀏覽器開發者工具（F12）
   - 查看 Network 標籤，確認請求發送到正確的 API 地址
   - 不應該再看到 CORS 錯誤

## ⚠️ 常見問題

### 問題 1：仍然看到 localhost:3001
**解決方案**：確認 Netlify 環境變量 `VITE_API_URL` 已設置並重新部署

### 問題 2：CORS 錯誤仍然存在
**解決方案**：
1. 確認後端 `CORS_ORIGIN` 包含 Netlify 域名
2. 確認後端已重啟/重新部署
3. 清除瀏覽器緩存

### 問題 3：後端 API 地址是什麼？
**解決方案**：
- 如果你使用 Railway：`https://your-app.railway.app/api`
- 如果你使用 Render：`https://your-app.onrender.com/api`
- 如果你使用其他平台：查看你的部署平台提供的 URL

## 📝 環境變量檢查清單

### Netlify（前端）
- [ ] `VITE_API_URL` = `你的後端 API 完整地址`

### 後端部署平台
- [ ] `CORS_ORIGIN` = `http://localhost:5173,https://votepractice.netlify.app`
- [ ] `DATABASE_URL` = `你的數據庫連接字符串`
- [ ] `JWT_SECRET` = `你的 JWT 密鑰`
- [ ] `PORT` = `3001`（或你的平台分配的端口）

## 🎯 完成後

完成以上步驟後：
1. 前端應該能正確連接到後端 API
2. 不再出現 CORS 錯誤
3. 所有功能正常運作
