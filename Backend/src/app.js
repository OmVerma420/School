import express from "express";
import cors from 'cors';
import helmet from "helmet";
import morgan from "morgan";



const app = express();
/*
Middleware
*/
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

import routes from "./routes/indexRoute.js";
app.use("/api", routes)

export default app;