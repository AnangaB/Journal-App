import { View } from "react-native";
import Header from "../../components/Header/header";
import EntryForm from "../../components/Forms/EntryForm";
import { useState } from "react";
import { addNewJournalEntryToDB } from "@/src/api/Journal DB/journalApiRequests";

type CreateNewEntryPageProps = {
  navigation: any;
};

const CreateNewEntryScreen = ({ navigation }: CreateNewEntryPageProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [journalText, setJournalText] = useState<string>("");

  console.log("journalText", journalText);

  const sendFormWrapper: () => Promise<string> = async () => {
    const result = await addNewJournalEntryToDB(selectedDate, journalText);
    console.log("Result from SendFormWrapper: ", result);
    return result;
  };
  return (
    <View>
      <Header
        isCreateNewEntryPage={true}
        navigation={navigation}
        sendForm={sendFormWrapper}
      />
      <EntryForm
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        setJournalText={setJournalText}
      />
    </View>
  );
};

export default CreateNewEntryScreen;
