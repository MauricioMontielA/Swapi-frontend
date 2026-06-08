// app/(tabs)/home/_layout.tsx

import { Stack } from 'expo-router'

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: 'Home' }}
      />
    </Stack>
  )
}