import { config } from '@/tamagui.config'
import { Stack } from 'expo-router'
import { TamaguiProvider } from 'tamagui'

export default function RootLayout() {
  return (
    <TamaguiProvider config={config} defaultTheme="light">
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </TamaguiProvider>
  )
}