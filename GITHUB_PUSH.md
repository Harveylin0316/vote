# 推送到 GitHub 說明

## 當前狀態

✅ Git 倉庫已初始化
✅ 所有文件已提交
✅ 遠程倉庫已配置：https://github.com/Harveylin0316/vote.git

## 推送方式

### 方式一：使用 GitHub CLI（推薦）

如果你已安裝 GitHub CLI：

```bash
cd "/Users/harveylin/Documents/Cursor Project/Vote"
gh auth login
git push -u origin main
```

### 方式二：使用 Personal Access Token

1. 在 GitHub 上創建 Personal Access Token：
   - 前往：https://github.com/settings/tokens
   - 點擊 "Generate new token (classic)"
   - 選擇權限：`repo`（完整倉庫權限）
   - 複製生成的 token

2. 使用 token 推送：
```bash
cd "/Users/harveylin/Documents/Cursor Project/Vote"
git push -u origin main
# 當提示輸入用戶名時，輸入你的 GitHub 用戶名
# 當提示輸入密碼時，輸入剛才複製的 Personal Access Token
```

### 方式三：配置 SSH Key（長期推薦）

1. 檢查是否已有 SSH key：
```bash
ls -al ~/.ssh
```

2. 如果沒有，生成新的 SSH key：
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

3. 將 SSH key 添加到 GitHub：
```bash
cat ~/.ssh/id_ed25519.pub
# 複製輸出的內容，然後：
# 1. 前往 https://github.com/settings/keys
# 2. 點擊 "New SSH key"
# 3. 貼上剛才複製的內容
```

4. 更改遠程 URL 為 SSH：
```bash
cd "/Users/harveylin/Documents/Cursor Project/Vote"
git remote set-url origin git@github.com:Harveylin0316/vote.git
git push -u origin main
```

## 當前 Git 狀態

- 分支：main
- 遠程倉庫：https://github.com/Harveylin0316/vote.git
- 提交數量：1 個初始提交

## 推送後

推送成功後，你可以在以下地址查看代碼：
https://github.com/Harveylin0316/vote
