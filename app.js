import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();
app.use(cors())

app.use(express.json())
app.use(urlencoded({extended: true}))
app.use(express.static("public"))
app.use(cookieParser())

// import Routes 
import jobsRoutes from "./routes/jobs.routes.js"

app.use("/api/v1/jobs", jobsRoutes);

export { app };