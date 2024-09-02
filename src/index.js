console.log("\t\t // INTERNSHIP TASK // - Nebojsa Simovic  #Newbluewood \n")

// ** varijanta sa assert - ES/module, novija sintaksa, ali u eksperimentalnoj fazi, tako da nije sigurna za dugorocnu upotrebu ** //
// import groups from './groups.json' assert { type: 'json' };
// import exhibitions from './exhibitions.json' assert { type: 'json' }; 

// ** Uvoz podataka iz data/ ** //

import fs from 'fs/promises';

async function loadGroups() {
  const data = await fs.readFile('./data/groups.json', 'utf-8');
  const groups = JSON.parse(data);
  return groups;
}

async function loadExibitions() {
  const data = await fs.readFile('./data/exibitions.json', 'utf-8');
  const exibitions = JSON.parse(data);
  return exibitions;
}

export const Groups = await loadGroups().then(groups => {
  return groups;
});

export const Exibitions = await loadExibitions().then(exibitions => {
  return exibitions;
});


// ** kreiranje inicijalne tabele Timova ** //

function createInitialTeamsTable(Groups) {

  let Teams = {};

  for ( let group in Groups) {
    Groups[group].forEach(data => { 
      Teams[data.ISOCode] = {};

      Teams[data.ISOCode].group = group;
      Teams[data.ISOCode].ISOCode = data.ISOCode;
      Teams[data.ISOCode].Team = data.Team
      Teams[data.ISOCode].rank = data.FIBARanking;

      Teams[data.ISOCode].form = 0;
      Teams[data.ISOCode].points = 0;
      Teams[data.ISOCode].wins = 0;
      Teams[data.ISOCode].losses = 0;
      Teams[data.ISOCode].scored = 0;
      Teams[data.ISOCode].conceded = 0;
      Teams[data.ISOCode].difference = 0;
      Teams[data.ISOCode].groupRank = null;
      Teams[data.ISOCode].tournamentRank = null;

      Teams[data.ISOCode].matches = [];

    })
  } 
  
  return Teams
}

export function sortingFunction ( TeamsStatData, criteria) {

    // Pretvaranje objekta u niz
    const teamsArray = Object.entries(TeamsStatData);

    // Sortiranje niza po kriterijumu
    teamsArray.sort((a, b) => a[1][criteria] - b[1][criteria]);
  
    // Pretvaranje niza nazad u objekat
    const sortedTeamsData = Object.fromEntries(teamsArray);
  
    return sortedTeamsData  
}


export const Teams = createInitialTeamsTable(Groups)
