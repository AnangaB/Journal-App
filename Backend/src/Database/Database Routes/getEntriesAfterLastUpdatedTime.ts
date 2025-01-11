import express, { Request, Response } from 'express';
import client from '../connection';

const router = express.Router();

// API endpoint for geting all the entries
router.post('/getUpdatedJournalEntries', async (req: Request, res: Response) => {
  try {
     const {lastModified} = req.body;
    console.log("Received:/getUpdatedJournalEntries for,", lastModified)
     if (!lastModified) {
        res.status(400).json({ error: "Missing 'lastModified' in request body." });
      }

     const result = await client.query(`
      SELECT * FROM JournalEntries  
      WHERE last_modified >= $1 
      ORDER BY date DESC;
    `,[lastModified]);

    console.log("Returning ", result["rows"])
    
    res.json(result["rows"])

  } catch (error) {
    console.error('Error getting all the values from table:', error);
    res.status(500).json({ error: 'Failed to receive data from table' });
  }
});

export default router;
