import express, { type Request, type Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectionDB } from './db.ts';
import router from './module/codebase/routes.ts';
import { createServer } from 'http';
import { initSocket } from './socket.ts';


dotenv.config();
const app = express();
const server = createServer(app)


app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) =>{
    res.send("Hello World")
})

initSocket(server)

app.use('/', router)

const PORT = process.env.PORT || 4000

server.listen(PORT, async() => {console.log(`Socket is running on port ${PORT}`)
    await connectionDB()
});
