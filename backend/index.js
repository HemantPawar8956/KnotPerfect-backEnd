import express from "express";
import cors from "cors";
import "dotenv/config";
import http from "http";
import { Server } from "socket.io";
import os from "os";
import cluster from "cluster";
import userRoutes from "./routers/userRoutes.js";
import { connectDB } from "./connection/dbConnection.js";
import hallRoutes from "./routers/hallRoutes.js";

if (cluster.isPrimary) {
  const cpuLength = os.cpus().length;

  for (let i = 0; i < cpuLength; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker} died, restarting ...`);
    cluster.fork();
  });
} else {
  const app = express();
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT"],
    },
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: "*",
    })
  );

  connectDB(process.env.mongodb_URL);

  io.on("connection", (socket) => {
    console.log("New Connection on server");
    socket.on("join", (data) => {
      console.log(data);
      socket.join(data);
    });
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
    
  });

  app.use("/user", userRoutes);
  app.use("/hall", hallRoutes);
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`application is working on the port no ${PORT}`);
  });
}
