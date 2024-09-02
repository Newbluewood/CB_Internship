import { sortingFunction, Teams } from "./index.js";
import { GSS, Teams2} from "./grupnaFaza.js";
 
export const teams = Teams2
export const GroupStageStat = GSS

console.log("\n\n\t  // ** ZREB  ** // \n\n")

// fungcija podele timova po rangovima
function Ranks(groupPhase){
let firsts = [];
let secounds = [];
let thirds = [];
let all = []

GroupStageStat.forEach(team => {
    if(team.groupRank === 1){
       firsts.push(team) 
    }
    if (team.groupRank === 2){
        secounds.push(team)
    }
    if (team.groupRank === 3){
        thirds.push(team)
    }

    });
 firsts = sortAndIndex(firsts,1)
 secounds = sortAndIndex(secounds,4)
 thirds = sortAndIndex(thirds,7)

 firsts.forEach(team=> {
    all.push(team)
 })
 secounds.forEach(team=> {
    all.push(team)
 })
 thirds.forEach(team=> {
    all.push(team)
 })

return {
    firstP: firsts,
    secoundP: secounds,
    thirdP: thirds,
    allT: all
}
}

// fungcija za dodelu indeksa 
function sortAndIndex(array,startIndex){
    array.sort((a, b) => {
        const teamA = a;
        const teamB = b;

        if (teamA.points !== teamB.points) {
            return teamB.points - teamA.points;
        }

        // Ako su bodovi isti, koristi kos razliku
        if (teamA.difference > teamB.difference) {
            return teamB.difference - teamA.difference;
        }

        // Ako je i kos razlika ista koristi broj postignutih koseva

        return teamB.scored - teamA.scored;
    });

    const sti = startIndex
    array.forEach((team,index) => {
        team.inex = index + sti;
    });

    return array
}

// fungcija raspodele po sesirima
function Hats(forHats) {
    // sesiri
    const hatD = [];
    const hatE = [];
    const hatF = [];
    const hatG = [];
  
    for (let i = 0; i <= 7; i++) {
      switch (i) {
        case 0:
        case 1:
          hatD.push(forHats.allT[i]);
          break;
        case 2:
        case 3:
          hatE.push(forHats.allT[i]);
          break;
        case 4:
        case 5:
          hatF.push(forHats.allT[i]);
          break;
        case 6:
        case 7:
          hatG.push(forHats.allT[i]);
          break;
        default:
          break;
      }
    }
  
    return {
      HatD: hatD,
      HatE: hatE,
      HatF: hatF,
      HatG: hatG,
    };
  }


const forHats = Ranks(GroupStageStat)
export const sesiri = Hats(forHats)
console.log(" \n Sesir D: ", sesiri.HatD[0].Team, ",", sesiri.HatD[1].Team )
console.log(" \n Sesir E: ", sesiri.HatE[0].Team, ",", sesiri.HatE[1].Team )
console.log(" \n Sesir F: ", sesiri.HatF[0].Team, ",", sesiri.HatF[1].Team )
console.log(" \n Sesir G: ", sesiri.HatG[0].Team, ",", sesiri.HatG[1].Team )
console.log("\n")




console.log("\n // RASPORED UTAKMICA // ")


function KnockOutPhaseMatches(){
let quarterFinalsMatches = []

}