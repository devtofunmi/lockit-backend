import { PrismaClient } from '@prisma/client';
// export const prisma = new PrismaClient();

export const prisma = new PrismaClient({
    log: ['query', 'error', 'info', 'warn'],
  });
  

