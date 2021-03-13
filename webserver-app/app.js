require('dotenv').config()
const express = require('express');
const hbs = require('hbs');

const app = express();
//const port = 8080;
const port = process.env.PORT;
 
//req: toda la informacion que estan solicitando, toda la info de la url, los headers, argumentos, parametros, etc
//res: lo que el servidor responde al cliente
//contenido estatico: es un contenido que cualquiera con la url lo puede ver


//hanlderbars es un template engine que permite hacer pagians html mas dinamicas, sin embargo su uso se debe reducir
//A aplicaciones de pequeña escala para proyecto mas grandes utilizar Angular o React o Stelve
//Las vistas deben estar en la carpeta views
app.set('view engine', 'hbs');

//Los partials son como secciones de codigo que podemos reutilizar en todas las vistas, la instruccion de abajo carga 
//los partials que se encuentren en la carpeta patrials
hbs.registerPartials(__dirname + '/views/partials', );

//El public es el path de la carpeta public, expresamente el archivo se debe llamar index.html para que funcione
app.use(express.static('public'));

//El archivo estatico sobreescribe la ruta principal por defecto 
app.get('/', function (req, res) {
  //res.send('Hola Mundo');
  //res.sendFile(__dirname + '/public/index.html');
  res.render('home',{
    nombre:'Daniel',
    titulo:'Curso de Node'
  });
})

//Si creamos un folder dentro de public con el mismo nombre que la ruta, el contenido de este folder reemplazara este get
app.get('/generic', function (req, res) {
  //res.sendFile(__dirname + '/public/generic.html');
  res.render('generic',{
    nombre:'Daniel',
    titulo:'Curso de Node'
  });
})

app.get('/elements', function (req, res) {
  //res.sendFile(__dirname + '/public/elements.html');
  res.render('elements',{
    nombre:'Daniel',
    titulo:'Curso de Node'
  });
})

app.get('*', function (req, res) {
  //Podemos tambien mandar vistas por la respuesta
  //res.send('404 | Page not found');
  res.sendFile(__dirname + '/public/404.html');
})
 
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})