import express, { Request, Response } from 'express';
import client from '../db/connection';

const router = express.Router();

// API endpoint for making a new table, if it doesn't already exist
router.get('/makeNewTableRoute', async (_: Request, res: Response) => {
  try {
    // SQL query to create the table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS JournalEntries (
        date DATE PRIMARY KEY,
        text TEXT,
        medias TEXT[]
      );
    `);

    res.json({ message: 'Table created or already exists' });
  } catch (error) {
    console.error('Error creating table:', error);
    res.status(500).json({ error: 'Failed to create table' });
  }
});

export default router;
