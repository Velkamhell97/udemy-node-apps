require('colors');
const inquirer = require('inquirer');

const homeMenuOptions = [
  {
    type: 'list',
    name: 'selectedOption',
    message:'Selecciona una opcion para continuar',
    choices:[
      {
        value: '1',
        name: `${'1.'.green} Buscar cuidad`
      },
      {
        value: '2',
        name: `${'2.'.green} Historial`
      },
      {
        value: '0',
        name: `${'0.'.green} Salir`
      },
    ]
  }
] 

const printHomeHeader = () => {
  console.clear();
  console.log('========================================='.green);
  console.log('|          Seleccione una opción        |'.white)
  console.log('========================================='.green);
}

const listMenu = async (options = [], message = '') => {

  const questions = [
    {
      type:'list',
      name:'selectedOption',
      choices:options
    }
  ]
  let selectedOption = '';

  if(!options.length){
    printHomeHeader();
    selectedOption = await inquirer.prompt(homeMenuOptions);
  } else {
    selectedOption = await inquirer.prompt(questions);
  }

  return selectedOption.selectedOption;
}

const checkboxMenu = async (options = [], message = '') => {

}

const inputMenu = async (message = '', validation) => {
  const questions = [
    {
      type:'input',
      name:'inputValue',
      message: !message ? `Presiona ${'ENTER'.green} para continuar` : message
    }
  ]

  const { inputValue } = await inquirer.prompt(questions)

  return inputValue;
}

const confirmMenu = async () => {

}

module.exports = {
  listMenu, checkboxMenu, inputMenu, confirmMenu
}