import { router } from 'expo-router'
import { ScrollView } from 'react-native'
import { YStack } from 'tamagui'

import NoMatchesEmptyState from '@/components/matches/NoMatchesEmptyState'
import { type SuggestedCollection } from '@/components/matches/SuggestedCollectionCard'
import SuggestedCollectionsSection from '@/components/matches/SuggestedCollectionsSection'

const suggestedCollections: SuggestedCollection[] = [
  {
    id: 1,
    label: 'Trending',
    title: 'FIFA World Cup',
    activeCollectors: '1.2k',
    imageUrl:
      'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=800',
    labelColor: '#3525cd',
  },
  {
    id: 2,
    label: 'Most Popular',
    title: 'Pokemon TCG',
    activeCollectors: '5.8k',
    imageUrl:
      'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?q=80&w=800',
    labelColor: '#565e74',
  },
  {
    id: 3,
    label: 'New Arrivals',
    title: 'Vintage Classics',
    activeCollectors: '840',
    imageUrl:
      'https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?q=80&w=800',
    labelColor: '#46494b',
  },
]

export default function NoMatchesScreen() {
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
          onAddMore={() => router.push('/(tabs)/add/items' as any)}
        />

        <SuggestedCollectionsSection
          collections={suggestedCollections}
          onExploreAll={() => router.push('/(tabs)/collections' as any)}
          onPressCollection={(id) =>
            router.push(`/(tabs)/collections/${id}` as any)
          }
        />
      </YStack>
    </ScrollView>
  )
}