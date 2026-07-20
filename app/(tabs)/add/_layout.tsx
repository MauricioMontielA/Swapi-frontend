import { Stack } from 'expo-router'

export default function AddLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="select-collection"
        options={{
          title: 'Add',
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="items"
        options={{
          title: 'Add',
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="MatchesProposals"
        options={{ title: 'Trade suggestions', headerShown: true }}
      />

      <Stack.Screen
        name="MatchesDetails"
        options={{ title: 'Trade details', headerShown: true }}
      />

      <Stack.Screen
        name="no-matches"
        options={{ title: 'Trade suggestions', headerShown: true }}
      />
    </Stack>
  )
}
