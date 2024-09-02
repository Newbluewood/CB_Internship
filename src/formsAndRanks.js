import { Teams } from "./index.js";
import { Exibitions } from "./index.js";

const teams = Teams
const exibitions = Exibitions

export function zaokruzi(broj, decimale){
    const zaokruzenString = broj.toFixed(decimale)
    const zaokruzenBroj = Number(zaokruzenString)
    return zaokruzenBroj
}

// Funkcija za postavljanje početne forme timova
function setInitialForms(teams) {
    for (let team in teams) {
        let initialForm = 0.7 - (teams[team].rank - 1) * 0.005;
        teams[team].form = zaokruzi(initialForm,2);
    }
}

// fungcija za azuriranje forme
function updateTeamForm(winner, loser, scoreDifference) {
    let formBoost = 0.03 + (scoreDifference * 0.001);
    formBoost = zaokruzi(formBoost,2);

    if (teams[winner] === undefined) {
        teams[loser].form -= zaokruzi(formBoost,2);
    } else {
        teams[winner].form += zaokruzi(formBoost,2);
        teams[loser].form -= zaokruzi(formBoost,2);
        // Ograničavanje forme između 0 i 1
        teams[winner].form = Math.min(1, zaokruzi((teams[winner].form),2));
        teams[loser].form = Math.max(0, zaokruzi((teams[loser].form),2));
    }

}

let Duels = []

// fungcija provere ponovljenih susreta iz exibition.json
function haveTeamsMet(team1, team2, Duels) {
    Duels.forEach (duel => {
        if( duel[0] === team2 && duel[1] === team1){ 
            // console.log("---","sreli su se", duel[0],duel[1])    
            return true;
        } 
            return false;
    })
  }


// funkcija zahteva za ažuriranje forme timova na osnovu rezultata pripremnih utakmica
function updateFormsFromExibitions(exibitions) {   
    for (const team in exibitions) {
        exibitions[team].forEach(match => {
            const opponent = match.Opponent;
            const duel = [team,opponent]
            Duels.push(duel)
            const wasMet = haveTeamsMet(team,opponent,Duels)
            if (wasMet === false){
                const [score1, score2] = match.Result.split('-').map(Number);
                const winner = score1 > score2 ? team : opponent;
                const loser = score1 > score2 ? opponent : team;
                const scoreDifference = Math.abs(score1 - score2);
                updateTeamForm(winner, loser, scoreDifference);   
            } 
        });
    }
}


// Postavljanje početne forme timova
setInitialForms(teams);

// Ažuriranje forme timova na osnovu pripremnih utakmica
updateFormsFromExibitions(exibitions);
// console.log("\n Tabela Timova: ", teams);

export const Teams1 = teams

