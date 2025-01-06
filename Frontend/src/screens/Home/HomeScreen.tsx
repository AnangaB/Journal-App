import { View, ScrollView } from "react-native";
import React from "react";
import DayDisplay from "@/src/components/JournalPage/JournalPageContainer";
import Header from "@/src/components/Header/header";

const localAssets = {
  img: require("@/assets/images/icon.png"),
  img1: require("@/assets/images/favicon.png"),
  img2: require("@/assets/images/adaptive-icon.png"),
};

type HomeScreenProps = {
  navigation: any;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const entries = [
    {
      date: new Date(),
      journalText:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam consequuntur, inventore corrupti alias voluptates odit obcaecati consequatur voluptate natus neque non aliquid sit esse magnam provident eligendi. Et, aliquid corrupti.",
    },
    {
      date: new Date(),
      journalText:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam consequuntur, inventore corrupti alias voluptates odit obcaecati consequatur voluptate natus neque non aliquid sit esse magnam provident eligendi. Et, aliquid corrupti.",
    },
    {
      date: new Date(),
      journalText:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam consequuntur, inventore corrupti alias voluptates odit obcaecati consequatur voluptate natus neque non aliquid sit esse magnam provident eligendi. Et, aliquid corrupti.",
    },
    {
      date: new Date(),
      journalText:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam consequuntur, inventore corrupti alias voluptates odit obcaecati consequatur voluptate natus neque non aliquid sit esse magnam provident eligendi. Et, aliquid corrupti.",
    },
  ];
  const medias = [
    localAssets["img"],
    localAssets["img1"],
    localAssets["img2"],
    localAssets["img"],
    localAssets["img1"],
    localAssets["img2"],
  ];

  return (
    <View style={{ flex: 1 }}>
      <Header navigation={navigation} />

      <ScrollView>
        {entries.map((entry, index) => (
          <DayDisplay
            key={index}
            date={entry.date}
            journalText={entry.journalText}
            medias={medias}
          />
        ))}
      </ScrollView>
    </View>
  );
}
