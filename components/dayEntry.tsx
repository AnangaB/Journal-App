import React from "react";
import { Text, View, Image, ImageSourcePropType } from "react-native";

type DayDisplayProps = {
  date: string;
  journalText: string;
  medias: any[];
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
      <View
        style={{
          width: "100%",
          marginTop: 10,
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        {props.medias.length > 0 &&
          props.medias.map((media, i) => (
            <Image
              style={{ width: 100, height: 100, resizeMode: "contain" }}
              key={i}
              source={media}
            />
          ))}
      </View>
    </View>
  );
};

export default DayDisplay;
