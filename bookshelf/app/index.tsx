import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Link href={'/(auth)'} >
        <Text>~
          Login Screen
        </Text>
      </Link>
      <Link href={'/(auth)/signup'} >
        <Text>
          Signup Screen
        </Text>
      </Link>
    </View>
  );
}
