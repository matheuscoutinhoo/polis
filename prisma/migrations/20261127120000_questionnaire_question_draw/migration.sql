-- Questionnaire draw: every attempt stores the situations drawn for it (one
-- version of each theme of the bank), in the order shown. Attempts created
-- before the draw keep an empty list, read as the first version of every theme:
-- exactly the fixed set they used, so no backfill is needed.

-- AlterTable
ALTER TABLE "questionnaire_attempts" ADD COLUMN     "questionIds" TEXT[] DEFAULT ARRAY[]::TEXT[];