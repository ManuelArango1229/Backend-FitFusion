import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './auth/presentation/routes/authRoutes';

dotenv.config();
const app = express();

app.use(express.json()); // Asegúrate de que este middleware esté habilitado

// Usar el router
app.use('/api/auth', authRouter);

const PORT = process.env.PORT || 3000;

// Conectar a MongoDB y empezar el servidor
mongoose.connect(process.env.MONGO_URI || '')
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en el puerto ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error conectando a MongoDB:', error);
    });
