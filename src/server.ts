import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import "./auth/infraestructure/passport/googleStratety";
import authRouter from "./auth/presentation/routes/authRoutes";
import userStatsRouter from "./stadistics/presentation/routes/userStatsRoutes";
import routineRouter from "./routines/presentation/routes/routineRoutes";
import passport from "passport";
import session from "express-session";
import cors from "cors";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.GOOGLE_CLIENT_SECRET || "",
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

// Middleware de CORS para permitir cualquier origen y permitir el uso de credenciales
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow: boolean) => void) => {
    // Permitir solicitudes desde cualquier origen
    callback(null, true);
  },
  credentials: true,  // Permitir el uso de credenciales (cookies)
};

app.use(cors(corsOptions));
app.options('*', cors());  

app.use("/api/auth", authRouter);
app.use("/api/stats", userStatsRouter);
app.use("/api/routines", routineRouter);

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error conectando a MongoDB:", error);
  });
