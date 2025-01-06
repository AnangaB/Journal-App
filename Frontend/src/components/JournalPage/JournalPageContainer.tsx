import React, { useState } from "react";
import { View, Image } from "react-native";
import JournalPageHeader from "./JournalPageHeader";
import JournalPageMedia from "./JournalPageMedia";
import JournalPageText from "./JournalPageText";

type DayDisplayProps = {
  date: Date;
  journalText: string;
  medias: any[];
};

const DayDisplay = (props: DayDisplayProps) => {
  const [isPageEditMode, setPageEditMode] = useState<boolean>(false);

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
        date={props.date}
        setPageEditMode={setPageEditMode}
        isPageEditMode={isPageEditMode}
      />
      <JournalPageText
        isEditMode={isPageEditMode}
        journalText={props.journalText}
      />
      <JournalPageMedia medias={props.medias} />
    </View>
  );
};

export default DayDisplay;
