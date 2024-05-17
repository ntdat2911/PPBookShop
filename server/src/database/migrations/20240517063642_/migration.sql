-- CreateTable
CREATE TABLE "Promotion" (
    "PromotionID" SERIAL NOT NULL,
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
CREATE TABLE "BookPromotion" (
    "id" SERIAL NOT NULL,
    "PromotionID" INTEGER NOT NULL,
    "BookID" INTEGER NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BookPromotion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "CategoryID" SERIAL NOT NULL,
    "CategoryName" TEXT NOT NULL,
    "ParentCategoryID" INTEGER,
    "IsCategoryActive" BOOLEAN NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("CategoryID")
);

-- CreateTable
CREATE TABLE "Book" (
    "BookID" SERIAL NOT NULL,
    "ImageURL" TEXT NOT NULL,
    "BookTitle" TEXT NOT NULL,
    "BookDescription" TEXT NOT NULL,
    "BookPrice" DOUBLE PRECISION NOT NULL,
    "CategoryID" INTEGER NOT NULL,
    "AuthorID" INTEGER NOT NULL,
    "PublishDate" TIMESTAMP(3) NOT NULL,
    "BookQuantity" INTEGER NOT NULL,
    "IsBookActive" BOOLEAN NOT NULL,
    "Rating" DOUBLE PRECISION NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("BookID")
);

-- CreateTable
CREATE TABLE "Review" (
    "ReviewID" SERIAL NOT NULL,
    "BookID" INTEGER NOT NULL,
    "UserID" INTEGER NOT NULL,
    "ReviewTitle" TEXT NOT NULL,
    "Rating" DOUBLE PRECISION NOT NULL,
    "Comment" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("ReviewID")
);

-- CreateTable
CREATE TABLE "Author" (
    "AuthorID" SERIAL NOT NULL,
    "AuthorName" TEXT NOT NULL,
    "Bio" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("AuthorID")
);

-- CreateTable
CREATE TABLE "User" (
    "UserID" SERIAL NOT NULL,
    "ImageURL" TEXT NOT NULL,
    "UserName" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Role" TEXT NOT NULL,
    "IsUserActive" BOOLEAN NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("UserID")
);

-- CreateTable
CREATE TABLE "Order" (
    "OrderID" SERIAL NOT NULL,
    "UserID" INTEGER NOT NULL,
    "TotalPrice" DOUBLE PRECISION NOT NULL,
    "Status" TEXT NOT NULL,
    "ShipID" INTEGER NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("OrderID")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "OrderItemID" SERIAL NOT NULL,
    "OrderID" INTEGER NOT NULL,
    "BookID" INTEGER NOT NULL,
    "ItemQuantity" INTEGER NOT NULL,
    "TotalItemPrice" DOUBLE PRECISION NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("OrderItemID")
);

-- CreateTable
CREATE TABLE "Ship" (
    "ShipID" SERIAL NOT NULL,
    "UserID" INTEGER NOT NULL,
    "Phone" TEXT NOT NULL,
    "ReceiverName" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "IsDefault" BOOLEAN NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ship_pkey" PRIMARY KEY ("ShipID")
);

-- AddForeignKey
ALTER TABLE "BookPromotion" ADD CONSTRAINT "BookPromotion_PromotionID_fkey" FOREIGN KEY ("PromotionID") REFERENCES "Promotion"("PromotionID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookPromotion" ADD CONSTRAINT "BookPromotion_BookID_fkey" FOREIGN KEY ("BookID") REFERENCES "Book"("BookID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_ParentCategoryID_fkey" FOREIGN KEY ("ParentCategoryID") REFERENCES "Category"("CategoryID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_CategoryID_fkey" FOREIGN KEY ("CategoryID") REFERENCES "Category"("CategoryID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_AuthorID_fkey" FOREIGN KEY ("AuthorID") REFERENCES "Author"("AuthorID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_BookID_fkey" FOREIGN KEY ("BookID") REFERENCES "Book"("BookID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_ShipID_fkey" FOREIGN KEY ("ShipID") REFERENCES "Ship"("ShipID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_OrderID_fkey" FOREIGN KEY ("OrderID") REFERENCES "Order"("OrderID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_BookID_fkey" FOREIGN KEY ("BookID") REFERENCES "Book"("BookID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ship" ADD CONSTRAINT "Ship_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;
