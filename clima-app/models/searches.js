const axios = require('axios').default;
//esta es una forma de hacerlo creando un archivo js que devuelva estas constantes
//const { mapboxToken } = require('../env'); 

class Searches {
  _record = {};

  constructor(){
    this._record = {};
  }

  get recordPlaces () {
    return Object.values(this._record);
  }

  set recordPlaces (value) {
    value.forEach( place => {
      this._record[place.id] = place;
    })
  }

  async searchCity ( place = '' ) {
    try {
      const instance =  axios.create({
        baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params:{
          access_token: process.env.MAPBOX_KEY,
          limit: 5,
          language: 'es'
        }
      })

      const mapboxResponse = await instance.get();

      const cities = mapboxResponse.data.features.map(place => (
        {
          id: place.id,
          nombre: place.place_name,
          lat: place.center[1],
          lng: place.center[0]
        }
      ))

      return cities;
    } catch {
      return [];
    }
  }

  async searchWeather ( lat = '', lng = '' ) {
    try {
      const instance =  axios.create({
        baseURL:`https://api.openweathermap.org/data/2.5/weather`,
        params:{
          lat:lat,
          lon:lng,
          appid:process.env.OPENWEATHER_KEY,
          units: 'metric',
          lang: 'es'
        }
      })

      const operWeatherResponse = await instance.get();

      const weather = {
        desc: operWeatherResponse.data.weather[0].description,
        temp: operWeatherResponse.data.main.temp,
        min: operWeatherResponse.data.main.temp_min,
        max: operWeatherResponse.data.main.temp_max
      }

      return weather;
    } catch {
      return {};
    }
  }

  addPlace ( place = {} ){
    const alreadyExist = this.recordPlaces.some(record => record.id == place.id);

    if(!alreadyExist) {
      this._record[place.id] = place;
    }
  }

  showRecord ( data = null ) {
    const record = data ? [data] : this.recordPlaces.reverse().slice(0,5);

    if(!record.length){
      return console.log('\nNo hay registros almacenados en el historial'.green);
    }

    if(!data){
      console.clear();
      console.log('========================================='.green);
      console.log('|                Historial              |'.white)
      console.log('========================================='.green);
    }

    record.forEach( place => {
      console.log('Ciudad:', place.nombre.toString().green);
      console.log('Lat:', place.lat);
      console.log('Lng:', place.lng);
      console.log('Temperatura:', place.temp);
      console.log('Minima:', place.min);
      console.log('Maxima:', place.max);
      console.log('Como esta el clima:', place.desc.toString().green)
      console.log('-----------------------------------------'.green);
    })
  }

}

module.exports = Searches;