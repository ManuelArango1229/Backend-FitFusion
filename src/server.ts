import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import "./auth/infraestructure/passport/googleStratety";
import authRouter from "./auth/presentation/routes/authRoutes";
import userStatsRouter from "./stadistics/presentation/routes/userStatsRoutes";
import passport from "passport";
import session from "express-session";
import cors from "cors";

dotenv.config();
const app = express();

app.use(express.json()); // Middleware para analizar JSON
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

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/auth", authRouter);
app.use("/api/stats", userStatsRouter);

const PORT = process.env.PORT || 3000;

// Conectar a MongoDB y empezar el servidor
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
