const inquirer = require('inquirer');
require('colors');

const preguntas = [
  {
    type: 'list',
    name: 'opcion',
    message: '¿Qué desea hacer?',
    choices: [
      {
        value: '1',
        name: `${'1.'.green} Crear una tarea`
      },
      {
        value: '2',
        name: `${'2.'.green} Listar tareas`
      },
      {
        value: '3',
        name: `${'3.'.green} Listar tareas completadas`
      },
      {
        value: '4',
        name: `${'4.'.green} Listar tareas pendientes`
      },
      {
        value: '5',
        name: `${'5.'.green} Completar tarea(s)`
      },
      {
        value: '6',
        name: `${'6.'.green} Borrar tarea(s)`
      },
      {
        value: '0',
        name: `${'0.'.green} Salir`
      },
    ]
  }
]

const pausa = [
  {
    type:'input',
    name:'pausa',
    message:`Presiona ${'Enter'.green} para continuar`
  }
]

const inquirerMenu = async () => {
  console.clear();
  console.log('========================================='.green);
  console.log('|          Seleccione una opción        |'.white)
  console.log('========================================='.green);

  const { opcion } = await inquirer.prompt(preguntas);

  return opcion;
}

const inquirerPause = async () => {
  const opt = await inquirer.prompt(pausa);

  return opt;
}

const showOptions = async (opciones) => {
  opciones.forEach((opcion,index, array) => {
    array[index] = { name:opcion.desc, value: opcion.id}
  });

  opciones[opciones.length] = {name:'Cancelar', value: 0};

  const questions = [
    {
      type:'checkbox',
      name:'options',
      message:'¿Que tareas deseas completar?',
      choices: opciones
    }
  ]

  const { options } = await inquirer.prompt(questions);

  return options;
}

const readInput= async (message) => {
  const questions = [
    {
      type:'input',
      name:'input',
      message,
      validate(value){
        if(value.length == 0 || !isNaN(value)){
          return 'Por favor ingrese una tarea valida'
        }
        return true
      }
    }
  ]

  const {input} = await inquirer.prompt(questions);

  return input;
}

const confirmInput = async (message) => {
  const questions = [
    {
      type:'confirm',
      name:'confirm',
      message,
    }
  ]

  const {confirm} = await inquirer.prompt(questions);

  return confirm;
}

module.exports = {
  inquirerMenu,
  inquirerPause,
  readInput,
  showOptions,
  confirmInput
}
