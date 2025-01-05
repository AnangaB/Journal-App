import express, { Application } from 'express';
import { connectDB } from './db/connection';

const app: Application = express();

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    console.log(req.body);
    res.send('Hello');
});

// Start Server
const PORT = 5000;
app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);
    await connectDB();
});
