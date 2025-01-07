import express, { Application } from 'express';
import { connectDB } from './db/connection';
import cors from 'cors';
import makeNewTableRoute from './routes/makeNewTableRoutes';
import addNewJournalEntry from './routes/addNewJournalEntry';
import getAllJournalEntries from './routes/getAllJounrnalEntries'
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api', makeNewTableRoute);
app.use('/api', addNewJournalEntry);
app.use('/api',getAllJournalEntries)
// Routes
app.get('/', (req, res) => {
    console.log(req.body);
    res.send('Hello');
});

// Start Server
const PORT = 5000;
app.listen(PORT, "0.0.0.0", async () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
    await connectDB();
});