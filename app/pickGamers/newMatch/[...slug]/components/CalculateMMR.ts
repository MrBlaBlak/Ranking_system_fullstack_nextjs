import React from 'react';
import {Gamer} from '../../../components/PickGamersBar';
import {FormValues} from './DisplayTeams'
import {GamerMatchStats} from "./DisplayTeams";
// FormValues = {
//     team1: Team[];
//     team2: Team[];
//     mapPlayed: string;
//     suddenDeath: boolean;
//     suddenDeathWhoWon: string;
//     server: string;
//     [key: string]: Team[] | string | boolean;
// };
export default async function CalculateMMR(formValues:FormValues) {


        const server = formValues.server;
        const suddenDeath = formValues.suddenDeath;
        const suddenDeathWhoWon = formValues.suddenDeathWhoWon;
        const team1gamers = formValues.team1Stats;
        const team2gamers = formValues.team2Stats;
        const mapPlayed = formValues.mapPlayed;
        console.log(formValues);

        let team1flagsTotal = 0;
        let team2flagsTotal = 0;
        let whoWon = 0;
        let streak = 0;
        let streak2 = 0;

        // Calculate total flags for each team
        for (let i = 0; i < 5; i++) {
            team1flagsTotal += +(team1gamers[i].flags);
            team2flagsTotal += +(team2gamers[i].flags);
        }

        // Determine the winner based on flag count
        if (team1flagsTotal > team2flagsTotal) {
            whoWon = 1;
        } else if (team1flagsTotal < team2flagsTotal) {
            whoWon = 2;
        } else {
            if (!suddenDeathWhoWon) {
                // res.status(200).json({team1: team1gamers, team2: team2gamers, server});
                return;
            } else if (suddenDeathWhoWon === 'team1') {
                whoWon = 1;
            } else if (suddenDeathWhoWon === 'team2') {
                whoWon = 2;
            }
        }

    }

