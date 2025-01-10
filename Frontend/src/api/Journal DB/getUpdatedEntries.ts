import { JournalEntry, JournalEntryList } from "@/src/types/common/JournalEntryTypes";
import { dbClient } from "./dbCient";

/** Function that makes call to the DB and returns a list of all journal entries that have been updated since the specified time
 * 
 * @param setEntries a setter function for entries (of type JournalEntryList) state
 */

export const updateJournalList = async (
  lastModified: Date,
  currentEntries: JournalEntry[],
  setEntries: (entries: JournalEntry[]) => void,
  setUpdateTime: (time: Date) => void
): Promise<JournalEntry[]> => {

  try {
    console.log("updateJournalList() Fetching updated journal entries from API...");

    // Fetch updated journal entries
    const response = await dbClient.post<JournalEntry[]>('/getUpdatedJournalEntries', {
      lastModified: lastModified.toISOString(),
    });

    if (response.status === 200 && Array.isArray(response.data)) {
      console.log("updateJournalList() Fetched entries from API:", response.data);

      // Merge existing entries with new entries
      const newEntries = response.data;

      // Use a Map to merge entries by date as unique idf
      const mergedEntriesMap = new Map<Date, JournalEntry>(
        [...currentEntries, ...newEntries].map((entry) => [entry.date, entry])
      );

      // Convert merged map back to an array
      const mergedEntries = Array.from(mergedEntriesMap.values());

      mergedEntries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      console.log("Merged and sorted entries:", mergedEntries);

      // Update the states
      setEntries(mergedEntries);
      const newLastModified = new Date();
      setUpdateTime(newLastModified);

      return mergedEntries;
    } else if (response.status === 400) {
      console.error("Bad request from API:", response.data);
    } else {
      console.warn("Unexpected API response:", response);
    }
  } catch (error: any) {
    console.error("Error fetching journal entries:", error.message);
  }

  // Fallback to the existing entries on error
  return currentEntries;
};
