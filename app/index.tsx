import DayDisplay from "@/components/dayEntry";
import Header from "@/components/header";
import { View, ScrollView } from "react-native";
import React from "react";

const localAssets = {
  img: require("../assets/images/icon.png"),
  img1: require("../assets/images/favicon.png"),
  img2: require("../assets/images/adaptive-icon.png"),
};

export default function Index() {
  const entries = [
    {
      date: "Jan 1, 2025",
      journalText:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam consequuntur, inventore corrupti alias voluptates odit obcaecati consequatur voluptate natus neque non aliquid sit esse magnam provident eligendi. Et, aliquid corrupti.",
    },
    {
      date: "Jan 1, 2025",
      journalText:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam consequuntur, inventore corrupti alias voluptates odit obcaecati consequatur voluptate natus neque non aliquid sit esse magnam provident eligendi. Et, aliquid corrupti.",
    },
    {
      date: "Jan 1, 2025",
      journalText:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam consequuntur, inventore corrupti alias voluptates odit obcaecati consequatur voluptate natus neque non aliquid sit esse magnam provident eligendi. Et, aliquid corrupti.",
    },
    {
      date: "Jan 1, 2025",
      journalText:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam consequuntur, inventore corrupti alias voluptates odit obcaecati consequatur voluptate natus neque non aliquid sit esse magnam provident eligendi. Et, aliquid corrupti.",
    },
    {
      date: "Jan 1, 2025",
      journalText:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam consequuntur, inventore corrupti alias voluptates odit obcaecati consequatur voluptate natus neque non aliquid sit esse magnam provident eligendi. Et, aliquid corrupti.",
    },
    {
      date: "Jan 1, 2025",
      journalText:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam consequuntur, inventore corrupti alias voluptates odit obcaecati consequatur voluptate natus neque non aliquid sit esse magnam provident eligendi. Et, aliquid corrupti.",
    },
    {
      date: "Jan 1, 2025",
      journalText:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam consequuntur, inventore corrupti alias voluptates odit obcaecati consequatur voluptate natus neque non aliquid sit esse magnam provident eligendi. Et, aliquid corrupti.",
    },
    {
      date: "Jan 1, 2025",
      journalText:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam consequuntur, inventore corrupti alias voluptates odit obcaecati consequatur voluptate natus neque non aliquid sit esse magnam provident eligendi. Et, aliquid corrupti.",
    },
    {
      date: "Jan 1, 2025",
      journalText:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam consequuntur, inventore corrupti alias voluptates odit obcaecati consequatur voluptate natus neque non aliquid sit esse magnam provident eligendi. Et, aliquid corrupti.",
    },
  ];
  const medias = [localAssets["img"], localAssets["img1"], localAssets["img2"]];
  return (
    <View style={{ flex: 1 }}>
      <Header />

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
