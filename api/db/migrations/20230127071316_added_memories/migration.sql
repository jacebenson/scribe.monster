-- CreateTable
CREATE TABLE "Memory" (
    "cuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "vector" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "title" TEXT NOT NULL,

    CONSTRAINT "Memory_pkey" PRIMARY KEY ("cuid")
);
