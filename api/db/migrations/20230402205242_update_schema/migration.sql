-- AlterTable
ALTER TABLE "Memory" ADD COLUMN     "sourceUrl" TEXT,
ADD COLUMN     "type" TEXT DEFAULT 'general';

-- CreateTable
CREATE TABLE "ProceduralMemory" (
    "cuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "procedure" TEXT,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0.20,
    "cost" DOUBLE PRECISION NOT NULL DEFAULT 0.02,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "title" TEXT NOT NULL,
    "source" TEXT,
    "sourceUrl" TEXT,

    CONSTRAINT "ProceduralMemory_pkey" PRIMARY KEY ("cuid")
);
