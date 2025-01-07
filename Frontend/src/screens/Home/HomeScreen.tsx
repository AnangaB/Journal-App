import { View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import DayDisplay from "@/src/components/JournalPage/JournalPageContainer";
import Header from "@/src/components/Header/header";
import { PaperProvider } from "react-native-paper";
import axios from "axios";

const localAssets = {
  img: require("@/assets/images/icon.png"),
  img1: require("@/assets/images/favicon.png"),
  img2: require("@/assets/images/adaptive-icon.png"),
};

type HomeScreenProps = {
  navigation: any;
};

type journalEntry = {
  date: Date;
  text: string;
  medias: string[];
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [entries, setEntries] = useState<journalEntry[]>([]);
  const getAllJournalEntries = async () => {
    try {
      console.log("Fetching journal entries from API...");
      const response = await axios.get<journalEntry[]>(
        `${process.env.EXPO_PUBLIC_API_ADDRESS}/api/getAllJournalEntries`
      );
      console.log("API Response:", response.data);

      // Set entries state only if response data is an array
      if (Array.isArray(response.data)) {
        setEntries(response.data);
        console.log("Entries updated successfully:", response.data);
      } else {
        console.error("Unexpected API response format:", response.data);
        setEntries([]); // Fallback to an empty array
      }
    } catch (error: any) {
      console.error("Error fetching journal entries:", error.message);
    }
  };

  useEffect(() => {
    getAllJournalEntries();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <Header navigation={navigation} />

      <ScrollView>
        {entries &&
          entries.map((entry, index) => (
            <DayDisplay
              key={index}
              date={new Date(entry["date"])}
              journalText={entry["text"]}
              medias={[]}
            />
          ))}
      </ScrollView>
    </View>
  );
}
