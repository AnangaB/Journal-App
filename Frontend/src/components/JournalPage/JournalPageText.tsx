import React from "react";
import { View } from "react-native";
import { Text, TextInput } from "react-native-paper";

type JournalPageTextProps = {
  journalText: string;
  isEditMode: boolean;
};

const JournalPageText = (props: JournalPageTextProps) => {
  const [text, setText] = React.useState<string>(props.journalText);
  return (
    <View style={{ width: "100%", padding: 5 }}>
      {props.isEditMode == false ? (
        <Text variant="bodyMedium">{text}</Text>
      ) : (
        <TextInput
          style={{ height: 300 }}
          label="Edit Text"
          value={text}
          multiline={true}
          onChangeText={(text) => setText(text)}
        />
      )}
    </View>
  );
};
export default JournalPageText;
