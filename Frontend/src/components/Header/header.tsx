import React from "react";
import { useState } from "react";
import { View } from "react-native";
import { Appbar, Button, Dialog, Portal, Text } from "react-native-paper";
import DialogBox from "../common/DialogBox/ClickDoneDialogBox";

type HeaderProps = {
  isCreateNewEntryPage?: boolean;
  navigation: any;
  sendForm?: () => Promise<string>;
};

export default function Header({
  isCreateNewEntryPage,
  navigation,
  sendForm = async () => "",
}: HeaderProps) {
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

  const handleSavingEntry = async () => {
    try {
      const result = await sendForm();
      console.log("handleSavingEntry: ", result);
      if (result == "Row added Successfully!") {
        setShowErrorMessage(false);
        console.log("Navigating to home page.");
        navigation.navigate("Home");
      } else {
        setShowErrorMessage(true);
        console.log("Unable to add row");
      }
    } catch (error) {
      console.error("Error in handleSavingEntry:", error);
    }
  };

  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="Journal App" />
        <Appbar.Action
          icon={isCreateNewEntryPage ? "content-save" : "plus"}
          onPress={
            isCreateNewEntryPage
              ? () => handleSavingEntry()
              : () => navigation.navigate("Entry Page")
          }
        />
      </Appbar.Header>

      <DialogBox
        shouldMessageDisplay={showErrorMessage}
        hideMessage={() => setShowErrorMessage(false)}
        messageText={
          " There is already an entry with that date, please try again with another date."
        }
      ></DialogBox>
    </View>
  );
}
