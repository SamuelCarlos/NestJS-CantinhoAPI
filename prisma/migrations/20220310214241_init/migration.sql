/*
  Warnings:

  - You are about to drop the column `idAdmin` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "idAdmin",
ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT true;
