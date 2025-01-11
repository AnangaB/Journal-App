
/** Function that makes call to the DB and returns a list of all journal entries that have been updated since the specified time
 * 
 * @param setEntries a setter function for entries (of type JournalEntryList) state
 */

import { StravaActivity } from "@/src/types/Strava Types/StravaActivity";
import { stravaClient } from "./stravaClient";

export const getActivityByDate = async (date: Date): Promise<StravaActivity[]> => {

    console.log("getActivityByDate() Fetching from API activity for date, ", date.toISOString().split('T')[0]);
    try{
    // Fetch updated journal entries
    const response = await stravaClient.post('/activitiesForDate', {
        date: date.toISOString().split('T')[0]
    });

    if (response.status === 200 && Array.isArray(response.data)) {
      console.log("getActivityByDate() Fetched entries from API:", response.data);

      return response.data;
    } else {
        console.error(`Error: Status: ${response.status}, Message: ${response.data || response.statusText}`);
      }
    } catch (e:any) {
        console.error(`Error fetching data: ${e.message || e}`);
    }

    return [];
}

/*

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
*/