import { View } from "react-native";
import Header from "../../components/Header/header";
import EntryForm from "../../components/Forms/EntryForm";

type CreateNewEntryPageProps = {
  navigation: any;
};

const CreateNewEntryScreen = ({ navigation }: CreateNewEntryPageProps) => {
  return (
    <View>
      <Header isCreateNewEntryPage={true} navigation={navigation} />
      <EntryForm />
    </View>
  );
};

export default CreateNewEntryScreen;
