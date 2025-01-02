import React from "react";
import { Text, View, Image, ImageSourcePropType } from "react-native";

type DayDisplayProps = {
  date: string;
  journalText: string;
};

const DayDisplay = (props: DayDisplayProps) => {
  return (
    <View
      style={{
        alignItems: "center",
        width: "90%",
        backgroundColor: "#F5ECD5",
        alignSelf: "center",
        padding: 20,
        marginTop: 10,
      }}
    >
      <Text style={{ textAlign: "left", width: "100%", marginBottom: 5 }}>
        {props.date}
      </Text>
      <Text>{props.journalText}</Text>
    </View>
  );
};

export default DayDisplay;
