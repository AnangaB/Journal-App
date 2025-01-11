import axios from 'axios';
import { Router, Request, Response } from 'express';
import { StravaActivity } from '../../types/Strava Types/StravaActivity';
import { condenseRawActivity } from '../Strava Helper Functions/condenseRawActivity';


const getStravaActivities = async (accessToken: string, date: Date) => {
  try {
    // Calculate the start and end timestamps for the specified date
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0); // Set to midnight of the date
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999); // Set to end of the day

    // Fetch activities within the date range
    const response = await axios.get('https://www.strava.com/api/v3/athlete/activities', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        after: Math.floor(startOfDay.getTime() / 1000), // Convert to UNIX timestamp
        before: Math.floor(endOfDay.getTime() / 1000),  // Convert to UNIX timestamp
      },
    });

    // Return filtered activities (Strava should already filter based on after/before)
    console.log("response.data: \n", response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching activities from Strava:', error.response?.data || error.message);
    throw new Error('Failed to fetch Strava activities');
  }
};

const router = Router();

// Activities route, gets the last 200 activities
//expecting date in format yyyy-mm-dd
router.post('/activitiesForDate', async (req: Request, res: Response) => {
    console.log("strava/activitiesForDate starting...")
  if (!req.user) {
    res.status(401).json({ error: 'User not authenticated' });
  }
  const { date } = req.body;
  console.log("reveived: ", date)
  if (!date) {
    res.status(400).json({ error: 'Date is required in the request body' });
    return;
  }

  
  try {
    const user = req.user as any;
    const accessToken = user.token; 
    console.log("Fetching activities with access token: ", accessToken);

    const activities = await getStravaActivities(accessToken, new Date(date));
    const returningList:StravaActivity[] = condenseRawActivity(activities)
    res.json(returningList); // Return activities as JSON
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities by date' });
  }



});



export default router;