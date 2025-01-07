import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

type formDataType = {
  date: Date;
  text: string;
};

type EntryFormProps = {
  selectedDate: Date;
  setSelectedDate: (d: Date) => void;
  setJournalText: (s: string) => void;
};

const EntryForm = ({
  selectedDate,
  setSelectedDate,
  setJournalText,
}: EntryFormProps) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const toggleShowDatePicker = () => {
    setShowDatePicker((prev) => !prev);
  };

  const handleDateChange = (event: any, date?: Date) => {
    if (date) {
      setSelectedDate(date);
    }
    setShowDatePicker(false);
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        style={{ marginBottom: 10 }}
        label="Date"
        value={selectedDate.toDateString()}
        onPressIn={toggleShowDatePicker}
        autoFocus={true}
        inputMode="none"
      />

      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={selectedDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
        />
      )}

      <TextInput
        style={{ marginBottom: 10, height: 300 }}
        multiline={true}
        label="Journal Text"
        onChangeText={(text) => setJournalText(text)}
      />

      <Button mode="contained" style={{ marginBottom: 10 }}>
        Add Media
      </Button>
      <Button mode="contained" style={{ marginBottom: 10 }}>
        Import all Media from this date
      </Button>
    </View>
  );
};

export default EntryForm;
