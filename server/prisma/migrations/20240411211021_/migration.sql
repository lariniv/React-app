/*
  Warnings:

  - Added the required column `boardId` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `boardId` to the `ListActivity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "boardId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ListActivity" ADD COLUMN     "boardId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ListActivity" ADD CONSTRAINT "ListActivity_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;
