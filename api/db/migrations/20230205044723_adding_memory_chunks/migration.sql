-- CreateTable
CREATE TABLE "MemoryChunk" (
    "cuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "vector" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "title" TEXT NOT NULL,
    "memoryCuid" TEXT NOT NULL,

    CONSTRAINT "MemoryChunk_pkey" PRIMARY KEY ("cuid")
);

-- CreateIndex
CREATE INDEX "MemoryChunk_memoryCuid_idx" ON "MemoryChunk"("memoryCuid");
