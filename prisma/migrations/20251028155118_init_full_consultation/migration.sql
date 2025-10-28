-- CreateTable
CREATE TABLE "consultations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "gender" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "height" INTEGER,
    "weight" INTEGER,
    "bmi" REAL,
    "complaint" TEXT NOT NULL,
    "examinations" TEXT,
    "chronicDiseases" TEXT,
    "medications" TEXT,
    "painLevel" INTEGER,
    "additionalNotes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
