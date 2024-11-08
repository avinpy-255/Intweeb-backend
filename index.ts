import express, { type Request, type Response } from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
import bodyParser from 'body-parser';

const port = process.env.PORT || 4001;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Server variables
let latestCodeVersion: { code: string; uuid?: string } | undefined;
let countClient = 0;

// API to get the latest code
app.get('/latest-code', (req: Request, res: Response) => {
  if (latestCodeVersion) {
    res.json({ code: latestCodeVersion.code });
  } else {
    res.json({ code: 'empty-code' });
  }
});

// Socket.io events
io.on("connection", (socket: Socket) => {
  console.log("New client connected");
  countClient++;

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    countClient--;
    if (countClient === 0) {
      io.emit('code-unlocked', { uuid: 'server' });
    }
  });

  socket.on('update-code', (msg: { code: string; uuid: string }) => {
    latestCodeVersion = msg;
    io.emit('update-code', msg);
  });

  socket.on('code-locked', (msg: { uuid: string }) => {
    io.emit('code-locked', msg);
  });

  socket.on('code-unlocked', (msg: { uuid: string }) => {
    io.emit('code-unlocked', msg);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
