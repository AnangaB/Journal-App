import { StravaActivity } from "../../types/Strava Types/StravaActivity";
/**Converts raw strava data and only returns the relevant values in type StravaActivity
 * 
 * @param activities raw activity data as returned by Strava API
 * @returns 
 */
export function condenseRawActivity(activities:any){

     const returningList:StravaActivity[] = activities.map((e: { name: any; distance: any; type: any; total_elevation_gain: any; }) => {
          return {
            name: e.name,
            distance: e.distance,
            type: e.type,
            total_elevation_gain: e.total_elevation_gain}
        });
        
       return returningList;
}