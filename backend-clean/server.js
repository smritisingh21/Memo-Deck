import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  res.json({ ok: true });
});

app.listen(8000, "0.0.0.0", () => {
  console.log("SERVER LISTENING ON 8000");
});