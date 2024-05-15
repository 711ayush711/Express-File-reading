-- CreateTable
CREATE TABLE "File" (
    "sku" TEXT NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("sku")
);
