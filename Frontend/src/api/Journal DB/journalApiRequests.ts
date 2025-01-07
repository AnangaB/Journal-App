import { JournalEntryList } from "@/src/types/common/JournalEntryTypes";
import { dbClient } from "./dbCient";


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
      if (Array.isArray(response.data)) {
        setEntries(response.data);
        console.log("Entries updated successfully:", response.data);
      } else {
        console.log("Unexpected API response format:", response.data);
        setEntries([]); // Fallback to an empty array
      }
    } catch (error: any) {
      console.log("Error fetching journal entries:", error.message);
    }
  };

  export const sendForm = async (selectedDate:Date,journalText:string) => {
    try {
      console.log(`addNewJournalEntry/${selectedDate.toLocaleDateString("en-CA")}/${journalText}`
      );
      // Make the API call to the backend to add the journal entry
      console.log("about to send post request to api with: " ,selectedDate, journalText)
      const response = await dbClient.post("/addNewJournalEntry", {
        date: selectedDate.toLocaleDateString("en-CA"),
        text: journalText,
      });

      if (response.data.message === "Row added Successfully!") {
        return "Row added Successfully!";
      } else {
        return "Error";
      }
    } catch (error: any) {
      console.log("Error in adding journal entry:", error);
    }
    return "Error";
  };