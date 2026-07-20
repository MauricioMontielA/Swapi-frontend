import { TradesProvider } from "@/context/TradesContext";
import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <TradesProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ title: 'Trades', headerShown: true }}
        />
        <Stack.Screen
          name="[id]"
          options={{
            title: 'Trade details',
            headerShown: true,
            presentation: 'card',
          }}
        />
      </Stack>
    </TradesProvider>

  )
}
