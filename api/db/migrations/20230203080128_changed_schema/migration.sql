/*
  Warnings:

  - You are about to drop the `Prompt` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ScribeRequest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Prompt";

-- DropTable
DROP TABLE "ScribeRequest";

-- CreateTable
CREATE TABLE "Question" (
    "cuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userCuid" TEXT,
    "state" TEXT NOT NULL DEFAULT 'open',
    "text" TEXT NOT NULL,
    "rephrasedText" TEXT,
    "rephrasedTextVector" TEXT,
    "context" TEXT,
    "answer" TEXT,
    "answeredAt" TIMESTAMP(3),
    "answeredBy" TEXT DEFAULT 'stew',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "threadCuid" TEXT NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("cuid")
);

-- CreateTable
CREATE TABLE "Thread" (
    "cuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userCuid" TEXT,

    CONSTRAINT "Thread_pkey" PRIMARY KEY ("cuid")
);

-- CreateTable
CREATE TABLE "Activity" (
    "cuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "queryTokens" INTEGER NOT NULL,
    "responseTokens" INTEGER NOT NULL,
    "modelInstanceCuid" TEXT NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "userCuid" TEXT NOT NULL,
    "action" TEXT NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("cuid")
);

-- CreateIndex
CREATE INDEX "Question_userCuid_idx" ON "Question"("userCuid");

-- CreateIndex
CREATE INDEX "Question_threadCuid_idx" ON "Question"("threadCuid");

-- CreateIndex
CREATE INDEX "Thread_userCuid_idx" ON "Thread"("userCuid");

-- CreateIndex
CREATE INDEX "Activity_modelInstanceCuid_idx" ON "Activity"("modelInstanceCuid");

-- CreateIndex
CREATE INDEX "Activity_userCuid_idx" ON "Activity"("userCuid");
