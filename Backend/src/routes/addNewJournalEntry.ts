import express, { Request, Response } from 'express';
import client from '../db/connection';

const router = express.Router();

// API endpoint for making a new table, if it doesn't already exist
router.get('/addNewJournalEntry/:date/:text', async (req: Request, res: Response) => {
    const date = req.params.date;
    const journalText = req.params.text;
    console.log("API received: ", date, journalText)
  try {
        // First, check if the date already exists in the JournalEntries table
        const checkQuery = {
        text: `SELECT date FROM JournalEntries WHERE date = $1 LIMIT 1`,
        values: [date],
        };

        const checkResult = await client.query(checkQuery);

        if (checkResult !== null && checkResult.rowCount !== null && checkResult.rowCount > 0) {
            // If the date already exists, send a response indicating it already exists
            res.json({ message: 'A journal entry already exists for this date.' });
        }
        else{
            const query = {
                // give the query a unique name
                name: 'fetch-user',
                text: `INSERT INTO JournalEntries (date, text, medias )
                VALUES ($1,$2,$3);`,
                values: [date, journalText, []],
                }
        
                // SQL query to create the table if it doesn't exist
                await client.query(query);
        
                res.json({ message: 'Row added Successfully!' });

        }


        
  } catch (error) {
    console.error('Error creating table:', error);
    res.status(500).json({ error: 'Failed to add to table.' });
  }
});

export default router;