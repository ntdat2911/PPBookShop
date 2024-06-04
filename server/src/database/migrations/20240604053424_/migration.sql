/*
  Warnings:

  - You are about to drop the column `BookPromotionID` on the `OrderItem` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_BookPromotionID_fkey";

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "BookPromotionID",
ADD COLUMN     "Discount" DOUBLE PRECISION;
