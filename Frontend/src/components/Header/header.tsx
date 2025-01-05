import * as React from "react";
import { Appbar } from "react-native-paper";
type HeaderProps = {
  isCreateNewEntryPage?: boolean;
  navigation: any;
};

export default function Header({
  isCreateNewEntryPage,
  navigation,
}: HeaderProps) {
  function addJournalNewEntry() {}

  return (
    <Appbar.Header>
      <Appbar.Content title="Journal App" />
      <Appbar.Action
        icon={isCreateNewEntryPage ? "content-save" : "plus"}
        onPress={
          isCreateNewEntryPage
            ? () => navigation.navigate("Home")
            : () => navigation.navigate("Entry Page")
        }
      />
    </Appbar.Header>
  );
}
