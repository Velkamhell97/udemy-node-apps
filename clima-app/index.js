require('dotenv').config()
require('colors');

const { listMenu, inputMenu } = require('./helpers/inquirer');
const { saveRecord, readRecord } = require('./helpers/db');
const Searches = require('./models/searches');

const main = async () => {
  let opt = '';

  const placesDB = readRecord();
  const searches = new Searches();

  if(placesDB) {
    searches.recordPlaces = placesDB;
  }

  while(opt != '0'){
    opt = await listMenu();

    switch(opt){
      case '1':
        console.log('');
        const searchPlace = await inputMenu('Escribe el nombre de la ciudad: ');
        const foundCities = await searches.searchCity(searchPlace);

        console.log('');
        const options = foundCities.map( (city, index) => (
          {
            value:city.id,
            name: `${((index+1).toString()+'.').green} ${city.nombre}`
          }
        ))
        options.push({
          value: 0,
          name: `${'0.'.green} Volver`
        })

        const selectedCity = await listMenu(options, 'Se encontraron los siguientes resultados');
        if(selectedCity === 0) {
          break;
        }
        let city = foundCities.find( city => city.id = selectedCity);

        const weather = await searches.searchWeather(city.lat, city.lng);
        const place = {...city,...weather};

        searches.addPlace(place);  
        //await inputMenu();
        saveRecord(searches.recordPlaces);

        console.clear();
        console.log(`La ciudad ${(city.nombre).toString().green} tiene la siguiente informacion: \n`);
        searches.showRecord(place);

        console.log('');
        await inputMenu();
        
        break;
      case '2':
        searches.showRecord();

        console.log('');
        await inputMenu();

        break;
      case '0':
        break;
    }
  }
}

main();