# 推送到 GitHub 步驟

## ✅ 已完成
- Git 倉庫已初始化
- 所有文件已提交（52 個文件）
- 遠程倉庫已配置：https://github.com/Harveylin0316/vote.git

## 📤 推送步驟

請在終端執行以下命令：

```bash
cd "/Users/harveylin/Documents/Cursor Project/Vote"
git push -u origin main
```

### 如果需要身份驗證

**方式一：使用 Personal Access Token（推薦）**

1. 前往 GitHub 創建 Token：
   - https://github.com/settings/tokens
   - 點擊 "Generate new token (classic)"
   - 選擇權限：勾選 `repo`（完整倉庫權限）
   - 點擊 "Generate token"
   - **複製生成的 token**（只會顯示一次）

2. 執行推送命令時：
   - 用戶名：輸入 `Harveylin0316`
   - 密碼：**貼上剛才複製的 Personal Access Token**（不是你的 GitHub 密碼）

**方式二：使用 SSH（長期推薦）**

1. 檢查是否有 SSH key：
```bash
ls -al ~/.ssh
```

2. 如果沒有，生成 SSH key：
```bash
ssh-keygen -t ed25519 -C "qetuo60512@gmail.com"
# 按 Enter 使用默認路徑
# 可以設置密碼或直接按 Enter
```

3. 複製 SSH public key：
```bash
cat ~/.ssh/id_ed25519.pub
```

4. 添加到 GitHub：
   - 前往：https://github.com/settings/keys
   - 點擊 "New SSH key"
   - Title: 輸入任意名稱（如 "MacBook"）
   - Key: 貼上剛才複製的內容
   - 點擊 "Add SSH key"

5. 更改遠程 URL 並推送：
```bash
cd "/Users/harveylin/Documents/Cursor Project/Vote"
git remote set-url origin git@github.com:Harveylin0316/vote.git
git push -u origin main
```

## 📋 當前狀態

- **分支**：main
- **提交**：1 個（初始提交）
- **遠程倉庫**：https://github.com/Harveylin0316/vote.git
- **文件數**：52 個文件

## 🔗 推送成功後

代碼將在以下地址可見：
**https://github.com/Harveylin0316/vote**
