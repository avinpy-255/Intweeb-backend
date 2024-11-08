import express, { Request, Response } from 'express';
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
    origin: "http://localhost:5173", // Adjust to your frontend URL
    methods: ["GET", "POST"],
  },
});

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running.");
});

let latestCodeVersion: { code: string; uuid?: string } | undefined;
let activeEditors = 0;

app.get('/latest-code', (req: Request, res: Response) => {
  res.json({ code: latestCodeVersion ? latestCodeVersion.code : '' });
});

io.on("connection", (socket: Socket) => {
  activeEditors++;

  socket.on("disconnect", () => {
    activeEditors--;
    if (activeEditors === 0) {
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

  socket.on('audioStream', (audioData) => {
    socket.broadcast.emit('audioStream', audioData);
  });
});

server.listen(port, () => console.log(`Server listening on port ${port}`));
