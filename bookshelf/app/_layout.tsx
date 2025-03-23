import SafeScreen from "@/components/SafeScreen";
import { useAuthStore } from "@/store/authStore";
import { SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from 'expo-font'

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const { checkAuth, user, token } = useAuthStore();

  const [fontsLoaded] = useFonts({
    "JetBrainsMono-Medium": require('@/assets/fonts/JetBrainsMonoNL-Medium.ttf')
  })

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded])

  useEffect(() => {
    checkAuth();
  }, [])

  useEffect(() => {
    const inAuthScreen = segments[0] === '(auth)';
    const isSignedIn = !!user && !!token;
    if (!isSignedIn && !inAuthScreen) {
      router.replace("/(auth)");
    } else if (isSignedIn && inAuthScreen) {
      router.replace("/(tabs)");
    }
  }, [user, token, segments])

  // console.log(segments)



  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Stack
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name='(tabs)' />
          <Stack.Screen name='(auth)' />
        </Stack>
      </SafeScreen>
      <StatusBar style={'dark'} />
    </SafeAreaProvider>
  )
}
