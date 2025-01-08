import express, { Request, Response } from 'express';
import client from '../db/connection';

const router = express.Router();

// API endpoint for deleting an existing row in the table
router.post('/deleteRow', async (req: Request, res: Response): Promise<any> => {
  const { date } = req.body;

  console.log("API request to delete row received: ", req.body);

  if (!date) {
    return res.status(400).json({ error: "'date' is required to delete a row." });
  }
  
  try {
    // First, check if the row with the specified date exists in the JournalEntries table
    const checkQuery = {
      text: `SELECT date FROM JournalEntries WHERE date = $1 LIMIT 1`,
      values: [date],
    };

    const checkResult = await client.query(checkQuery);

    if (checkResult === null || checkResult.rowCount === null || checkResult.rowCount === 0) {
      console.error('Error deleting row: No journal entry found matching this date. The result after chedking db was: ', checkResult);

      return res.status(404).json({ message: 'No journal entry found matching this date.' });
    }

    const deleteQuery = {
      name: 'delete-entry',
      text: `DELETE FROM JournalEntries WHERE date = $1`,
      values: [date],
    };

    await client.query(deleteQuery);

    res.status(200).json({ message: 'Row deleted successfully!' });
  } catch (error) {
    console.error('Error deleting row:', error);
    res.status(500).json({ error: 'Failed to delete row.' });
  }
});

export default router;
