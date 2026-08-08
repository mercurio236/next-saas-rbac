/*
  Warnings:

  - You are about to drop the column `authorid` on the `invites` table. All the data in the column will be lost.
  - You are about to drop the column `organizationId` on the `invites` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email,organization_id]` on the table `invites` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `organization_id` to the `invites` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "invites" DROP CONSTRAINT "invites_authorid_fkey";

-- DropForeignKey
ALTER TABLE "invites" DROP CONSTRAINT "invites_organizationId_fkey";

-- DropIndex
DROP INDEX "invites_email_organizationId_key";

-- AlterTable
ALTER TABLE "invites" DROP COLUMN "authorid",
DROP COLUMN "organizationId",
ADD COLUMN     "author_id" TEXT,
ADD COLUMN     "organization_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "invites_email_organization_id_key" ON "invites"("email", "organization_id");

-- AddForeignKey
ALTER TABLE "invites" ADD CONSTRAINT "invites_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invites" ADD CONSTRAINT "invites_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
