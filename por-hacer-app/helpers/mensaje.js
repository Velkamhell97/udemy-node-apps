require('colors');

const mostrarMenu = () => {
  return new Promise(resolve => {
    console.clear();
    console.log('==============================='.green);
    console.log('     Seleccione una opción '.green)
    console.log('==============================='.green);

    console.log(`
    ${'1.'.green} Crear una tarea
    ${'2.'.green} Listar tareas
    ${'3.'.green} Listar tareas completadas
    ${'4.'.green} Listar tareas pendientes
    ${'5.'.green} Completar tarea(s)
    ${'6.'.green} Borrar tarea
    ${'0.'.green} Salir \n`)

    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    })

    readline.question('Seleccione un opcion: ',(opt) => {
      readline.close();
      resolve(opt);
    })
  })
}

const pausa = () => {
  return new Promise(resolve => {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    })
  
    readline.question(`Presione ${'ENTER'.green} para continuar`,(opt) => {
      readline.close();
      resolve();
    })
  })
}

module.exports = {
  mostrarMenu,
  pausa
}