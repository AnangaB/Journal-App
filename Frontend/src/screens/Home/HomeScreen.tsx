import { View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import DayDisplay from "@/src/components/JournalPage/JournalPageContainer";
import Header from "@/src/components/Header/header";
import { JournalEntryList } from "@/src/types/common/JournalEntryTypes";
import { updateJournalList } from "@/src/api/Journal DB/getUpdatedEntries";
import { getAllJournalEntries } from "@/src/api/Journal DB/getAllJournalEntries";

type HomeScreenProps = {
  navigation: any;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [entries, setEntries] = useState<JournalEntryList>([]);

  const [lastModified, setLastModified] = useState<Date>(new Date());

  useEffect(() => {
    getAllJournalEntries(setEntries);
  }, [lastModified]);

  return (
    <View style={{ flex: 1 }}>
      <Header navigation={navigation} />

      <ScrollView>
        {entries &&
          entries.map((entry, index) => (
            <DayDisplay
              key={index}
              date={new Date(entry["date"])}
              text={entry["text"]}
              setLastModified={setLastModified}
              medias={[]}
            />
          ))}
      </ScrollView>
    </View>
  );
}
