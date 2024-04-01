/*
  Warnings:

  - You are about to drop the column `editedField` on the `Activity` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "editedField",
ADD COLUMN     "edittedField" TEXT;
