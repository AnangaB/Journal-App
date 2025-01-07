import { View } from "react-native";
import { Appbar } from "react-native-paper";
type JournalPageHeaderProps = {
  date: Date;
  setPageEditMode: any;
  isPageEditMode: boolean;
};

const JournalPageHeader = (props: JournalPageHeaderProps) => {
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
    if (props.isPageEditMode) {
      props.setPageEditMode(false);
    } else {
      props.setPageEditMode(true);
    }
  }

  return (
    <View style={{ width: "100%" }}>
      <Appbar.Header style={{ backgroundColor: "#F5ECD5" }}>
        <Appbar.Content
          title={formatDate(props.date)}
          titleStyle={{ fontSize: 18 }}
        />
        <Appbar.Action
          icon={
            props.isPageEditMode == false ? "note-edit-outline" : "content-save"
          }
          onPress={toggleEditButton}
        />
      </Appbar.Header>
    </View>
  );
};

export default JournalPageHeader;
