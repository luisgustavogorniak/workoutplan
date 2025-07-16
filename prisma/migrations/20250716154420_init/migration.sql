/*
  Warnings:

  - You are about to drop the column `stripeSubscription` on the `Profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[stripeSubscriptionId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Profile_stripeSubscription_key";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "stripeSubscription",
ADD COLUMN     "stripeSubscriptionId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_stripeSubscriptionId_key" ON "Profile"("stripeSubscriptionId");
