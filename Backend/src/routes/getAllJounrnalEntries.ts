import express, { Request, Response } from 'express';
import client from '../db/connection';

const router = express.Router();

// API endpoint for geting all the entries
router.get('/getAllJournalEntries', async (_: Request, res: Response) => {
  try {

    const result = await client.query(`
      SELECT * FROM JournalEntries;
    `);
    res.json(result["rows"])
  } catch (error) {
    console.error('Error getting all the values from table:', error);
    res.status(500).json({ error: 'Failed to receive data from table' });
  }
});

export default router;
