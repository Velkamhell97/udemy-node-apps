const http = require('http');

//req: toda la informacion que estan solicitando, toda la info de la url, los headers, argumentos, parametros, etc
//res: lo que el servidor responde al cliente
http.createServer( (req, res) => {
  
  //podemos mandar diferentes estatus, cada uno de estos tiene un significado
  //res.writeHead(404);
  //res.write('404 | Page not found')
  
  //Si mandamos algun header por postman tambien lo podremos encontrar en este objeto
  //console.log(req);
  
  //res.writeHead(200, { 'Content-Type':'text/plain' });
  res.write('Hola mundo');
  
  //res.writeHead(200, { 'Content-Type':'application/json' });
  //const persona = {
  //  id: 1,
  //  nombre: 'Daniel'
  //}
  //res.write(JSON.stringify(persona));

  //Con este header se le dice al navegador web hey, voy a crear un archivo que se va a descargar y este va a ser el nombre del archivo
  //res.setHeader('Content-Disposition', 'attachment; filename=lista.csv')
  //res.writeHead(200, { 'Content-Type':'application/csv' });
  //res.write( 'id, nombre\n' );
  //res.write( '1, Daniel\n' );
  //res.write( '2, Camilo\n' );
  //res.write( '3, Monica\n' );
  //res.write( '4, David\n' );

  res.end();
}).listen( 8080 );

console.log('Escuchando el puerto 8080...')