const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogSchema = new Schema({
    // METADATA DE EJECUCIÓN
    timestamp: { 
        type: Date, 
        default: Date.now,
        index: true 
    },
    modelVersion: { 
        type: String, 
        required: true,
        index: true 
    },
    latencyMs: { 
        type: Number, 
        required: true 
    },
    
    // DATOS DE ENTRADA
    features: { 
        type: [Number], 
        required: true 
    },
    
    // METADATA DEL CLIENTE
    meta: {
        dataId: { type: String, required: false },
        source: { type: String, required: false },
        correlationId: { type: String, required: false }
    },

    // RESULTADO
    prediction: { 
        type: Number, 
        required: true 
    },
});

module.exports = mongoose.model('PredictionLog', LogSchema)