import { Groups } from "./index.js";
import { Teams1 } from "./formsAndRanks.js";
import { simulateMatch, updateTeamForm } from "./SimulacijaUtakmica.js";
import { drawTable } from "./crtanjeTabele.js";

const groups = Groups
const teams = Teams1
const allgroupMetches = []
const GroupStageStat = []


console.log(" \n\n\t // * GRUPNA FAZA * // \n\n")

// fungija simulacije Grupne faze takmicenja
function simulateGroupStage(group,gr) {
    const groupMetches = []
    let matchCount = 1


    for (let i = 0; i < group.length; i++) {
        for (let j = i + 1; j < group.length; j++) {
            const team1 = group[i].ISOCode;
            const team2 = group[j].ISOCode;

            // domacin/gost
      
            if(matchCount%2 === 0) {

                // Simulacija utakmice
                const matchResult = simulateMatch(team1, team2);

                // Azuriranje forme Timova na osnovu rezultata utakmice
                updateTeamForm(matchResult.winner, matchResult.winner === team1 ? team2 : team1, matchResult.scoreDifference);
                const matchInfo = {}
                matchInfo.home = team1
                matchInfo.Opponent = team2
                matchInfo.result = matchResult.score
                matchInfo.winner = matchResult.winner
                matchInfo.scoreDifference = matchResult.scoreDifference
                groupMetches.push(matchInfo)

                
                // Azuriranje Statistike Timova
                updateTeamStats(team1, team2, matchResult);



            } else if(matchCount%2 != 0){
        
                // Simulacija utakmice
                const matchResult = simulateMatch(team2, team1);

                // Azuriranje forme Timova na osnovu rezultata utakmice
                updateTeamForm(matchResult.winner, matchResult.winner === team1 ? team2 : team1, matchResult.scoreDifference); 
                const matchInfo = {}
                matchInfo.home = team2
                matchInfo.Opponent = team1
                matchInfo.result = matchResult.score
                matchInfo.winner = matchResult.winner
                matchInfo.scoreDifference = matchResult.scoreDifference
                groupMetches.push(matchInfo)

                // Azuriranje Statistike Timova
                updateTeamStats(team2, team1, matchResult);

            }
            matchCount++         
        }
    }


    console.log(" - mecevi prvog kola grupe "+ gr +":\n")
    console.log("\t",groupMetches[0].home, ":",groupMetches[0].Opponent, "(", groupMetches[0].result, ")")
    console.log("\t",groupMetches[5].home, ":",groupMetches[5].Opponent, "(", groupMetches[5].result, ")", "\n")

    console.log(" - mecevi drugog kola grupe "+ gr +":\n")
    console.log("\t",groupMetches[1].home, ":",groupMetches[1].Opponent, "(", groupMetches[1].result, ")")
    console.log("\t",groupMetches[4].home, ":",groupMetches[4].Opponent, "(", groupMetches[4].result, ")", "\n")

    console.log(" - mecevi trceg kola grupe "+ gr +":\n")
    console.log("\t",groupMetches[2].home, ":",groupMetches[2].Opponent, "(", groupMetches[2].result, ")")
    console.log("\t",groupMetches[3].home, ":",groupMetches[3].Opponent, "(", groupMetches[3].result, ")", "\n\n")

    // console.log(groupMetches) // TEST
    groupMetches.forEach( matches => { allgroupMetches.push(matches)})

    // Azuriranje ranga u grupi
    rankTeamsInGroup(group, groupMetches);
}

function updateTeamStats(team1, team2, matchResult) {
    const team1Stats = teams[team1];
    const team2Stats = teams[team2];
    const [score1, score2] = matchResult.score.split(' : ').map(score => Number(score));

    team1Stats.scored += score1;
    team1Stats.conceded += score2;
    team2Stats.scored += score2;
    team2Stats.conceded += score1;

    if (score1 > score2) {
        team1Stats.points += 2;
        team1Stats.wins += 1;
        team2Stats.losses += 1;
    } else if (score1 < score2) {
        team2Stats.points += 2;
        team2Stats.wins += 1;
        team1Stats.losses += 1;
    } else {
        team1Stats.points += 1;
        team2Stats.points += 1;
        team1Stats.draws += 1;
        team2Stats.draws += 1;
    }
}

function rankTeamsInGroup(group, groupMetches) {
    group.sort((a, b) => {
        const teamA = teams[a.ISOCode];
        const teamB = teams[b.ISOCode];

        if (teamA.points !== teamB.points) {
            return teamB.points - teamA.points;
        }

        // Ako su bodovi isti, koristi međusobni susret

        if (teamA.score === teamB.score) {
            groupMetches.forEach(team => {
            if ( team.home === teamA){
                if ( team.Opponent === teamB){
                    if ( teamA === team.winner){
                        return -1
                    } else {
                        return 1
                    } 
                }
            }
            })
        }

        // Ako su bodovi i međusobni susret isti, koristi razliku u poenima
        const goalDifferenceA = teamA.scored - teamA.conceded;
        const goalDifferenceB = teamB.scored - teamB.conceded;
        return goalDifferenceB - goalDifferenceA;
    });

    group.forEach((team, index) => {
        teams[team.ISOCode].groupRank = index + 1;
    });
}


function displayGroupResults(group, gr) {
    const statsOfGroup = []

    //console.log(`\n Grupa: ${gr} - Rank /Points /Wins /Losses /Draws /Scored /Conceded /Goal Difference:`); /* zamenio sam sa crtanje tabele.js */

    group.forEach(team => {
        const stats = teams[team.ISOCode];
        const statsTeam = [stats.groupRank, team.Team, stats.points, stats.wins, stats.losses, stats.scored, stats.conceded, stats.difference = stats.scored - stats.conceded]
        statsOfGroup.push(statsTeam);
        const GroupTeamStat = {};
        GroupTeamStat.group = gr;
        GroupTeamStat.groupRank = stats.groupRank;
        GroupTeamStat.Team = team.Team;
        GroupTeamStat.ISOCode = team.ISOCode;
        GroupTeamStat.points = stats.points;
        GroupTeamStat.difference = stats.difference;
        GroupTeamStat.scored = stats.scored;
        GroupStageStat.push(GroupTeamStat);

        //console.log(`\t ${team.Team} - ${stats.groupRank} /${stats.points} /${stats.wins} /${stats.losses} /${stats.scored} /${stats.conceded} /${stats.scored - stats.conceded}`);
    });
    
    return statsOfGroup;
}

//export function GroupStage (groups) {
    for (let group in groups){
        const groupTeamsInfo = groups[group];

        // Simulacija grupne faze za grupe
        simulateGroupStage(groupTeamsInfo, group);

        const StatsOfGroup = displayGroupResults(groupTeamsInfo, group);

        drawTable(StatsOfGroup, group);

        console.log("");

    }

//}

export const mecevi = allgroupMetches;
export const GSS = GroupStageStat;
export const Teams2 = teams;


