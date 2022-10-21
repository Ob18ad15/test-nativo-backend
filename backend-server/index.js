// Leer archivo .env
require('dotenv').config();

const express = require('express');
// importar modulo cors para implementarlo en el serv. backend
const cors = require('cors')

//objeto de conexión
const { dbConnection } = require('./database/config.js');

// crear conexion con la DB
dbConnection();

//crear el servidor express
const app = express();

//configurar CORS
app.use(cors());

// Setear los valores de la varible de entorno Valor del puerto de escucha
app.set('puerto', process.env.PORT || 3000);
app.listen(app.get('puerto'), () => {
    console.log('listeninig on port', + app.get('puerto'));
});

// mongodb+srv://yohan:<password>@cluster0.k6anpq0.mongodb.net/test