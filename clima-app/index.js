require('dotenv').config()

const { listMenu, inputMenu } = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

const pause = async (time) => {
  return await new Promise(resolve => setTimeout(resolve,time));
} 

const main = async () => {
  let opt = '';
  const busquedas = new Busquedas();

  while(opt != '0'){
    opt = await listMenu();
    switch(opt){
      case '1':
        const ciudad = await inputMenu('Escribe el nombre de la ciudad: ');
        const response = await busquedas.buscarCiudad(ciudad);
        console.log(response);
        await inputMenu();

        break;
      case '2':
        break;
      case '0':
        break;
    }
  }
}

main();