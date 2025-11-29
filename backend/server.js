import express from "express";
import notesRoutes from "./routes/notesRoutes.js"
import {connectDB} from "./config/db.js";
import "dotenv/config"; 
import rateLimiter from "./middlewares/rateLimiter.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(rateLimiter);


app.use("/api/v1/notes" , notesRoutes);


connectDB().then(() =>{
   app.listen(PORT , () =>{
    console.log(`Server Running at port`,PORT);
})
}
 
)
