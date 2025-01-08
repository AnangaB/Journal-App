import React from "react";
import { Portal, Dialog, Text, Button } from "react-native-paper";

type YesNoDialogBoxProps = {
  shouldMessageDisplay: boolean;
  hideMessage: () => void;
  onPressYes: () => void;
  onPressNo: () => void;
  messageText: string;
};

const YesNoDialogBox = ({
  shouldMessageDisplay,
  hideMessage,
  onPressYes,
  onPressNo,
  messageText,
}: YesNoDialogBoxProps) => {
  return (
    <Portal>
      <Dialog visible={shouldMessageDisplay} onDismiss={hideMessage}>
        <Dialog.Content>
          <Text>{messageText}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onPressYes}>Yes</Button>
          <Button onPress={onPressNo}>No</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default YesNoDialogBox;
