import "dotenv/config"; 
import express from "express";
import notesRoutes from "./routes/notesRoutes.js"
import rootRoutes from "./routes/rootRoutes.js"
import foldersRoutes from "./routes/foldersRoutes.js"
import authRoutes from './routes/authRoutes.js'
import connectDB from "./config/db.js";
import cors from "cors"
// import rateLimiter from "./middlewares/rateLimiter.js";

const app = express();
const PORT = process.env.PORT || 4040;


app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5174","https://memo-deck.vercel.app"],
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE"]
}));

app.use(express.json());
// app.use(rateLimiter);


app.use("/api/v1" , notesRoutes);
app.use("/api/v1" , foldersRoutes);
app.use("/api/v1" , rootRoutes);
app.use("/api/v1" , authRoutes); 

connectDB()
  .then(() => {
    console.log("Connected to database");
  })
  .catch(err => {
    console.error("DB connection failed:", err);
  });


  app.listen(PORT,"0.0.0.0", () => { 
    console.log(`Server Running at http://localhost:${PORT}`);
  });
;




