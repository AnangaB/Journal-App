import { JournalEntryList } from "@/src/types/common/JournalEntryTypes";
import { dbClient } from "./dbCient";

/** Function that makes call to the DB and retrieves all journal entries and uses the param useState function setEntries to set a entries state 
 * 
 * @param setEntries a setter function for entries (of type JournalEntryList) state
 */
export const getAllJournalEntries = async (setEntries:(j:JournalEntryList) => void) => {
    
    
    try {
      await dbClient.get<JournalEntryList>('/makeNewTableRoute');
    } catch (error: any) {
      console.log(
        "Error in making new table or check if table already exists.",
        error.message
      );
    }

    try {
      console.log("Fetching journal entries from API...");
      const response = await dbClient.get<JournalEntryList>('/getAllJournalEntries');

      console.log("getAllJournalEntries() API Response:", response.data);

      // Set entries state only if response data is an array
      if (response.status == 200 && Array.isArray(response.data)) {
        setEntries(response.data);
        console.log("Entries updated successfully:", response.data);
      } else if (response.status == 400){
        console.log("Error finding the row with the specified date and recieved from API:", response.data);
        setEntries([]); // Fallback to an empty array
      }
    } catch (error: any) {
      console.log("Error fetching journal entries:", error.message);
    }
  };
