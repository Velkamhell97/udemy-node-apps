const axios = require('axios').default;
//esta es una forma de hacerlo creando un archivo js que devuelva estas constantes
//const { mapboxToken } = require('../env'); 

class Busquedas {
  _historial = [];

  constructor(){
    this._historial = [];
  }

  async buscarCiudad ( lugar = '' ) {
    try {
      const instance =  axios.create({
        baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params:{
          'access_token':process.env.MAPBOX_KEY,
          'limit':5,
          'language':'es'
        }
      })

      const cities = await instance.get();

      return cities.data;
    } catch {
      return [];
    }
  }

}

module.exports = Busquedas;