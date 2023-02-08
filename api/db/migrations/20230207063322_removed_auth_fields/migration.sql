/*
  Warnings:

  - You are about to drop the column `hashedPassword` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `resetToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `resetTokenExpiresAt` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "hashedPassword",
DROP COLUMN "resetToken",
DROP COLUMN "resetTokenExpiresAt",
ADD COLUMN     "loginToken" TEXT,
ADD COLUMN     "loginTokenExpiresAt" TIMESTAMP(3);
