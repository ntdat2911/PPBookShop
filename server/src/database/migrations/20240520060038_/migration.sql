-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'COMPLETED', 'SHIPPED');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CREDIT_CARD', 'PAYPAL', 'BANK_TRANSFER');

-- CreateTable
CREATE TABLE "Promotion" (
    "PromotionID" TEXT NOT NULL,
    "PromotionName" TEXT NOT NULL,
    "DiscountPercent" DOUBLE PRECISION NOT NULL,
    "DiscountQuantity" INTEGER NOT NULL,
    "ExpiredDate" TIMESTAMP(3) NOT NULL,
    "IsAvailable" BOOLEAN NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Promotion_pkey" PRIMARY KEY ("PromotionID")
);

-- CreateTable
CREATE TABLE "Category" (
    "CategoryID" TEXT NOT NULL,
    "CategoryName" TEXT NOT NULL,
    "ParentCategoryID" TEXT,
    "IsCategoryActive" BOOLEAN NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("CategoryID")
);

-- CreateTable
CREATE TABLE "Author" (
    "AuthorID" TEXT NOT NULL,
    "AuthorName" TEXT NOT NULL,
    "Bio" TEXT NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("AuthorID")
);

-- CreateTable
CREATE TABLE "Book" (
    "BookID" TEXT NOT NULL,
    "ImageURL" TEXT NOT NULL,
    "BookTitle" TEXT NOT NULL,
    "BookDescription" TEXT NOT NULL,
    "BookPrice" DOUBLE PRECISION NOT NULL,
    "CategoryID" TEXT NOT NULL,
    "AuthorBy" TEXT NOT NULL,
    "PublishDate" TIMESTAMP(3) NOT NULL,
    "IsBookActive" BOOLEAN NOT NULL,
    "IsOutOfStock" BOOLEAN NOT NULL,
    "Rating" DOUBLE PRECISION NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("BookID")
);

-- CreateTable
CREATE TABLE "User" (
    "UserID" TEXT NOT NULL,
    "ImageURL" TEXT,
    "UserName" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "IsUserActive" BOOLEAN NOT NULL,
    "IsEmailConfirmed" BOOLEAN NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("UserID")
);

-- CreateTable
CREATE TABLE "Review" (
    "ReviewID" TEXT NOT NULL,
    "BookID" TEXT NOT NULL,
    "UserID" TEXT NOT NULL,
    "ReviewTitle" TEXT NOT NULL,
    "Rating" DOUBLE PRECISION NOT NULL,
    "Comment" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("ReviewID")
);

-- CreateTable
CREATE TABLE "Admin" (
    "AdminID" TEXT NOT NULL,
    "AdminName" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Email" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("AdminID")
);

-- CreateTable
CREATE TABLE "Address" (
    "AddressID" TEXT NOT NULL,
    "UserID" TEXT NOT NULL,
    "Phone" TEXT NOT NULL,
    "ReceiverName" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "IsDefault" BOOLEAN NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("AddressID")
);

-- CreateTable
CREATE TABLE "Order" (
    "OrderID" TEXT NOT NULL,
    "UserID" TEXT NOT NULL,
    "TotalPrice" DOUBLE PRECISION NOT NULL,
    "Status" "OrderStatus" NOT NULL,
    "AddressID" TEXT NOT NULL,
    "PaymentMethod" "PaymentMethod" NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("OrderID")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "OrderItemID" TEXT NOT NULL,
    "OrderID" TEXT NOT NULL,
    "BookID" TEXT NOT NULL,
    "ItemQuantity" INTEGER NOT NULL,
    "BookPromotionID" TEXT,
    "UnitItemPrice" DOUBLE PRECISION NOT NULL,
    "TotalItemPrice" DOUBLE PRECISION NOT NULL,
    "promotionPromotionID" TEXT,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("OrderItemID")
);

-- CreateTable
CREATE TABLE "BookPromotion" (
    "BookPromotionID" TEXT NOT NULL,
    "PromotionID" TEXT NOT NULL,
    "BookID" TEXT NOT NULL,

    CONSTRAINT "BookPromotion_pkey" PRIMARY KEY ("BookPromotionID")
);

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
