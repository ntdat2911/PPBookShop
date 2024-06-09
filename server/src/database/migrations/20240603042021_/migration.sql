/*
  Warnings:

  - The values [ONLINE_PAYMENT] on the enum `PaymentMethod` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `promotionPromotionID` on the `OrderItem` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PaymentMethod_new" AS ENUM ('PAYPAL', 'COD');
ALTER TABLE "Order" ALTER COLUMN "PaymentMethod" TYPE "PaymentMethod_new" USING ("PaymentMethod"::text::"PaymentMethod_new");
ALTER TYPE "PaymentMethod" RENAME TO "PaymentMethod_old";
ALTER TYPE "PaymentMethod_new" RENAME TO "PaymentMethod";
DROP TYPE "PaymentMethod_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_promotionPromotionID_fkey";

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "promotionPromotionID";
