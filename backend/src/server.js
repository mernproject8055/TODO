import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import express from "express";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js";
import { connectDB } from "./config/db.js";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
  //origin: "http://localhost:5173",
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`
    <h1> Todo Task Manager Backend</h1>
    <p>Server is running successfully!</p>
    
  `);
});

app.use("/tasks", taskRoutes);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running → http://localhost:${port}`);
  });
});
