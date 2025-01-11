import express, { Application } from 'express';
import { connectDB } from './db/connection';
import cors from 'cors';
import makeNewTableRoute from './routes/makeNewTableRoutes';
import addNewJournalEntry from './routes/addNewJournalEntry';
import getAllJournalEntries from './routes/getAllJournalEntries'
import editRow from './routes/editRow';
import deleteRow from './routes/deleteRow';
import getEntriesAfterLastUpdatedTime from './routes/getEntriesAfterLastUpdatedTime';

import passport from 'passport';
import session from 'express-session';
import { strava_strategy } from './strava/stravaStrategy';
import dotenv from 'dotenv';
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

app.get('/auth/strava', passport.authenticate('strava'));

app.get(
  '/auth/strava/callback',
  passport.authenticate('strava', { failureRedirect: '/' }),
  (req, res) => {
    res.send('Strava account connected successfully!');
  }
);

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
passport.deserializeUser(function(user:any, done) {
    done(null, user); // Deserialize the user into the session
});

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