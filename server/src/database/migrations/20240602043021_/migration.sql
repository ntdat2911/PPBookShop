-- CreateTable
CREATE TABLE "Cart" (
    "CartID" TEXT NOT NULL,
    "UserID" TEXT NOT NULL,
    "CartDetail" JSONB NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("CartID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cart_UserID_key" ON "Cart"("UserID");

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE CASCADE;
