import express, { Request, Response } from 'express';
import client from '../connection';

const router = express.Router();

// API endpoint for geting all the entries
router.get('/getAllJournalEntries', async (_: Request, res: Response) => {
  console.log("Received: /getAllJournalEntries,")
  
  try {

    const result = await client.query(`
      SELECT * FROM JournalEntries ORDER BY date DESC;
    `);
    res.json(result["rows"])
  } catch (error) {
    console.error('Error getting all the values from table:', error);
    res.status(500).json({ error: 'Failed to receive data from table' });
  }
});

export default router;
