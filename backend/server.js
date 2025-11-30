import "dotenv/config"; 
import express from "express";
import notesRoutes from "./routes/notesRoutes.js"
import connectDB from "./config/db.js";
import cors from "cors"
// import rateLimiter from "./middlewares/rateLimiter.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors())
// app.use(rateLimiter);


app.use("/api/v1" , notesRoutes);
console.log("ENV TEST:", process.env.MONGODB_URI);

console.log("before listen");

connectDB().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server Running at port ${PORT}`);
  });
});

