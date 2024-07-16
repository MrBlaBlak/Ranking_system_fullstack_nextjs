-- CreateEnum
CREATE TYPE "Map_Name" AS ENUM ('boomtown', 'exo', 'eden', 'drydock', 'angel', 'colony', 'glitch', 'none');

-- CreateEnum
CREATE TYPE "Titan_Name" AS ENUM ('ion', 'tone', 'ronin', 'northstar', 'monarch', 'legion', 'scorch', 'none');

-- CreateTable
CREATE TABLE "gamers" (
    "id" SERIAL NOT NULL,
    "lastTen" VARCHAR(255) NOT NULL,
    "mmr" DOUBLE PRECISION NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "server" VARCHAR(255) NOT NULL,

    CONSTRAINT "gamers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kills_and_caps" (
    "id" SERIAL NOT NULL,
    "caps" INTEGER NOT NULL,
    "kills" INTEGER NOT NULL,
    "titan" "Titan_Name",
    "match_gamer_id" INTEGER NOT NULL,

    CONSTRAINT "kills_and_caps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "match_gamer" (
    "id" SERIAL NOT NULL,
    "gamer_id" INTEGER,
    "match_id" INTEGER,
    "team_id" INTEGER,

    CONSTRAINT "match_gamer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "matches" (
    "id" SERIAL NOT NULL,
    "created" TIMESTAMP(6) NOT NULL,
    "map" "Map_Name" NOT NULL,
    "server" VARCHAR(255) NOT NULL,

    CONSTRAINT "matches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teams" (
    "id" SERIAL NOT NULL,
    "flag_advantage" INTEGER NOT NULL,
    "win_or_loose" INTEGER NOT NULL,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "weapons" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "weapon_class" VARCHAR(255) NOT NULL,
    "near_damage" INTEGER NOT NULL,
    "mid_damage" INTEGER NOT NULL,
    "far_damage" INTEGER NOT NULL,
    "near_distance" INTEGER NOT NULL,
    "mid_distance" INTEGER NOT NULL,
    "far_distance" INTEGER NOT NULL,
    "fire_rate" INTEGER NOT NULL,

    CONSTRAINT "weapons_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UK_f34p42nipgi334fgahcpwc7hu" ON "kills_and_caps"("match_gamer_id");

-- CreateIndex
CREATE INDEX "IDX_1ds5km99di58335h0art5ddsj" ON "match_gamer"("team_id");

-- CreateIndex
CREATE INDEX "IDX_d4u9abhd09u33swxfvswa231k" ON "match_gamer"("gamer_id");

-- CreateIndex
CREATE INDEX "IDX_g8cvpyt5dgciuklm33offk1do" ON "match_gamer"("match_id");

-- AddForeignKey
ALTER TABLE "kills_and_caps" ADD CONSTRAINT "FKtd2tjb6kpg1unyfjxqckingg8" FOREIGN KEY ("match_gamer_id") REFERENCES "match_gamer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "match_gamer" ADD CONSTRAINT "FK1ds5km99di58335h0art5ddsj" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "match_gamer" ADD CONSTRAINT "FKd4u9abhd09u33swxfvswa231k" FOREIGN KEY ("gamer_id") REFERENCES "gamers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "match_gamer" ADD CONSTRAINT "FKg8cvpyt5dgciuklm33offk1do" FOREIGN KEY ("match_id") REFERENCES "matches"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
