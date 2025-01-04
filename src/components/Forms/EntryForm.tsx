import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

const EntryForm = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

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
