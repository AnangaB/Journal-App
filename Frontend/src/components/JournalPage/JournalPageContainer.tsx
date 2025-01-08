import React, { useState } from "react";
import { View, Image } from "react-native";
import JournalPageHeader from "./JournalPageHeader";
import JournalPageMedia from "./JournalPageMedia";
import JournalPageText from "./JournalPageText";
import { editJournalEntryInDB } from "@/src/api/Journal DB/journalApiRequests";

type DayDisplayProps = {
  date: Date;
  text: string;
  medias: any[];
};

const DayDisplay = ({ date, text, medias }: DayDisplayProps) => {
  const [isPageEditMode, setPageEditMode] = useState<boolean>(false);
  const [journalText, setJournalText] = useState<string>(text);

  
  return (
    <View
      style={{
        alignItems: "center",
        width: "90%",
        backgroundColor: "#F5ECD5",
        alignSelf: "center",
        marginBottom: 5,
        marginTop: 5,
      }}
    >
      <JournalPageHeader
        date={date}
        setPageEditMode={setPageEditMode}
        isPageEditMode={isPageEditMode}
        saveEntry={() => editJournalEntryInDB(date, text)}
      />
      <JournalPageText
        isEditMode={isPageEditMode}
        journalText={journalText}
        setJournalText={setJournalText}
      />
      <JournalPageMedia medias={medias} />
    </View>
  );
};

export default DayDisplay;