// public String updateScores(GamersMatchStatsDTO gamersMatchStatsDTO, Model model) {
//
//     String server = gamersMatchStatsDTO.getServer();
//     boolean suddenDeath = gamersMatchStatsDTO.isSuddenDeath();
//     String suddenDeathWhoWon = gamersMatchStatsDTO.getSuddenDeathWhoWon();
//     String[] sTeam1titans = gamersMatchStatsDTO.getTeam1titans();
//     String[] sTeam2titans = gamersMatchStatsDTO.getTeam2titans();
//     int[] team1gamersId = gamersMatchStatsDTO.getTeam1gamersId();
//     int[] team1elims = gamersMatchStatsDTO.getTeam1elims();
//     int[] team1flags = gamersMatchStatsDTO.getTeam1flags();
//     int[] team2gamersId = gamersMatchStatsDTO.getTeam2gamersId();
//     int[] team2elims = gamersMatchStatsDTO.getTeam2elims();
//     int[] team2flags = gamersMatchStatsDTO.getTeam2flags();
//     String mapPlayed = gamersMatchStatsDTO.getMapPlayed();
//     System.out.println(gamersMatchStatsDTO);
//     int team1flagsTotal = 0, team2flagsTotal = 0, whoWon = 0, streak = 0, streak2 = 0;
//     /*
//      team that scored more flags wins the game; whoWon = 1 -> team 1 won; whoWon = 2 -> team 2 won, suddenDeath is special case when the time
//      ends and both teams have equal flags amount -> last one standing is the winner
//      */
//     for (int i = 0; i < 5; i++) {
//         team1flagsTotal += team1flags[i];
//         team2flagsTotal += team2flags[i];
//     }
//     if (team1flagsTotal > team2flagsTotal) {
//         whoWon = 1;
//     } else if (team1flagsTotal < team2flagsTotal) {
//         whoWon = 2;
//     } else {
//         if (suddenDeathWhoWon==null) {
//             model.addAttribute("team1", team1gamers);
//             model.addAttribute("team2", team2gamers);
//             model.addAttribute("server", server);
//             return "gamer/teamsScores";
//         }
//         else if (suddenDeathWhoWon.equals("team1")) {
//             whoWon = 1;
//         }
//         else if (suddenDeathWhoWon.equals("team2")) {
//             whoWon = 2;
//         }
//
//     }
//     //add match to database
//     Match match = new Match();
//     match.setMap(Match.Map_Name.valueOf(mapPlayed));
//     match.setServer(server);
//     matchRepository.save(match);
//     //add teams to database
//     Team team1 = new Team();
//     Team team2 = new Team();
//     team1.setFlagAdvantage(team1flagsTotal - team2flagsTotal);
//     team2.setFlagAdvantage(team2flagsTotal - team1flagsTotal);
//
//     if (whoWon == 1) {
//         team1.setWinOrLoose(1);
//         team2.setWinOrLoose(0);
//     }
//     if (whoWon == 2) {
//         team1.setWinOrLoose(0);
//         team2.setWinOrLoose(1);
//     }
//     teamRepository.save(team1);
//     teamRepository.save(team2);
//     //change players mmr
//     for (int i = 0; i < 5; i++) {
//         Optional<Gamer> optionalGamer = gamerRepository.findById(team1gamersId[i]);
//
//         if (optionalGamer.isPresent()) {
//             team1gamers[i] = optionalGamer.get();
//         } else {
//             return "redirect:/pickTeams";
//         }
//         Optional<Gamer> optionalGamer2 = gamerRepository.findById(team2gamersId[i]);
//
//         if (optionalGamer2.isPresent()) {
//             team2gamers[i] = optionalGamer.get();
//         } else {
//             return "redirect:/pickTeams";
//         }
//         //lastTen is the binary representation of last 10 games where 0 represents a loss and 1 represents a win - so e.g 1011 is: win loss win win
//         int countDown = Integer.parseInt(team1gamers[i].getLastTen(), 2);
//         int countDown2 = Integer.parseInt(team2gamers[i].getLastTen(), 2);
//
//         for (int a = 0; a < 10; a++) {
//             if ((countDown & 1) == 1) streak++;
//             countDown = countDown >> 1;
//             if ((countDown2 & 1) == 1) streak2++;
//             countDown2 = countDown2 >> 1;
//         }
//         //apply bonus from last 10 winrate
//         double points = 0, points2 = 0;
//         if ((streak == 7 || streak == 8) && whoWon == 1) points = 1.2d;
//     else if ((streak == 2 || streak == 3) && whoWon == 2) points = -1.2d;
//     else if (streak > 1 && whoWon == 2) points = -1;
//         else if (streak >= 9 && whoWon == 1) points = 1.5d;
//     else if (streak <= 1 && whoWon == 2) points = -1.5d;
//     else if (streak < 9 && whoWon == 1) points = 1;
//
//         if ((streak2 == 7 || streak2 == 8) && whoWon == 2) points2 = 1.2d;
//     else if ((streak2 == 2 || streak2 == 3) && whoWon == 1) points2 = -1.2d;
//     else if (streak2 > 1 && whoWon == 1) points2 = -1;
//         else if (streak2 >= 9 && whoWon == 2) points2 = 1.5d;
//     else if (streak2 <= 1 && whoWon == 1) points2 = -1.5d;
//     else if (streak2 < 9 && whoWon == 2) points2 = 1;
//
//         //apply bonus from flag advantage
//         if (whoWon == 1) {
//             points = points + (team1.getFlagAdvantage() / 5.0d) - 0.2d;
//             points2 = points2 + (team2.getFlagAdvantage() / 5.0d) + 0.2d;
//             //change score if suddenDeath
//             if (suddenDeath) {
//                 points = 0.5d;
//                 points2 = -0.5d;
//                 //update last ten; suddenDeath result is not counted neither as win or loss for last 10
//             } else {
//                 team1gamers[i].setLastTen(Integer.toBinaryString((Integer.parseInt(team1gamers[i].getLastTen(), 2) >> 1) | 512));
//                 team2gamers[i].setLastTen(Integer.toBinaryString(Integer.parseInt(team2gamers[i].getLastTen(), 2) >> 1));
//             }
//         }
//         if (whoWon == 2) {
//             points2 = points2 + team2.getFlagAdvantage() / 5.0d - 0.2d;
//             points = points + team1.getFlagAdvantage() / 5.0d + 0.2d;
//             //change score if suddenDeath
//             if (suddenDeath) {
//                 points = -0.5d;
//                 points2 = 0.5d;
//                 //update last ten; suddenDeath result is not counted neither as win or loss for last 10
//             } else {
//                 team1gamers[i].setLastTen(Integer.toBinaryString(Integer.parseInt(team1gamers[i].getLastTen(), 2) >> 1));
//                 team2gamers[i].setLastTen(Integer.toBinaryString((Integer.parseInt(team2gamers[i].getLastTen(), 2) >> 1) | 512));
//             }
//         }
//         team1gamers[i].setMmr(Math.round((team1gamers[i].getMmr() + points) * 10) / 10d);
//         team2gamers[i].setMmr(Math.round((team2gamers[i].getMmr() + points2) * 10) / 10d);
//         //update players in database
//         gamerRepository.save(team1gamers[i]);
//         gamerRepository.save(team2gamers[i]);
//         streak = 0;
//         streak2 = 0;
//     }
//     //save matchGamers and killsAndCapsStats in database
//     for (int i = 0; i < 5; i++) {
//         MatchGamer matchGamer1 = new MatchGamer();
//         MatchGamer matchGamer2 = new MatchGamer();
//
//         matchGamer1.setGamer(team1gamers[i]);
//         matchGamer1.setMatch(match);
//         matchGamer1.setTeam(team1);
//         matchGamer2.setGamer(team2gamers[i]);
//         matchGamer2.setMatch(match);
//         matchGamer2.setTeam(team2);
//
//         matchGamerRepository.save(matchGamer1);
//         matchGamerRepository.save(matchGamer2);
//
//         KillsAndCaps killsAndCaps1 = new KillsAndCaps();
//         KillsAndCaps killsAndCaps2 = new KillsAndCaps();
//
//         killsAndCaps1.setKills(team1elims[i]);
//         killsAndCaps1.setCaps(team1flags[i]);
//         killsAndCaps1.setTitan(KillsAndCaps.Titan_Name.valueOf(sTeam1titans[i]));
//         killsAndCaps1.setMatchGamer(matchGamer1);
//
//         killsAndCaps2.setKills(team2elims[i]);
//         killsAndCaps2.setCaps(team2flags[i]);
//         killsAndCaps2.setTitan(KillsAndCaps.Titan_Name.valueOf(sTeam2titans[i]));
//         killsAndCaps2.setMatchGamer(matchGamer2);
//
//         killsAndCapsRepository.save(killsAndCaps1);
//         killsAndCapsRepository.save(killsAndCaps2);
//     }
//     model.addAttribute("team1", team1gamers);
//     model.addAttribute("team2", team2gamers);
//     model.addAttribute("server", server);
//     return "gamer/teamsScores";
// }