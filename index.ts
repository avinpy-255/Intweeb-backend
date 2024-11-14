import express, { type Request, type Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'http';

import { connectionDB } from './db';
import router from './module/codebase/routes';
import { initSocket } from './socket';


dotenv.config();


const PORT: number = parseInt(process.env.PORT || '4000', 10);

const app = express();
const server = createServer(app);

// Middleware setup
app.use(cors());
app.use(express.json());

// Health check route
app.get('/healthcheck', (req: Request, res: Response) => {
    res.status(200).send({ message: 'Hello World', status: 'healthy' });
});

// Initialize WebSocket or Socket.IO
initSocket(server);

// Main router for other endpoints
app.use('/', router);

// Start server and connect to the database
server.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await connectionDB();
});
