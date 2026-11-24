-- AlterTable
ALTER TABLE "publishers" ADD COLUMN     "pathPrefixes" TEXT[] DEFAULT ARRAY[]::TEXT[];
