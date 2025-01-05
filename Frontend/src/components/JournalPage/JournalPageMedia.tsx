import { View, Image } from "react-native";
type JournalPageMediaProps = {
  medias: any[];
};

const JournalPageMedia = (props: JournalPageMediaProps) => {
  return (
    <View
      style={{
        width: "100%",
        marginTop: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      {props.medias &&
        props.medias.map((media, i) => (
          <Image
            style={{ width: 100, height: 100, resizeMode: "contain" }}
            key={i}
            source={media}
          />
        ))}
    </View>
  );
};

export default JournalPageMedia;
