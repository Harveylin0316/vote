# Render 構建錯誤修復

## 🔍 問題

TypeScript 編譯時找不到類型定義文件，因為生產環境默認不安裝 `devDependencies`。

## ✅ 解決方案

### 方法 1：更新構建命令（推薦）

在 Render Dashboard 中，更新 **Build Command**：

```
NPM_CONFIG_PRODUCTION=false npm install --legacy-peer-deps && npm run build
```

這個命令會：
1. `NPM_CONFIG_PRODUCTION=false` - 強制安裝 devDependencies（包括類型定義）
2. `npm install --legacy-peer-deps` - 安裝所有依賴
3. `npm run build` - 編譯 TypeScript

### 方法 2：如果方法 1 不行，使用完整命令

```
NPM_CONFIG_PRODUCTION=false npm ci --legacy-peer-deps && npm run build
```

## 📝 步驟

1. 進入 Render Dashboard
2. 點擊你的 Web Service
3. 進入 **Settings** 標籤
4. 找到 **Build Command**
5. 更新為：`NPM_CONFIG_PRODUCTION=false npm install --legacy-peer-deps && npm run build`
6. 點擊 **Save Changes**
7. Render 會自動重新部署

## 💡 為什麼需要這樣？

- TypeScript 編譯需要類型定義（`@types/*`）
- 這些類型定義在 `devDependencies` 中
- 生產環境默認不安裝 `devDependencies`
- 設置 `NPM_CONFIG_PRODUCTION=false` 會安裝所有依賴，包括 devDependencies
- 運行時只使用 `dependencies`，不會影響生產包大小

## ⚠️ 注意

- 構建時需要 devDependencies（類型定義、TypeScript 等）
- 運行時只需要 dependencies（實際代碼）
- Render 會自動處理，不會將 devDependencies 包含在運行時環境中
