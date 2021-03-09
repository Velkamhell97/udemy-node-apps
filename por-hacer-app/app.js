require('colors');
//const { mostrarMenu, pausa } = require('./helpers/mensaje');
const 
  { 
    inquirerMenu, 
    inquirerPause, 
    readInput,
    showOptions,
    confirmInput
  } 
= require('./helpers/inquirer');
const Tareas = require('./models/tareas');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');


const main = async () => {  
  let opt = '';
  const tareas = new Tareas();
  
  const tareasDB = leerDB();

  if(tareasDB){
    tareas.listado = tareasDB;
  }
  
  while(opt !== '0'){
    opt = await inquirerMenu();
    switch(opt){
      case '1':
        console.log(' ');
        const desc = await readInput('Descripción: ');
        tareas.crearTarea(desc);
        guardarDB(tareas.listado);
        console.log(`${'\nTarea'.green} '${desc.toString().green}' ${'agregada exitosamente'.green}`);
        await new Promise(resolve => setTimeout(resolve,1200));

        break;
      case '2':
        tareas.mostrarTareas();
        await inquirerPause();

        break;
      case '3':
        tareas.mostrarTareasCompletas();
        await inquirerPause();

        break;
      case '4':
        tareas.mostrarTareasPendientes();
        await inquirerPause();

        break;
      case '5':
        console.log(' ');

        if (!tareas.listadoPendientes.length){
          console.log('No hay tareas pendientes\n'.red);
          await inquirerPause();
          break;
        }

        const tareasCompletadas = await showOptions(tareas.listadoPendientes);

        if(!tareasCompletadas.length || tareasCompletadas.includes(0)) {
          break;
        } else {
          tareas.completarTareas(tareasCompletadas);
          guardarDB(tareas.listado);
          console.log('\nTarea(s) completadas exitosamente'.green);
          await new Promise(resolve => setTimeout(resolve,700));

          break;
        }
      case '6':
        console.log(' ');

        if (!tareas.listado.length){
          console.log('No hay tareas\n'.red);
          await inquirerPause();
          break;
        }

        const tareasEliminadas = await showOptions(tareas.listado);

        if(!tareasEliminadas.length || tareasEliminadas.includes(0)) {
          break;
        } else {
          console.log(' ');
          const confirm = await confirmInput('Estas seguro que deseas eliminar estas tareas? ');
          if(confirm) {
            tareas.borrarTareas(tareasEliminadas);
            guardarDB(tareas.listado);
            console.log('\nTarea(s) eliminadas exitosamente'.green);
            await new Promise(resolve => setTimeout(resolve,700));
          }
          break;
        }
        
    }
  }
}

main()

/*OPCIONES INICIALES
  const main = async () => {  
    let opt = '';

    while(opt !== '0'){
      opt = await mostrarMenu();
      console.log({opt});
      if(opt !== '0') await pausa();
    }
  }
*/