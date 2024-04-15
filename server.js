import {config} from "dotenv"
import { app } from "./app.js"
import { connectDB } from "./config/database.js"
config({path: "./config/config.env"})

connectDB()
.then(() => { 
    app.listen(process.env.PORT || 4000,()=> {
        console.log(`Server is running on port ${process.env.PORT}`);
    })
})
.catch((err) => console.log("MongoDB connection error: ", err));