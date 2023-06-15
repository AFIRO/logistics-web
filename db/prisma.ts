import {  PrismaClient, customer , notification, application_user, application_user_notifications, 
  address , product, customer_order, order_line, shopping_cart, customer_order_order_lines, packaging } from "@prisma/client";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query", "info"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export type { application_user };
export type { application_user_notifications }
export type { notification }
export type { product }
export type { customer_order }
export type { order_line }
export type { address }
export type { shopping_cart }
export type { customer }
export type {customer_order_order_lines}
export type { packaging}
