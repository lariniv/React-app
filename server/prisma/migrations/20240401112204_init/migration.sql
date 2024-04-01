-- CreateTable
CREATE TABLE "ListActivity" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "listId" TEXT NOT NULL,
    "taskName" TEXT NOT NULL,
    "listName" TEXT,
    "type" "ActivityType" NOT NULL,
    "ownerId" TEXT NOT NULL DEFAULT '1',

    CONSTRAINT "ListActivity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ListActivity" ADD CONSTRAINT "ListActivity_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("id") ON DELETE CASCADE ON UPDATE CASCADE;
