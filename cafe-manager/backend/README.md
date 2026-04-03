# Backend API - Cafe Manager

> Backend service for Cafe Manager system using Node.js, Express/NestJS, TypeScript, and PostgreSQL.

## 📁 Cấu trúc thư mục

```
backend/
├── src/
│   ├── modules/
│   │   ├── pos/           # Point of Sale
│   │   │   ├── pos.controller.ts
│   │   │   ├── pos.service.ts
│   │   │   ├── pos.routes.ts
│   │   │   └── models/
│   │   ├── inventory/     # Inventory Management
│   │   ├── accounting/    # Accounting & Finance
│   │   ├── hrm/          # Human Resources
│   │   ├── crm/          # Customer Relationship
│   │   ├── reporting/    # Reports & BI
│   │   └── admin/        # Admin Management
│   ├── config/
│   │   ├── database.ts
│   │   ├── redis.ts
│   │   └── app.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   ├── rbac.ts
│   │   └── errorHandler.ts
│   └── utils/
│       ├── logger.ts
│       ├── helpers.ts
│       └── constants.ts
├── database/
│   └── migrations/
├── tests/
├── .env.example
├── package.json
└── tsconfig.json
```

## 🚀 Cài đặt

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Run database migrations
npm run db:migrate

# Start development server
npm run dev

# Build for production
npm run build
```

## 🔧 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build TypeScript to JavaScript |
| `npm run start` | Start production server |
| `npm run db:migrate` | Run database migrations |
| `npm run db:seed` | Seed database with initial data |
| `npm test` | Run unit tests |
| `npm run lint` | Run ESLint |

## 📦 Environment Variables

Create a `.env` file in the root directory:

```env
# Server
NODE_ENV=development
PORT=3000
API_PREFIX=/api/v1

# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=cafe_manager
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRES_IN=30d

# File Storage (S3/MinIO)
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=us-east-1
AWS_S3_BUCKET=cafe-manager

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=

# Payment Gateways
MOMO_PARTNER_CODE=
MOMO_ACCESS_KEY=
ZALOPAY_APP_ID=
ZALOPAY_KEY1=
VNPAY_TMN_CODE=
VNPAY_HASH_SECRET=
```

## 🔐 Authentication

The API uses JWT-based authentication:

1. Login endpoint returns `accessToken` and `refreshToken`
2. Include `accessToken` in Authorization header: `Bearer <token>`
3. Use refresh token to get new access token when expired

## 📚 API Documentation

Once the server is running, access Swagger UI at:
- Development: `http://localhost:3000/api-docs`
- Production: `https://your-domain.com/api-docs`

## 🏗️ Architecture

### Module Structure

Each module follows a consistent structure:

```typescript
// Example: POS Module
modules/pos/
├── pos.controller.ts      // HTTP request handlers
├── pos.service.ts         // Business logic
├── pos.routes.ts          // Route definitions
├── pos.validator.ts       // Request validation
├── pos.types.ts           // TypeScript types/interfaces
└── models/
    ├── order.model.ts     // Database model
    └── product.model.ts   // Database model
```

### Middleware Chain

```
Request → CORS → RateLimit → Auth → RBAC → Validator → Controller → Service → Response
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- pos.service.test.ts
```

## 📝 Code Style

This project follows:
- **ESLint** for code quality
- **Prettier** for code formatting
- **Conventional Commits** for commit messages

```bash
# Check code style
npm run lint

# Fix auto-fixable issues
npm run lint:fix
```

## 🔒 Security

- HTTPS/TLS encryption
- Password hashing with bcrypt
- SQL injection prevention (parameterized queries)
- XSS protection
- CSRF protection
- Rate limiting
- Input validation

## 📄 License

MIT
