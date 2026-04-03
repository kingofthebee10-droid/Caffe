import { PrismaClient } from '@prisma/client';
import { config } from './app';

const prismaClientSingleton = () => {
  return new PrismaClient({
    datasources: {
      db: {
        url: `postgresql://${config.database.user}:${config.database.password}@${config.database.host}:${config.database.port}/${config.database.name}?schema=public`,
      },
    },
    log: config.nodeEnv === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (config.nodeEnv !== 'production') globalThis.prismaGlobal = prisma;

export const databaseConnect = async () => {
  try {
    await prisma.$connect();
    console.log('✅ PostgreSQL connected');
  } catch (error) {
    console.error('❌ PostgreSQL connection failed:', error);
    throw error;
  }
};

export const databaseDisconnect = async () => {
  try {
    await prisma.$disconnect();
    console.log('✅ PostgreSQL disconnected');
  } catch (error) {
    console.error('❌ PostgreSQL disconnect failed:', error);
    throw error;
  }
};

export default prisma;
