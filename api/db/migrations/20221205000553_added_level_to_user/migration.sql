/*
  Warnings:

  - You are about to drop the column `extensionKey` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "extensionKey",
ADD COLUMN     "level" TEXT DEFAULT 'free';
