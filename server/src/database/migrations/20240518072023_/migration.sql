/*
  Warnings:

  - The values [CANCELLED] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [CASH_ON_DELIVERY] on the enum `PaymentMethod` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `Address` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Admin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Author` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Book` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `BookPromotion` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `OrderItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Promotion` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Review` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatus_new" AS ENUM ('PENDING', 'COMPLETED', 'SHIPPED');
ALTER TABLE "Order" ALTER COLUMN "Status" TYPE "OrderStatus_new" USING ("Status"::text::"OrderStatus_new");
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "OrderStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "PaymentMethod_new" AS ENUM ('CREDIT_CARD', 'PAYPAL', 'BANK_TRANSFER');
ALTER TABLE "Order" ALTER COLUMN "PaymentMethod" TYPE "PaymentMethod_new" USING ("PaymentMethod"::text::"PaymentMethod_new");
ALTER TYPE "PaymentMethod" RENAME TO "PaymentMethod_old";
ALTER TYPE "PaymentMethod_new" RENAME TO "PaymentMethod";
DROP TYPE "PaymentMethod_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_UserID_fkey";

-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_AuthorBy_fkey";

-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_CategoryID_fkey";

-- DropForeignKey
ALTER TABLE "BookPromotion" DROP CONSTRAINT "BookPromotion_BookID_fkey";

-- DropForeignKey
ALTER TABLE "BookPromotion" DROP CONSTRAINT "BookPromotion_PromotionID_fkey";

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_ParentCategoryID_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_AddressID_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_UserID_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_BookID_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_BookPromotionID_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_OrderID_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_BookID_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_UserID_fkey";

-- DropIndex
DROP INDEX "BookPromotion_PromotionID_BookID_key";

-- AlterTable
ALTER TABLE "Address" DROP CONSTRAINT "Address_pkey",
ALTER COLUMN "AddressID" DROP DEFAULT,
ALTER COLUMN "AddressID" SET DATA TYPE TEXT,
ALTER COLUMN "UserID" SET DATA TYPE TEXT,
ADD CONSTRAINT "Address_pkey" PRIMARY KEY ("AddressID");
DROP SEQUENCE "Address_AddressID_seq";

-- AlterTable
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_pkey",
ALTER COLUMN "AdminID" DROP DEFAULT,
ALTER COLUMN "AdminID" SET DATA TYPE TEXT,
ADD CONSTRAINT "Admin_pkey" PRIMARY KEY ("AdminID");
DROP SEQUENCE "Admin_AdminID_seq";

-- AlterTable
ALTER TABLE "Author" DROP CONSTRAINT "Author_pkey",
ALTER COLUMN "AuthorID" DROP DEFAULT,
ALTER COLUMN "AuthorID" SET DATA TYPE TEXT,
ADD CONSTRAINT "Author_pkey" PRIMARY KEY ("AuthorID");
DROP SEQUENCE "Author_AuthorID_seq";

-- AlterTable
ALTER TABLE "Book" DROP CONSTRAINT "Book_pkey",
ALTER COLUMN "BookID" DROP DEFAULT,
ALTER COLUMN "BookID" SET DATA TYPE TEXT,
ALTER COLUMN "CategoryID" SET DATA TYPE TEXT,
ALTER COLUMN "AuthorBy" SET DATA TYPE TEXT,
ADD CONSTRAINT "Book_pkey" PRIMARY KEY ("BookID");
DROP SEQUENCE "Book_BookID_seq";

-- AlterTable
ALTER TABLE "BookPromotion" DROP CONSTRAINT "BookPromotion_pkey",
ALTER COLUMN "BookPromotionID" DROP DEFAULT,
ALTER COLUMN "BookPromotionID" SET DATA TYPE TEXT,
ALTER COLUMN "PromotionID" SET DATA TYPE TEXT,
ALTER COLUMN "BookID" SET DATA TYPE TEXT,
ADD CONSTRAINT "BookPromotion_pkey" PRIMARY KEY ("BookPromotionID");
DROP SEQUENCE "BookPromotion_BookPromotionID_seq";

-- AlterTable
ALTER TABLE "Category" DROP CONSTRAINT "Category_pkey",
ALTER COLUMN "CategoryID" DROP DEFAULT,
ALTER COLUMN "CategoryID" SET DATA TYPE TEXT,
ALTER COLUMN "ParentCategoryID" SET DATA TYPE TEXT,
ADD CONSTRAINT "Category_pkey" PRIMARY KEY ("CategoryID");
DROP SEQUENCE "Category_CategoryID_seq";

-- AlterTable
ALTER TABLE "Order" DROP CONSTRAINT "Order_pkey",
ALTER COLUMN "OrderID" DROP DEFAULT,
ALTER COLUMN "OrderID" SET DATA TYPE TEXT,
ALTER COLUMN "UserID" SET DATA TYPE TEXT,
ALTER COLUMN "AddressID" SET DATA TYPE TEXT,
ADD CONSTRAINT "Order_pkey" PRIMARY KEY ("OrderID");
DROP SEQUENCE "Order_OrderID_seq";

-- AlterTable
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_pkey",
ADD COLUMN     "promotionPromotionID" TEXT,
ALTER COLUMN "OrderItemID" DROP DEFAULT,
ALTER COLUMN "OrderItemID" SET DATA TYPE TEXT,
ALTER COLUMN "OrderID" SET DATA TYPE TEXT,
ALTER COLUMN "BookID" SET DATA TYPE TEXT,
ALTER COLUMN "BookPromotionID" SET DATA TYPE TEXT,
ADD CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("OrderItemID");
DROP SEQUENCE "OrderItem_OrderItemID_seq";

-- AlterTable
ALTER TABLE "Promotion" DROP CONSTRAINT "Promotion_pkey",
ALTER COLUMN "PromotionID" DROP DEFAULT,
ALTER COLUMN "PromotionID" SET DATA TYPE TEXT,
ADD CONSTRAINT "Promotion_pkey" PRIMARY KEY ("PromotionID");
DROP SEQUENCE "Promotion_PromotionID_seq";

-- AlterTable
ALTER TABLE "Review" DROP CONSTRAINT "Review_pkey",
ALTER COLUMN "ReviewID" DROP DEFAULT,
ALTER COLUMN "ReviewID" SET DATA TYPE TEXT,
ALTER COLUMN "BookID" SET DATA TYPE TEXT,
ALTER COLUMN "UserID" SET DATA TYPE TEXT,
ADD CONSTRAINT "Review_pkey" PRIMARY KEY ("ReviewID");
DROP SEQUENCE "Review_ReviewID_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "UserID" DROP DEFAULT,
ALTER COLUMN "UserID" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("UserID");
DROP SEQUENCE "User_UserID_seq";

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_CategoryID_fkey" FOREIGN KEY ("CategoryID") REFERENCES "Category"("CategoryID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_AuthorBy_fkey" FOREIGN KEY ("AuthorBy") REFERENCES "Author"("AuthorID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_BookID_fkey" FOREIGN KEY ("BookID") REFERENCES "Book"("BookID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_AddressID_fkey" FOREIGN KEY ("AddressID") REFERENCES "Address"("AddressID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_OrderID_fkey" FOREIGN KEY ("OrderID") REFERENCES "Order"("OrderID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_BookID_fkey" FOREIGN KEY ("BookID") REFERENCES "Book"("BookID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_BookPromotionID_fkey" FOREIGN KEY ("BookPromotionID") REFERENCES "BookPromotion"("BookPromotionID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_promotionPromotionID_fkey" FOREIGN KEY ("promotionPromotionID") REFERENCES "Promotion"("PromotionID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookPromotion" ADD CONSTRAINT "BookPromotion_PromotionID_fkey" FOREIGN KEY ("PromotionID") REFERENCES "Promotion"("PromotionID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookPromotion" ADD CONSTRAINT "BookPromotion_BookID_fkey" FOREIGN KEY ("BookID") REFERENCES "Book"("BookID") ON DELETE RESTRICT ON UPDATE CASCADE;
