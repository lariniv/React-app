/*
  Warnings:

  - You are about to drop the column `title` on the `List` table. All the data in the column will be lost.
  - You are about to drop the `ToDo` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `List` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner_id` to the `List` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TaskPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('MOVE', 'ADD', 'REMOVE', 'EDIT', 'RENAME');

-- DropForeignKey
ALTER TABLE "ToDo" DROP CONSTRAINT "ToDo_listId_fkey";

-- AlterTable
ALTER TABLE "List" DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "owner_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "ToDo";

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "priority" "TaskPriority" NOT NULL,
    "listId" TEXT NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "taskId" TEXT NOT NULL,
    "taskName" TEXT NOT NULL,
    "sourceList" TEXT,
    "targetList" TEXT,
    "listName" TEXT,
    "initialValue" TEXT,
    "changedValue" TEXT,
    "editedField" TEXT,
    "type" "ActivityType" NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
