-- Questionnaire history: completed attempts are kept (the latest one orders the
-- path); at most one attempt in progress per person is now enforced by
-- "inProgressFor", which holds the userId only while the attempt is open.

-- DropIndex
DROP INDEX "questionnaire_attempts_userId_status_key";

-- AlterTable
ALTER TABLE "questionnaire_attempts" ADD COLUMN     "inProgressFor" TEXT;

-- The database derives "inProgressFor" from the status, so every writer keeps it
-- consistent, including the previous release while this one is being deployed.
CREATE FUNCTION questionnaire_attempts_in_progress_for() RETURNS trigger AS $$
BEGIN
  NEW."inProgressFor" := CASE WHEN NEW."status" = 'IN_PROGRESS' THEN NEW."userId" ELSE NULL END;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER questionnaire_attempts_in_progress_for
BEFORE INSERT OR UPDATE ON "questionnaire_attempts"
FOR EACH ROW EXECUTE FUNCTION questionnaire_attempts_in_progress_for();

-- Backfill (the trigger fills the column): the previous unique index allowed one open attempt per person.
UPDATE "questionnaire_attempts" SET "status" = "status" WHERE "status" = 'IN_PROGRESS';

-- AlterTable
ALTER TABLE "source_excerpts" ADD COLUMN     "fromSeed" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "editorial_releases" (
    "version" TEXT NOT NULL,
    "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "editorial_releases_pkey" PRIMARY KEY ("version")
);

-- CreateIndex
CREATE UNIQUE INDEX "questionnaire_attempts_inProgressFor_key" ON "questionnaire_attempts"("inProgressFor");

-- CreateIndex
CREATE INDEX "questionnaire_attempts_userId_status_completedAt_idx" ON "questionnaire_attempts"("userId", "status", "completedAt");