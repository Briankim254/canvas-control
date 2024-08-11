-- CreateEnum
CREATE TYPE "verification" AS ENUM ('UNVERIFIED', 'VERIFIED');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "verification" "verification" NOT NULL DEFAULT 'UNVERIFIED';
