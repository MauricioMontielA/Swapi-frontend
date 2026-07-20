import { router, useLocalSearchParams } from 'expo-router'
import { ScrollView } from 'react-native'
import { YStack } from 'tamagui'

import NoMatchesEmptyState from '@/components/matches/NoMatchesEmptyState'

export default function NoMatchesScreen() {
  const params = useLocalSearchParams<{
    collectionId?: string
    collectionName?: string
    collectionDescription?: string
  }>()

  const addMore = () => {
    if (!params.collectionId) {
      router.replace('/(tabs)/add/select-collection' as any)
      return
    }

    router.push({ pathname: '/(tabs)/add/items', params } as any)
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: '#f8f9ff' }}
      contentContainerStyle={{
        padding: 16,
        paddingBottom: 40,
      }}
    >
      <YStack gap="$8">
        <NoMatchesEmptyState
          onAddMore={addMore}
        />
      </YStack>
    </ScrollView>
  )
}
