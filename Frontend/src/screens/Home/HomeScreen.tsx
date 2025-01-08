import { View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import DayDisplay from "@/src/components/JournalPage/JournalPageContainer";
import Header from "@/src/components/Header/header";
import { JournalEntryList } from "@/src/types/common/JournalEntryTypes";
import { getAllJournalEntries } from "@/src/api/Journal DB/journalApiRequests";
const localAssets = {
  img: require("@/assets/images/icon.png"),
  img1: require("@/assets/images/favicon.png"),
  img2: require("@/assets/images/adaptive-icon.png"),
};

type HomeScreenProps = {
  navigation: any;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [entries, setEntries] = useState<JournalEntryList>([]);

  useEffect(() => {
    getAllJournalEntries(setEntries);
  }, [entries]);

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
              medias={[]}
            />
          ))}
      </ScrollView>
    </View>
  );
}
