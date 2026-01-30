import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import pollRoutes from './routes/pollRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware - CORS 配置（支援多個域名）
const allowedOrigins = process.env.CORS_ORIGIN 
  ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim())
  : ['http://localhost:5173'];

app.use(cors({
  origin: (origin, callback) => {
    // 允許沒有 origin 的請求（如 Postman、移動應用）
    if (!origin) return callback(null, true);
    
    // 檢查是否在允許列表中
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      // 開發環境允許所有 localhost
      if (process.env.NODE_ENV !== 'production' && origin.includes('localhost')) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Vote API is running' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/polls', pollRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📝 API endpoints:`);
  console.log(`   POST /api/auth/register`);
  console.log(`   POST /api/auth/login`);
  console.log(`   GET  /api/auth/me`);
  console.log(`   GET  /api/polls`);
  console.log(`   GET  /api/polls/:id`);
  console.log(`   POST /api/polls`);
  console.log(`   POST /api/polls/:id/vote`);
});
