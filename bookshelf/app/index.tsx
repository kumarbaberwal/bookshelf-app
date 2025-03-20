import { useAuthStore } from "@/store/authStore";
import { Link } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const { user, token, checkAuth, logout } = useAuthStore();
  useEffect(() => {
    checkAuth();
  })
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
        <Text>
          Login Screen
        </Text>
        <Text>
          User: {user?.username}
        </Text>
        <Text>
          Token: {token}
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
