import express, { Request, Response } from 'express';
import client from '../db/connection';

const router = express.Router();

// API endpoint for making a new table, if it doesn't already exist
router.post('/addNewJournalEntry', async (req: Request, res: Response): Promise<any> => {

    const { date, text, lastModified } = req.body;
    
    console.log("API request to add new journal entry received: ",  req.body, date, text,lastModified)

    if (!date || !text) {
      return res.status(400).json({ error: "Both 'date' and 'text' are required." });
    }

    try {
        // First, check if the date already exists in the JournalEntries table
        const checkQuery = {
        text: `SELECT date FROM JournalEntries WHERE date = $1 LIMIT 1`,
        values: [lastModified],
        };

        const checkResult = await client.query(checkQuery);

        if (checkResult !== null && checkResult.rowCount !== null && checkResult.rowCount > 0) {
            // If the date already exists, send a response indicating it already exists
            res.status(400).json({ message: 'A journal entry already exists for this date.' });
        }
        else{
            const query = {
                // give the query a unique name
                name: 'add-entry',
                text: `INSERT INTO JournalEntries (date, text, medias, last_modified)
                VALUES ($1,$2,$3,$4);`,
                values: [date, text, [],lastModified],
            };
        
                // SQL query to create the table if it doesn't exist
                await client.query(query);
        
                res.status(200).json({ message: 'Row Added!' });

        }
    } catch (error) {
    console.error('Error creating table:', error);
    res.status(500).json({ error: 'Failed to add to table.' });
    }
});

export default router;