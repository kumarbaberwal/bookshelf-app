import { colors } from '@/constants/colors';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function SafeScreen({ children }: { children: React.ReactNode }) {
  const insets = useSafeAreaInsets();
  // console.log(insets.top);
  return (
    <View
      style={[styles.container, { paddingTop: insets.top }]}
    >
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  }
})