-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('Mentor', 'Mentee');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "user_email" TEXT NOT NULL,
    "user_hashedpw" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "user_salt" TEXT NOT NULL,
    "user_surname" TEXT NOT NULL,
    "Role" "Roles" NOT NULL,
    "addressId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "address_street" TEXT,
    "address_city" TEXT,
    "address_zip" TEXT,
    "address_county" TEXT,
    "address_country" TEXT NOT NULL,
    "address_raw" TEXT,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expertise" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Expertise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExpertisesOnUsers" (
    "userId" INTEGER NOT NULL,
    "expertiseId" INTEGER NOT NULL,

    CONSTRAINT "ExpertisesOnUsers_pkey" PRIMARY KEY ("expertiseId","userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_user_email_key" ON "User"("user_email");

-- CreateIndex
CREATE UNIQUE INDEX "User_addressId_key" ON "User"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "Expertise_name_key" ON "Expertise"("name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpertisesOnUsers" ADD CONSTRAINT "ExpertisesOnUsers_expertiseId_fkey" FOREIGN KEY ("expertiseId") REFERENCES "Expertise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpertisesOnUsers" ADD CONSTRAINT "ExpertisesOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

