const Tarea = require("./tarea.js");

class Tareas {
  _listado = {};

  constructor() {
    this._listado = {};
  }

  get listado() {
    return Object.values(this._listado);
  }

  get listadoCompletas() {
    return this.listado.filter(tarea => tarea.completadoEn);
  }

  get listadoPendientes() {
    return this.listado.filter(tarea => !tarea.completadoEn);
  }

  set listado(tareasDB = []) {
    tareasDB.forEach(tarea => this._listado[tarea.id] = tarea);
  }

  crearTarea(desc = '') {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  formatearTareas(listadoTareas){
    console.log(' ');
    let tareas = '';

    if(!listadoTareas.length) {
      return 'No hay tareas para mostrar\n'.red
    }

    listadoTareas.forEach((tarea, index) => {
      if(!tarea.completadoEn){
        tareas += `${((index+1)+'.').green} ${tarea.desc} :: ${'Pendiente'.red}\n`;
      } else {
        tareas += `${((index+1)+'.').green} ${tarea.desc} :: ${'Completada'.green}\n`;
      }
    })

    return tareas;
  }

  mostrarTareas() {
    const tareas = this.formatearTareas(this.listado);
    return console.log(tareas);
  }

  mostrarTareasCompletas() {
    const tareasCompletadas = this.formatearTareas(this.listadoCompletas);
    return console.log(tareasCompletadas);
  }

  mostrarTareasPendientes() {
    const tareasPendientes = this.formatearTareas(this.listadoPendientes);
    return console.log(tareasPendientes);
  }

  completarTareas(tareasCompletadas = []) {
    tareasCompletadas.forEach(tarea => {
      this._listado[tarea]['completadoEn'] = new Date().toISOString();
    })
  }

  borrarTareas(tareasEliminadas = []) {
    tareasEliminadas.forEach(tarea => {
      delete this._listado[tarea];
    })
  }

}

module.exports = Tareas;