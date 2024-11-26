-- CreateTable
CREATE TABLE "TeamsMembers" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeamsMembers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TeamsMembers" ADD CONSTRAINT "TeamsMembers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamsMembers" ADD CONSTRAINT "TeamsMembers_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
