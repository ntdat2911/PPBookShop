/*
  Warnings:

  - You are about to drop the column `Role` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "Role";

-- CreateTable
CREATE TABLE "Admin" (
    "AdminID" SERIAL NOT NULL,
    "AdminName" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("AdminID")
);
