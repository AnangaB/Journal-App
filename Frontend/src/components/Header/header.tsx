import React from "react";
import { useState } from "react";
import { Appbar, Modal, PaperProvider, Portal, Text } from "react-native-paper";
type HeaderProps = {
  isCreateNewEntryPage?: boolean;
  navigation: any;
  sendForm?: () => Promise<boolean>;
};

export default function Header({
  isCreateNewEntryPage,
  navigation,
  sendForm = async () => false,
}: HeaderProps) {
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

  const handleSavingEntry = async () => {
    try {
      const result = await sendForm();

      if (result) {
        setShowErrorMessage(false);
        navigation.navigate("Entry Page");
      } else {
        setShowErrorMessage(true);
        console.log("Unable to add row");
      }
    } catch (error) {
      console.error("Error in handleSavingEntry:", error);
    }
  };

  return (
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
  );
}
