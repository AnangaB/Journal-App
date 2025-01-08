import { deleteJournalEntryFromDB } from "@/src/api/Journal DB/journalApiRequests";
import { useState } from "react";
import { View } from "react-native";
import { Appbar } from "react-native-paper";
import YesNoDialogBox from "../common/DialogBox/YesNoDialogBox";

type JournalPageHeaderProps = {
  date: Date;
  setPageEditMode: any;
  isPageEditMode: boolean;
  saveEntry: () => void;
};

const JournalPageHeader = ({
  date,
  setPageEditMode,
  isPageEditMode,
  saveEntry,
}: JournalPageHeaderProps) => {
  function formatDate(d: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return new Intl.DateTimeFormat("en-US", options).format(d);
  }

  function toggleEditButton() {
    if (isPageEditMode) {
      saveEntry();
      setPageEditMode(false);
    } else {
      setPageEditMode(true);
    }
  }

  const [shouldDisplayDeleteDialog, setShouldDisplayDeleteDialog] =
    useState<boolean>(false);
  return (
    <View style={{ width: "100%" }}>
      <Appbar.Header style={{ backgroundColor: "#F5ECD5" }}>
        <Appbar.Content
          title={formatDate(date)}
          titleStyle={{ fontSize: 18 }}
        />
        <Appbar.Action
          icon={"trash-can"}
          onPress={() => setShouldDisplayDeleteDialog(true)}
        />

        <Appbar.Action
          icon={isPageEditMode == false ? "note-edit-outline" : "content-save"}
          onPress={toggleEditButton}
        />
      </Appbar.Header>

      <YesNoDialogBox
        shouldMessageDisplay={shouldDisplayDeleteDialog}
        hideMessage={() => setShouldDisplayDeleteDialog(false)}
        onPressYes={() => {
          deleteJournalEntryFromDB(date);
          setShouldDisplayDeleteDialog(false);
        }}
        onPressNo={() => {
          setShouldDisplayDeleteDialog(false);
        }}
        messageText={"Are you sure you want to delete this?"}
      ></YesNoDialogBox>
    </View>
  );
};

export default JournalPageHeader;
