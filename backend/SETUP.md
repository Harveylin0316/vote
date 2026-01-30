# 后端设置指南

## 1. 安装依赖

```bash
npm install
```

## 2. 配置数据库

### 2.1 安装 PostgreSQL

确保你的系统已安装 PostgreSQL。如果没有，请访问 https://www.postgresql.org/download/

### 2.2 创建数据库

```bash
# 连接到 PostgreSQL
psql -U postgres

# 创建数据库
CREATE DATABASE vote_db;

# 退出
\q
```

### 2.3 配置环境变量

在 `backend` 目录下创建 `.env` 文件：

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/vote_db"

# JWT Secret (请更改为一个强密码)
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Server Port
PORT=3001

# CORS Origin
CORS_ORIGIN="http://localhost:5173"
```

**重要：** 请将 `username` 和 `password` 替换为你的 PostgreSQL 用户名和密码。

## 3. 运行数据库迁移

```bash
# 生成 Prisma Client
npx prisma generate

# 运行数据库迁移
npx prisma migrate dev --name init
```

这将创建所有必要的数据库表。

## 4. 启动开发服务器

```bash
npm run dev
```

服务器将在 `http://localhost:3001` 启动。

## 5. API 端点

### 认证相关
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录
- `GET /api/auth/me` - 获取当前用户信息（需要认证）

### 投票相关
- `GET /api/polls` - 获取所有投票列表
- `GET /api/polls/:id` - 获取投票详情
- `POST /api/polls` - 创建投票（需要认证）
- `POST /api/polls/:id/vote` - 提交投票（需要认证）

## 6. 测试 API

### 注册用户
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 登录
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 创建投票（需要 token）
```bash
curl -X POST http://localhost:3001/api/polls \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "你最喜欢的编程语言？",
    "description": "请选择你最喜欢的编程语言",
    "pollType": "SINGLE",
    "maxVotesPerUser": 1,
    "options": ["JavaScript", "Python", "Java", "TypeScript"]
  }'
```

## 7. 查看数据库

使用 Prisma Studio 查看数据库：

```bash
npx prisma studio
```

这将打开一个 Web 界面，你可以在浏览器中查看和编辑数据库数据。
