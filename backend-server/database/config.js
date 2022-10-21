const mongoose = require('mongoose')



const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION, {
            useNewUrlParser: true, useUnifiedTopology: true
        });

        console.log('DB connection established');

    } catch (error) {
        console.error(error);
        throw new Error('Error connecting to database...')
     }
}

// exportar objeto de conexión 
module.exports = {
    dbConnection
}