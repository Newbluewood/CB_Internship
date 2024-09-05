import { Teams1, zaokruzi } from "./formsAndRanks.js";
const teams = Teams1

// funcija odredjivanja verovatnoce pobede tima sa tezinskim faktorima
function calculateWeightedProbability(rank, form) {
    const rankWeight = 0.7;
    const formWeight = 0.3;
    const normalizedRank = 1 /(1 + Math.exp((rank - 5) / 2)) // izmenjen kod zbog bolje simulacije
    const weightedProbability = (rankWeight * normalizedRank) + (formWeight * form); // uticaj ranga i forme tima na verovatnocu pobede
    return weightedProbability
}

// fungcija odredjivanje opsega broja koseva u utakmicama (kazu da je prosek 150 do 180 koseva po utakmici za ovakvo takmicenje)
function generateScore(form) {
    const maxScore = 110 * form; // Maksimalni broj poena je proporcionalan formi
    const baseScore = 70 + Math.random() * (maxScore - 70); // Opseg od 60 do maxScore
    return Math.round(baseScore);
}

// fungcija simulacije meceva
export function simulateMatch(team1, team2) {

    const probTeam1 = calculateWeightedProbability(teams[team1].rank, teams[team1].form);
    const probTeam2 = calculateWeightedProbability(teams[team2].rank, teams[team2].form);
    const prob = probTeam1 + probTeam2;
    const randomValue = Math.random() * prob;
    let winner = undefined
    if(probTeam1 > probTeam2){
        winner = randomValue < probTeam1 ? team1 : team2;
    } else {
        winner = randomValue < probTeam2 ? team2 : team1;
    }
    

    let scoreTeam1 = generateScore(teams[team1].form);
    let scoreTeam2 = generateScore(teams[team2].form);

    // Osiguravanje da pobednik ima veći rezultat
    if (winner === team1 && scoreTeam1 <= scoreTeam2) {
        scoreTeam1 = scoreTeam2 + Math.floor(Math.random() * 10) + 1; // Povećanje rezultata pobednika
    } else if (winner === team2 && scoreTeam2 <= scoreTeam1) {
        scoreTeam2 = scoreTeam1 + Math.floor(Math.random() * 10) + 1; // Povećanje rezultata pobednika
    }

    // Ograničavanje razlike u poenima za timove sa bliskim rangovima
    const rankDifference = Math.abs(teams[team1].rank - teams[team2].rank);
    if (rankDifference <= 1) { // Ako su rangovi bliski
        const maxDifference = 10;
        const actualDifference = Math.abs(scoreTeam1 - scoreTeam2);
        if (actualDifference > maxDifference) {
            if (scoreTeam1 > scoreTeam2) {
                scoreTeam1 = scoreTeam2 + maxDifference;
            } else {
                scoreTeam2 = scoreTeam1 + maxDifference;
            }
        }
    }

    return {
        winner: winner,
        score: ` ${scoreTeam1} : ${scoreTeam2} `,
        scoreDifference: Math.abs(scoreTeam1 - scoreTeam2)
    };
}

// funcija za azuriranje forme timova nakon odigranih utakmica 
export function updateTeamForm(winner, loser, scoreDifference) {
    const formBoost = 0.05 + (scoreDifference * 0.001);
    teams[winner].form += zaokruzi(formBoost,2);
    teams[loser].form -= zaokruzi(formBoost,2);

    // Ograničavanje forme između 0 i 1
    teams[winner].form = Math.min(1, zaokruzi((teams[winner].form),2));
    teams[loser].form = Math.max(0, zaokruzi((teams[loser].form),2));
}
