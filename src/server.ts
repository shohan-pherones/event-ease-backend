import { Server } from "http";
import { Server as SocketIOServer } from "socket.io";
import app from "./app";
import connectDB from "./app/config/db";
import env from "./app/config/env";

let server: Server;
let io: SocketIOServer;

async function main() {
  try {
    await connectDB();

    server = app.listen(env.port, () => {
      console.log(`🚀 Server is listening on port: ${env.port}`);
    });

    io = new SocketIOServer(server, {
      cors: {
        origin: env.frontend_url,
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      console.log("🔥 A client connected:", socket.id);

      socket.on("disconnect", () => {
        console.log("💔 A client disconnected:", socket.id);
      });
    });

    app.set("io", io);
  } catch (error) {
    console.error("❌ Error starting server:", error);
    process.exit(1);
  }
}

main();

process.on("unhandledRejection", (reason) => {
  console.error("👿 Unhandled Rejection detected, shutting down server...");
  console.error(reason);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

process.on("uncaughtException", (error) => {
  console.error("👿 Uncaught Exception detected, shutting down server...");
  console.error(error);
  process.exit(1);
});
