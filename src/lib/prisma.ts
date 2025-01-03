import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient().$extends({
  query: {
    $allModels: {
      async $allOperations({ model, operation, args, query }) {
        const start = Date.now();
        const result = await query(args);
        const duration = Date.now() - start;
        console.log(`Query ${model}.${operation} took ${duration}ms`);
        return result;
      },
    },
  },
});

export default prisma;
