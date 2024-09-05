import { simulateMatch } from "./SimulacijaUtakmica.js";
import { mecevi } from "./grupnaFaza.js";
import { sesiri } from "./Zreb.js";


console.log(" \n\n\t  // ***  ELIMINACIONA FAZA  *** // \n\n")

export const hats = sesiri;
let matches = mecevi;


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
function haveTeamsMetBefore(team1, team2, matches) {
  return matches.some(match => 
    (match.home === team1 && match.Opponent === team2) || 
    (match.home === team2 && match.Opponent === team1)
  );
 }
  
function createQuarterfinals(hats, matches) {
  let hatD = [...hats.HatD];
  let hatE = [...hats.HatE];
  let hatF = [...hats.HatF];
  let hatG = [...hats.HatG];
  
  shuffleArray(hatD);
  shuffleArray(hatE);
  shuffleArray(hatF);
  shuffleArray(hatG);
  
  
  
  // Formiranje parova četvrtfinala

  let quarterfinals = [];

  //- IZMENJEN DEO KODA NAKON PRIMECENE GRESKE

  // Fungcie za proveru uslova da li su se paroovi sastajali u grupi i kreiranje parova cetvrtfinala
  function canTeamsPlay(team1, team2) {
    return team1.group !== team2.group && !haveTeamsMetBefore(team1.ISOCode, team2.ISOCode, matches);
  }
  
  function createQuarterfinals(hat1, hat2, matches) {
    let attempts = 0;
    let validPairFound = false;
    
      while (attempts < 3 && !validPairFound) {
        let pair1 = null;
        let pair2 = null;
    
          // Prvi pokušaj
          if (canTeamsPlay(hat1[0], hat2[0]) && canTeamsPlay(hat1[1], hat2[1])) {
              pair1 = { team1: hat1[0], team2: hat2[0] };
              pair2 = { team1: hat1[1], team2: hat2[1] };
              validPairFound = true;
          }
          // Drugi pokušaj
          else if (canTeamsPlay(hat1[0], hat2[1]) && canTeamsPlay(hat1[1], hat2[0])) {
              pair1 = { team1: hat1[0], team2: hat2[1] };
              pair2 = { team1: hat1[1], team2: hat2[0] };
              validPairFound = true;
          }
    
          if (validPairFound) {
              quarterfinals.push(pair1);
              quarterfinals.push(pair2);
          } else {
              attempts++;
          }
        }
  }
  
  // Provi za hatD i hatG
  createQuarterfinals(hatD, hatG, matches);
  
  // Parovi za hatE i hatF
  createQuarterfinals(hatE, hatF, matches);


  //- IZBACEN DEO KODA NAKON PRIMECENE GRESKE

   /* for (let i = 0; i < hatD.length; i++) {
      let teamD = hatD[i];
      let teamG = hatG.find(team => team.group !== teamD.group && !haveTeamsMetBefore(teamD.ISOCode, team.ISOCode, matches));
      
      if (teamG) {
        quarterfinals.push({ team1: teamD, team2: teamG });
        hatG = hatG.filter(team => team !== teamG);
      }
    }
  
    for (let i = 0; i < hatE.length; i++) {
      let teamE = hatE[i];
      let teamF = hatF.find(team => team.group !== teamE.group && !haveTeamsMetBefore(teamE.ISOCode, team.ISOCode, matches));
      if (teamF) {
        quarterfinals.push({ team1: teamE, team2: teamF });
        hatF = hatF.filter(team => team !== teamF);
      }
    }*/

    console.log(" * Parovi CETVRTFINALA : \n\n")
    for(let parovi of quarterfinals){
      console.log( " - -- - ", parovi.team1.Team, ",", parovi.team2.Team )
   }
   console.log("\n\n")
   
   // - AKO SLUCAJNO NEMA PAROVA JAVLJA GRESKU
   if(quarterfinals.length<4){
    console.log( "\t\t\t\t GRESKA: /// !!!! Nema dovoljno parova za formiranje cetvrtfinala ! !!! //// GRESKA \n\t PONOVI SIMULACIJU !\n\n")
    return
   }

    return quarterfinals;
  }
  
  // Fungcija formiranja parova polufinala
  function createSemifinals(quarterfinals) {
    let semifinals = [];
    let count = 0;
  
    for (let parovi of quarterfinals) {
      const team1 = parovi.team1.ISOCode;
      const team2 = parovi.team2.ISOCode;
      const matchResult = simulateMatch(team1, team2);
      let winner;

      console.log("\t Utakmica", count+1, ": ", team1, ":", team2, " - (", matchResult.score, ")\n" )
  
      if (matchResult.winner === team1) {
        winner = parovi.team1;
      } else {
        winner = parovi.team2;
      }
  
      if (count % 2 === 0) {
        semifinals.push({ team1: winner });
      } else {
        semifinals[semifinals.length - 1].team2 = winner;
      }
  
      count++;
    }

    console.log("\n * Parovi POLUFINALA : \n\n");
    for(let parovi of semifinals){
      console.log( " - -- - ", parovi.team1.Team, ",", parovi.team2.Team );
   }
    console.log("\n\n")
  
    return semifinals;
  }
  

  // fungcija formiranja parova finala
  function createFinals(semifinals) {

    let finals = [];
    let thirdPlaceMatch = [];
    let count = 0;
  
    for (let parovi of semifinals) {
      const team1 = parovi.team1.ISOCode;
      const team2 = parovi.team2.ISOCode;
      const matchResult = simulateMatch(team1, team2);
      let winner, loser;

      console.log("\t Utakmica", count+1, ": ", team1, ":", team2, " - (", matchResult.score, ")\n" );
  
      if (matchResult.winner === team1) {
        winner = parovi.team1;
        loser = parovi.team2;
      } else {
        winner = parovi.team2;
        loser = parovi.team1;
      }
  
      finals.push({ team1: winner });
      thirdPlaceMatch.push({ team1: loser });

      count++
    }
  
    // Formiranje parova za finale i treće mesto
    finals[0].team2 = finals[1].team1;
    thirdPlaceMatch[0].team2 = thirdPlaceMatch[1].team1;
  
    return {
      final: finals[0],
      thirdPlace: thirdPlaceMatch[0]
    };
  }
  
  // funcija meceva za medalje
  function Medals(finalsM){

    console.log("\n\n\n\t // ****  UTAKMICE ZA MEDALJE  **** // \n\n")
    const Final = finalsM.final;
    const thirdPlaceMatch = finalsM.thirdPlace;

    console.log("\n\t Utakmica za 3. Mesto: \n");

    const team3 = thirdPlaceMatch.team1.ISOCode;
    const team4 = thirdPlaceMatch.team2.ISOCode;
    const matchResult1 = simulateMatch(team3, team4);
    let bronse;
    if (matchResult1.winner === team3) {
      bronse = thirdPlaceMatch.team1.Team;
    } else {
      bronse = thirdPlaceMatch.team2.Team;
    }
    
    console.log("\t  -- >  ", team3, ":", team4, " - (", matchResult1.score, ")\n" );


    console.log("\n\t Utakmica FINALA !!!  \n");

    const team1 = Final.team1.ISOCode;
    const team2 = Final.team2.ISOCode;
    const matchResult = simulateMatch(team1, team2);
    let gold, silver
    console.log("\t  -- >  ", team1, ":", team2, " - (", matchResult.score, ")\n" );
    if (matchResult.winner === team1) {
      gold = Final.team1.Team;
      silver = Final.team2.Team;
    } else {
      gold = Final.team2.Team;
      silver = Final.team1.Team;
    }


    console.log("\n\t // *  * * *  *    OSVOJENE MEDALJE !!!    *  * * *  * // \n\n")
    console.log("")
    console.log("\t\t\t ZLATNA MEDALJA - 1. mesto : ", gold , " ! \n" )
    console.log("\t\t\t SREBRNA MEDALJA - 2. mesto : ", silver , " ! \n" )
    console.log("\t\t\t BRONZANA MEDALJA - 3. mesto : ", bronse , " ! \n" )
  }
  
  
  
  export let quarterfinals = createQuarterfinals(hats, matches);
  export let semifinals = createSemifinals(quarterfinals);
  export let finalsM = createFinals(semifinals);
  export let medals = Medals(finalsM);
  




  

