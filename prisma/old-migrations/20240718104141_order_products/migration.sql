/*
  Warnings:

  - Added the required column `shipping` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtotal` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tax` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "shipping" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "subtotal" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "tax" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;
