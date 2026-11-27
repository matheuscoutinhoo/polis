-- Automatic search of official news (twice a day by default). Each search is
-- recorded in event_ingestion_runs; "lockKey" is "running" while a search is
-- active, so the unique index allows only one at a time across instances.
-- Events record whether they came from the search ("origin") and whether the
-- current publication was made by the automatic checks ("autoPublished").
-- Existing events keep the defaults: editorial origin, human publication.

-- CreateEnum
CREATE TYPE "EventOrigin" AS ENUM ('EDITORIAL', 'AUTOMATIC');

-- CreateEnum
CREATE TYPE "IngestionTrigger" AS ENUM ('SCHEDULE', 'MANUAL', 'CLI');

-- CreateEnum
CREATE TYPE "IngestionStatus" AS ENUM ('RUNNING', 'SUCCESS', 'PARTIAL', 'FAILED', 'SKIPPED');

-- AlterTable
ALTER TABLE "events" ADD COLUMN     "autoPublished" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "origin" "EventOrigin" NOT NULL DEFAULT 'EDITORIAL';

-- CreateTable
CREATE TABLE "event_ingestion_runs" (
    "id" TEXT NOT NULL,
    "trigger" "IngestionTrigger" NOT NULL,
    "status" "IngestionStatus" NOT NULL DEFAULT 'RUNNING',
    "lockKey" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),
    "checked" INTEGER NOT NULL DEFAULT 0,
    "candidates" INTEGER NOT NULL DEFAULT 0,
    "created" INTEGER NOT NULL DEFAULT 0,
    "published" INTEGER NOT NULL DEFAULT 0,
    "drafts" INTEGER NOT NULL DEFAULT 0,
    "summary" TEXT,
    "details" JSONB,

    CONSTRAINT "event_ingestion_runs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "event_ingestion_runs_lockKey_key" ON "event_ingestion_runs"("lockKey");

-- CreateIndex
CREATE INDEX "event_ingestion_runs_startedAt_idx" ON "event_ingestion_runs"("startedAt");