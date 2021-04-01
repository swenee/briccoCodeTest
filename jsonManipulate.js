

console.log("application start: ---------");

let racesList = [];


consumeHorseRacing();
//getUniqeCourses();

async function consumeHorseRacing() {

  var axios = require('axios');

  const resp = await axios.get("https://bricco.se/goop.json");


  resp.data.forEach((item, i) => {
    const oneRace = JSON.parse(JSON.stringify(item));
    racesList.push(oneRace);
  });

  return racesList;
}


function getUniqeCourses(){
//  console.log(racesList[0]);
/*
  var unique = racesList.filter(
    function (value, index, self) {
      return self.indexOf(value) === index;
    }
  );
  */
      //unika banor
      //sort i bokstavsordning
}
