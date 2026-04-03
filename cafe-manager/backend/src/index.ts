import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Import config
import { config } from './config/app';
import { databaseConnect } from './config/database';
import { redisClient } from './config/redis';

// Import middleware
import { errorHandler } from './middleware/errorHandler';
import { rateLimiter } from './middleware/rateLimiter';

// Import routes
import { authRoutes } from './modules/admin/auth.routes';
import { userRoutes } from './modules/admin/user.routes';
import { productRoutes } from './modules/pos/product.routes';
import { orderRoutes } from './modules/pos/order.routes';
import { inventoryRoutes } from './modules/inventory/inventory.routes';

// Import Swagger
import { setupSwagger } from './utils/swagger';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: config.corsOrigin.split(','),
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression
app.use(compression());

// Logging
if (config.nodeEnv === 'development') {
  app.use(morgan('dev'));
}

// Rate limiting
app.use(rateLimiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API Routes
const apiPrefix = config.apiPrefix;

app.use(`${apiPrefix}/auth`, authRoutes);
app.use(`${apiPrefix}/users`, userRoutes);
app.use(`${apiPrefix}/products`, productRoutes);
app.use(`${apiPrefix}/orders`, orderRoutes);
app.use(`${apiPrefix}/inventory`, inventoryRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware
app.use(errorHandler);

// Setup Swagger documentation
setupSwagger(app);

// Database connection
databaseConnect()
  .then(() => {
    console.log('✅ Database connected successfully');
    
    // Redis connection
    redisClient.connect()
      .then(() => {
        console.log('✅ Redis connected successfully');
      })
      .catch((err) => {
        console.error('❌ Redis connection error:', err);
      });
    
    // Start server
    app.listen(config.port, () => {
      console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   ☕ CAFE MANAGER API                                     ║
║                                                           ║
║   Server running on port ${config.port}                      ║
║   Environment: ${config.nodeEnv}                             ║
║   API Prefix: ${apiPrefix}                                 ║
║   Swagger UI: http://localhost:${config.port}/api-docs       ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
      `);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection error:', err);
    process.exit(1);
  });

export default app;
