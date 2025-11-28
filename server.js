// server.js
// Entry point del servicio PREDICT

const express = require("express");
const path = require("path");
const predictRoutes = require("./routes/predictRoutes");
const { initModel } = require("./services/tfModelService");

const PORT = process.env.PORT || 3002;
const { connectDB } = require('./services/mongoDBService');

const app = express();
app.use(express.json());

// Servir la carpeta del modelo TFJS (model/model.json + pesos)
const modelDir = path.resolve(__dirname, "model");
app.use("/model", express.static(modelDir));

// Rutas del servicio PREDICT
app.use("/", predictRoutes);

// Arranque del servidor + carga del modelo
connectDB()
  .then(() => {
    app.listen(PORT, async () => {
      const serverUrl = `http://localhost:${PORT}`;
      console.log(`[PREDICT] Servicio escuchando en ${serverUrl}`);

      try {
        await initModel(serverUrl);
      } catch (err) {
        console.error("Error al inicializar modelo:", err);
        process.exit(1);
      }
    });
  })
  .catch(err => {
    // Manejo de errores de conexión
    console.error('Error al conectar a MongoDB:', err.message);
    process.exit(1); // Sale de la aplicación si no puede conectar a la DB
  });
