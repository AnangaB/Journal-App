import express, { Application } from 'express';
import { connectDB } from './db/connection';
import cors from 'cors';
import makeNewTableRoute from './routes/makeNewTableRoutes';
import addNewJournalEntry from './routes/addNewJournalEntry';
import getAllJournalEntries from './routes/getAllJournalEntries'
import editRow from './routes/editRow';
import deleteRow from './routes/deleteRow';
import getEntriesAfterLastUpdatedTime from './routes/getEntriesAfterLastUpdatedTime';
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api', makeNewTableRoute);
app.use('/api', addNewJournalEntry);
app.use('/api',getAllJournalEntries);
app.use('/api',editRow);
app.use('/api',deleteRow)
app.use('/api',getEntriesAfterLastUpdatedTime)


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