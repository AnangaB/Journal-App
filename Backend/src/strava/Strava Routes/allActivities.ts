import axios from 'axios';
import { Router, Request, Response } from 'express';
import { condenseRawActivity } from '../Strava Helper Functions/condenseRawActivity';
import { StravaActivity } from '../../types/Strava Types/StravaActivity';


const getStravaActivities = async (accessToken: string) => {
  try {
    const response = await axios.get('https://www.strava.com/api/v3/athlete/activities', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        'per_page': 200,
        'page':1
      },
    });
    return response.data; // Returns the list of activities
  } catch (error: any) {
    console.error('Error fetching activities from Strava:', error.response?.data || error.message);
    throw new Error('Failed to fetch Strava activities');
  }
};

const router = Router();

// Activities route, gets the last 200 activities
router.get('/activities', async (req: Request, res: Response) => {
    console.log("strava/activities starting...")
  if (!req.user) {
    res.status(401).json({ error: 'User not authenticated' });
  }
  else{
    try {
        const user = req.user as any;
        const accessToken = user.token; 
        console.log("going ahead with access token, ", accessToken)
        const activities = await getStravaActivities(accessToken);
        const returningList:StravaActivity[] = condenseRawActivity(activities)
        res.json(returningList); // Return activities as JSON
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch activities' });
      }
  }



});

export default router;