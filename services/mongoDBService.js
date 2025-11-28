// mongodbService.js
const mongoose = require('mongoose');

const DB_URI = 'mongodb://localhost:27017/mi_aplicacion_db';

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI);

        console.log('Conexión a MongoDB establecida correctamente.');

    } catch (error) {
        console.error('Error al conectar a MongoDB:', error.message);
        throw error;
    }
};

module.exports = { connectDB };