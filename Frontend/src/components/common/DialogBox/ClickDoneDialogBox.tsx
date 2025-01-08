import React from "react";
import { Portal, Dialog, Text, Button } from "react-native-paper";

type ClickDoneDialogBoxProps = {
  shouldMessageDisplay: boolean;
  hideMessage: () => void;
  messageText: string;
};

const ClickDoneDialogBox = ({
  shouldMessageDisplay,
  hideMessage,
  messageText,
}: ClickDoneDialogBoxProps) => {
  return (
    <Portal>
      <Dialog visible={shouldMessageDisplay} onDismiss={hideMessage}>
        <Dialog.Title>Error</Dialog.Title>
        <Dialog.Content>
          <Text>{messageText}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideMessage}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ClickDoneDialogBox;
