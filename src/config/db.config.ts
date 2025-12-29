import { PrismaClient, Prisma } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg'; // Assuming this is the correct import path
import { config, isDevelopment } from './env.config.js';

const getPrismaLogLevel = () => {
  if (!isDevelopment) {
    return ['warn', 'error'] as Prisma.LogLevel[];
  }
  //개발 환경에서만 추가 로깅 개방
  return ['query', 'info', 'warn', 'error'] as Prisma.LogLevel[];
};

const adapter = new PrismaPg({
  connectionString: config.DATABASE_URL,
});

export const prisma = new PrismaClient({
  adapter,
  log: getPrismaLogLevel(),
});

export async function disconnectDB() {
  try {
    await prisma.$disconnect();
    console.log('📦 Disconnected from the database.');
  } catch (e) {
    console.error('❌ Error disconnecting from the database:', e);
    process.exit(1);
  }
}
