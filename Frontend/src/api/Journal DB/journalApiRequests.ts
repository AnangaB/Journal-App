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

      console.log("API Response:", response.data);

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

  /** Adds a new journal entry to db
   * 
   * @param selectedDate Date of a new entry.
   * @param journalText Journal text for the new entry.
   * @returns  A string indicating the result of the operation.
   */
  export const addNewJournalEntryToDB: (d:Date,j:string) => Promise<string> = async (selectedDate:Date,journalText:string) => {
    try {

      // Make the API call to the backend to add the journal entry
      console.log("about to send post request to api with: " ,selectedDate, journalText)
      const response = await dbClient.post("/addNewJournalEntry", {
        date: selectedDate.toLocaleDateString("en-CA"),
        text: journalText,
      });
      console.log("Received from post request: ", response.data.message)

      if (response.status == 200) {
        return "Row added Successfully!";
      } else if (response.status == 400) {
        return "Error: Entry with that date already exists.";
      }
    } catch (error: any) {
      console.log("Error in adding journal entry:", error);
    }
    return "Error: Unable to connect with the API.";
  };


  /** Edits an existing row's journal text and media values in the database. The date value is used to find the specific row in the database.
   * 
   * @param selectedDate - The date of the journal entry to modify.
   * @param journalText - The new text of the journal entry to add.
   * @returns  A string indicating the result of the operation.
   */
  export const editJournalEntryInDB = async (selectedDate:Date,journalText:string) => {
    try {

      // Make the API call to the backend to update the journal entry
      console.log("about to send post request to api with: " ,selectedDate, journalText)
      const response = await dbClient.post("/editRow", {
        date: selectedDate.toLocaleDateString("en-CA"),
        text: journalText,
      });

      if (response.data.message === "Row updated!") {
        return "Row updated!";
      } else {
        return "Error updating row";
      }
    } catch (error: any) {
      console.log("Error in updating journal entry:", error);
      return "Error connecting to the DB when updating row.";

    }
  };

  /**
 * Deletes a journal entry from the database. The date value is used to find the specific row in the database.
 *
 * @param selectedDate - The date of the journal entry to delete.
 * @returns A string indicating the result of the operation.
 */
export const deleteJournalEntryFromDB = async (selectedDate: Date): Promise<string> => {
    try {
        // Make the API call to the backend to delete the journal entry
        console.log("About to send delete request to API with: ", selectedDate);
        const response = await dbClient.post("/deleteRow", {
        date: new Date(selectedDate).toLocaleDateString("en-CA"),
        });
  
        if (response.status === 200 && response.data.message === "Row deleted successfully!") {
            return "Row deleted successfully!";
        } else if (response.status === 400) {
            return "Invalid request: " + response.data.error;
        } else if (response.status === 404) {
            return "Row not found: " + response.data.message;
        } else {
            return `Unhandled response status ${response.status}: ${response.data.error || response.data.message}`;
        }
    } catch (error: any) {
      console.error("Error in deleting journal entry:", error);
  
      if (error.response) {
        // Handle errors returned from the server
        return `Server error: ${error.response.status} - ${error.response.data.error || error.response.data.message}`;
      }
  
      // Handle network or unexpected errors
      return "Error connecting to the DB when deleting row.";
    }
  };