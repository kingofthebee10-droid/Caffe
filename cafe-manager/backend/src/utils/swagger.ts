import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import { config } from '../config/app';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Cafe Manager API',
      version: '1.0.0',
      description:
        'Hệ thống quản lý quán cafe toàn diện - Comprehensive Cafe Management System\n\n' +
        '## Các module chính:\n' +
        '- **POS** - Bán hàng, quản lý đơn hàng\n' +
        '- **Inventory** - Quản lý kho, nguyên vật liệu\n' +
        '- **Accounting** - Kế toán, tài chính\n' +
        '- **HRM** - Nhân sự, chấm công, tính lương\n' +
        '- **CRM** - Quản lý khách hàng, tích điểm\n' +
        '- **Reporting** - Báo cáo, BI\n\n' +
        '## Authentication\n' +
        'Sử dụng Bearer token trong header:\n' +
        '```\n' +
        'Authorization: Bearer <your_token>\n' +
        '```',
      contact: {
        name: 'Cafe Manager Team',
        email: 'support@cafemanager.vn',
      },
    },
    servers: [
      {
        url: `http://localhost:${config.port}${config.apiPrefix}`,
        description: 'Development server',
      },
      {
        url: '/api/v1',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            email: { type: 'string', format: 'email' },
            fullName: { type: 'string' },
            phone: { type: 'string' },
            role: {
              type: 'string',
              enum: ['owner', 'manager', 'cashier', 'barista', 'accountant', 'inventory'],
            },
            avatar: { type: 'string', format: 'uri' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Product: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            category: { type: 'string' },
            basePrice: { type: 'number' },
            costPrice: { type: 'number' },
            imageUrl: { type: 'string', format: 'uri' },
            isActive: { type: 'boolean' },
          },
        },
        Order: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            orderCode: { type: 'string' },
            tableId: { type: 'string', format: 'uuid', nullable: true },
            cashierId: { type: 'string', format: 'uuid' },
            status: {
              type: 'string',
              enum: ['pending', 'preparing', 'ready', 'completed', 'cancelled'],
            },
            total: { type: 'number' },
            discount: { type: 'number' },
            items: {
              type: 'array',
              items: { $ref: '#/components/schemas/OrderItem' },
            },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        OrderItem: {
          type: 'object',
          properties: {
            productId: { type: 'string', format: 'uuid' },
            productName: { type: 'string' },
            quantity: { type: 'integer' },
            unitPrice: { type: 'number' },
            note: { type: 'string', nullable: true },
          },
        },
        InventoryItem: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            sku: { type: 'string' },
            quantity: { type: 'number' },
            unit: { type: 'string' },
            minQuantity: { type: 'number' },
            expiryDate: { type: 'string', format: 'date', nullable: true },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/modules/**/*.routes.ts'], // Path to the API docs
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(specs, {
      explorer: true,
      customCss: '.swagger-ui .topbar { display: none }',
      customSiteTitle: 'Cafe Manager API Docs',
    })
  );
};
