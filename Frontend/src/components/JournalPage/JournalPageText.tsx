import React from "react";
import { View } from "react-native";
import { Text, TextInput } from "react-native-paper";

type JournalPageTextProps = {
  journalText: string;
  isEditMode: boolean;
  setJournalText: (s: string) => void;
};

const JournalPageText = ({
  journalText,
  isEditMode,
  setJournalText,
}: JournalPageTextProps) => {
  return (
    <View style={{ width: "100%", padding: 5 }}>
      {isEditMode == false ? (
        <Text variant="bodyMedium">{journalText}</Text>
      ) : (
        <TextInput
          style={{ height: 300 }}
          label="Edit Text"
          value={journalText}
          multiline={true}
          onChangeText={(text) => setJournalText(text)}
        />
      )}
    </View>
  );
};
export default JournalPageText;
