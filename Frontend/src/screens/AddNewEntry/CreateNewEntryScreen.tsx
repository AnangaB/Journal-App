import { View } from "react-native";
import Header from "../../components/Header/header";
import EntryForm from "../../components/Forms/EntryForm";
import { useState } from "react";
import axios from "axios";
import { PaperProvider } from "react-native-paper";

type CreateNewEntryPageProps = {
  navigation: any;
};

const CreateNewEntryScreen = ({ navigation }: CreateNewEntryPageProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [journalText, setJournalText] = useState<string>("");

  console.log("journalText", journalText);

  const sendForm = async () => {
    try {
      console.log(
        `${
          process.env.EXPO_PUBLIC_API_ADDRESS
        }/api/addNewJournalEntry/${selectedDate.toLocaleDateString(
          "en-CA"
        )}/${journalText}`
      );
      console.log("response.data.message: ");
      // Make the API call to the backend to add the journal entry

      const response = await axios.get(
        `${
          process.env.EXPO_PUBLIC_API_ADDRESS
        }/api/addNewJournalEntry/${selectedDate.toLocaleDateString(
          "en-CA"
        )}/${journalText}`
      );
      console.log(response.data.message);

      if (response.data.message === "Row added Successfully!") {
        return "Row added Successfully!";
      } else {
        return "Error";
      }
    } catch (error: any) {
      console.error("Error in adding journal entry:", error);
      console.error("Error:", error.message, error.config);
    }
    return "Error";
  };

  return (
      <View>
        <Header
          isCreateNewEntryPage={true}
          navigation={navigation}
          sendForm={sendForm}
        />
        <EntryForm
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          journalText={journalText}
          setJournalText={setJournalText}
        />
      </View>
  );
};

export default CreateNewEntryScreen;
