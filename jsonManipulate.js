


solution();

async function solution(){
const racesList = await consumeHorseRacing();
getUniqueTracks(racesList);

getAmountAutostart(racesList);
getmoneyErenedWith100Strategy(racesList);

getTracsByVictoryPercent(racesList);
getPricemoneyQ4(racesList);

}

async function consumeHorseRacing() {
  let racesList = [];

  var axios = require('axios');

  const resp = await axios.get("https://bricco.se/goop.json");


  resp.data.forEach((item, i) => {
    const oneRace = JSON.parse(JSON.stringify(item));
    racesList.push(oneRace);
  });

  return racesList;
}


function getUniqueTracks(racesList){

  const uniqueRaces = extractUnique(racesList);

  uniqueRaces.sort(function (a,b){
    var textA = a.track.toUpperCase();
    var textB = b.track.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;

  });

  console.log("svar fråga 1: ");
  uniqueRaces.forEach((item, i) => {
    console.log(item.track);
  });
  console.log("----\n");
}

function extractUnique(list){
  //TODO vidareutveckling man borde bara få en lista med barnor inte hela item.
  var uniqueList = list.filter(
    function (value, index, self) {

      let indexOfFirstInstance;

      //finds first index same track
      for(var i = 0; i < list.length; i += 1) {
        if(list[i].track === value.track) {
            indexOfFirstInstance = i;
            break;
        }
      }

      return indexOfFirstInstance === index;


    });

  return uniqueList;
}


function getAmountAutostart(racesList){
  let amountAutostart = 0;
  racesList.forEach((item, i) => {
    if(item.startMethod == "A"){
      amountAutostart++;
    }
  });

console.log("Svar 2: Antal startade med autostart: " + amountAutostart);

}

function getmoneyErenedWith100Strategy(racesList){

  const bet = 100;
  const moneySpent = bet*racesList.length;
  let moneyEarned = 0;

  racesList.forEach((item, i) => {
    if(item.place === 1){
      moneyEarned += (item.odds/100)*bet;
    }
  });
  moneyEarned -= moneySpent;

  console.log("Svar 3: Man tjärnar: " + moneyEarned);
}

function getTracsByVictoryPercent(racesList){
  //TODO vidareutveckling snygga till, bry ut i funktioner
  // make list with name, ampuntTotal, ampuntWins
  let uniqueSet = new Set();
  racesList.forEach((item, i) => {
    uniqueSet.add(item.track);
  });



  // loop big list and fill pewvious list
  let stats = []
  uniqueSet.forEach((item, i) => {
    stats.push({track: item, total: 0, wins: 0, winPercent: 0});
  });

  racesList.forEach((item, i) => {

    stats.forEach((statsItem, statsIndex) => {
      if(statsItem.track === item.track){
        statsItem.total++;
        if(item.place === 1){
          statsItem.wins++;
        }
      }
    });

  });
  // do calc per item
  stats.forEach((item, i) => {
    item.winPercent = item.wins/item.total;
  });


  // sort by calc
  stats.sort(function (a,b){
     return b.winPercent - a.winPercent;
  });

  //print sorted list

  console.log("Svar 4: ");
  stats.forEach((item, i) => {
    console.log(item.track + " - Win rate: " + item.winPercent);
  });

  console.log("---- \n");

}

function getPricemoneyQ4(racesList) {
//  Q4 2019: October 1 - December 31

const startQ1 = new Date(2019, 8, 1);
const endQ1 = new Date(2019, 12, 31);

let prizeMoney = 0;

racesList.forEach((item, i) => {
  if(item.track === "Solvalla" && item.place === 1){
    const raceDateString = item.startTime.split(" ")[0].split("-");
    const raceDate = new Date(raceDateString[0],
                              raceDateString[1],
                              raceDateString[2]
                            );
    if( (startQ1 <= raceDate) && (raceDate <= endQ1) ){
      prizeMoney += item.firstPrize;
    }
  }
});

console.log("Svar 5: " + prizeMoney);


}
