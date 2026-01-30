# 投票系统 (Vote System)

一个功能完整的投票系统，支持用户注册登录、创建投票、参与投票和管理员管理功能。

## 技术栈

### 前端
- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router

### 后端
- Node.js
- Express
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT 认证

## 项目结构

```
Vote/
├── frontend/                    # 前端项目
│   ├── src/
│   │   ├── pages/              # 页面组件
│   │   │   ├── auth/           # 登录注册页面
│   │   │   ├── home/           # 首页
│   │   │   └── polls/          # 投票相关页面
│   │   ├── components/         # 组件
│   │   │   └── layout/         # 布局组件
│   │   ├── utils/              # 工具函数
│   │   └── ...
│   └── package.json
├── backend/                     # 后端项目
│   ├── src/
│   │   ├── routes/             # 路由
│   │   ├── controllers/        # 控制器
│   │   ├── models/             # 数据模型
│   │   ├── middleware/         # 中间件
│   │   └── utils/              # 工具函数
│   ├── prisma/
│   │   └── schema.prisma       # 数据库模型
│   └── package.json
├── README.md                    # 项目说明
└── .gitignore                   # Git 忽略文件
```

## 功能特性

- ✅ 用户注册和登录
- ✅ 创建投票（普通用户）
- ✅ 参与投票（需登录）
- ✅ 管理员设置（投票规则、用户管理）
- ✅ 投票结果统计和可视化

## 开发指南

### 前端开发
```bash
cd frontend
npm install
npm run dev
```

### 后端开发
```bash
cd backend
npm install
# 创建 .env 文件（参考 env.example.txt）
npm run dev
```

### 数据库设置
1. 确保已安装 PostgreSQL 并创建数据库
2. 配置 `backend/.env` 中的 `DATABASE_URL`
3. 运行迁移：
```bash
cd backend
npx prisma migrate dev
npx prisma generate
```

## 环境变量

### 后端 (.env)
```
DATABASE_URL="postgresql://user:password@localhost:5432/vote_db"
JWT_SECRET="your-secret-key"
PORT=3001
```

### 前端 (.env)
```
VITE_API_URL=http://localhost:3001/api
```

## 下一步开发

当前已完成项目基础架构搭建，包括：
- ✅ 前后端项目初始化
- ✅ 数据库 Schema 设计
- ✅ 基础页面框架和路由
- ✅ API 工具配置

接下来需要实现：
- [ ] 用户认证 API（注册、登录、JWT）
- [ ] 投票 CRUD API
- [ ] 前端认证状态管理（Context/Redux）
- [ ] 投票列表和详情页功能
- [ ] 管理员功能
