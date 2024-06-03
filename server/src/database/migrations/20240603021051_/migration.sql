/*
  Warnings:

  - The values [SHIPPED] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [CREDIT_CARD,PAYPAL,BANK_TRANSFER] on the enum `PaymentMethod` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatus_new" AS ENUM ('PENDING', 'COMPLETED', 'SHIPPING', 'CANCELLED', 'PAID');
ALTER TABLE "Order" ALTER COLUMN "Status" TYPE "OrderStatus_new" USING ("Status"::text::"OrderStatus_new");
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "OrderStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "PaymentMethod_new" AS ENUM ('ONLINE_PAYMENT', 'COD');
ALTER TABLE "Order" ALTER COLUMN "PaymentMethod" TYPE "PaymentMethod_new" USING ("PaymentMethod"::text::"PaymentMethod_new");
ALTER TYPE "PaymentMethod" RENAME TO "PaymentMethod_old";
ALTER TYPE "PaymentMethod_new" RENAME TO "PaymentMethod";
DROP TYPE "PaymentMethod_old";
COMMIT;
