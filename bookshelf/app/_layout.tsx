import SafeScreen from "@/components/SafeScreen";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <SafeScreen>
                <Stack
                    screenOptions={{ headerShown: false }}
                >
                    <Stack.Screen name='index' />
                    <Stack.Screen name='(auth)' />
                </Stack>
            </SafeScreen>
            <StatusBar style={'dark'} />
        </SafeAreaProvider>
    )
}
