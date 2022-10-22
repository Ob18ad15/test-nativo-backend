// Leer archivo .env
require('dotenv').config();

const express = require('express');
// importar modulo cors para implementarlo en el serv. backend
const cors = require('cors')

//objeto de conexión
const { dbConnection } = require('./src/database/config.js');

// crear conexion con la DB
dbConnection();

//crear el servidor express
const app = express();

//configurar CORS
app.use(cors());

// Parseo de data enviada en el body
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

// Rutas 
app.use('/api/tasks', require('./src/routes/task.routes'))


// Setear los valores de la varible de entorno Valor del puerto de escucha
app.set('puerto', process.env.PORT || 3000);
app.listen(app.get('puerto'), () => {
    console.log('listeninig on port', + app.get('puerto'));
});