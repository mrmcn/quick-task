/*
  Warnings:

  - A unique constraint covering the columns `[summary]` on the table `Task` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Task_summary_key" ON "Task"("summary");
