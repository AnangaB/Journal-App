import express, { Application } from 'express';
import { connectDB } from './Database/connection';
import cors from 'cors';
import makeNewTableRoute from './Database/Database Routes/makeNewTableRoutes';
import addNewJournalEntry from './Database/Database Routes/addNewJournalEntry';
import getAllJournalEntries from './Database/Database Routes/getAllJournalEntries'
import editRow from './Database/Database Routes/editRow';
import deleteRow from './Database/Database Routes/deleteRow';
import getEntriesAfterLastUpdatedTime from './Database/Database Routes/getEntriesAfterLastUpdatedTime';

import passport from 'passport';
import session from 'express-session';
import { strava_strategy } from './Strava/stravaStrategy';
import dotenv from 'dotenv';
import stravaAuth from './Strava/stravaAuth';
dotenv.config();

const app: Application = express();

  
app.use(express.json());
app.use(cors());

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
  }));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());
  

//add strava connection
passport.use(strava_strategy)
app.use('/', stravaAuth);


// DB routes
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