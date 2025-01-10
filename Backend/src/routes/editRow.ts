import express, { Request, Response } from 'express';
import client from '../db/connection';

const router = express.Router();

// API endpoint for editing an existing row in the table
router.post('/editRow', async (req: Request, res: Response): Promise<any> => {

    const { date, text,lastModified } = req.body;
    
    console.log("editExistingRow API received: ",  req.body, date, text)

    if (!date || !text) {
      return res.status(400).json({ error: "Both 'date' and 'text' are required." });
    }

    try {
        // First, check if the date already exists in the JournalEntries table
        const checkQuery = {
        text: `SELECT date FROM JournalEntries WHERE date = $1 LIMIT 1`,
        values: [date],
        };

        const checkResult = await client.query(checkQuery);

        if (checkResult === null || checkResult.rowCount === null || checkResult.rowCount == 0) {
            // If the date doesn't already exists, send a response indicating it doesnt already exists
            res.status(400).json({ message: 'No journal entry found matching this date.' });
        }
        else{
            const query = {
                name: 'update-entry',
                text:`
                    UPDATE JournalEntries
                    SET text = $2 , medias = $3, last_modified
                    WHERE date = $1;`,
                values: [date, text, [],lastModified],
                }
        
                await client.query(query);
        
                res.status(200).json({ message: 'Row added Successfully!' });
        }
    } catch (error) {
        console.error('Error editing existing row:', error);
        res.status(500).json({ error: 'Failed to edit a row in table.' });
    }
});

export default router;