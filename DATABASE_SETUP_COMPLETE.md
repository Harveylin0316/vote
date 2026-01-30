# 数据库设置完成 ✅

## 已完成的工作

### 1. PostgreSQL 安装
- ✅ 使用 Homebrew 安装了 PostgreSQL 16
- ✅ 启动了 PostgreSQL 服务

### 2. 数据库创建
- ✅ 创建了数据库 `vote_db`
- ✅ 数据库用户：`harveylin`

### 3. 环境配置
- ✅ 创建了 `.env` 文件
- ✅ 配置了数据库连接字符串
- ✅ 配置了 JWT Secret
- ✅ 配置了服务器端口和 CORS

### 4. 数据库迁移
- ✅ 运行了 Prisma 迁移
- ✅ 创建了所有必要的数据库表：
  - `users` - 用户表
  - `polls` - 投票表
  - `options` - 选项表
  - `votes` - 投票记录表

### 5. 后端服务器
- ✅ 后端服务器已启动
- ✅ 运行在 `http://localhost:3001`
- ✅ Health check 端点正常

## 当前配置

### 数据库连接
```
DATABASE_URL="postgresql://harveylin@localhost:5432/vote_db"
```

### 服务器信息
- 端口：3001
- CORS Origin：http://localhost:5173
- JWT Secret：已配置

## 下一步

1. **测试 API** - 可以开始测试后端 API 端点
2. **连接前端** - 更新前端代码以使用真实 API
3. **创建测试用户** - 使用注册 API 创建第一个用户

## 有用的命令

### 启动 PostgreSQL 服务
```bash
brew services start postgresql@16
```

### 停止 PostgreSQL 服务
```bash
brew services stop postgresql@16
```

### 查看数据库（使用 Prisma Studio）
```bash
cd backend
npx prisma studio
```

### 连接数据库（使用 psql）
```bash
export PATH="/opt/homebrew/opt/postgresql@16/bin:$PATH"
psql -U harveylin -d vote_db
```

### 运行数据库迁移
```bash
cd backend
npx prisma migrate dev
```

## 测试 API

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

### 获取投票列表
```bash
curl http://localhost:3001/api/polls
```
