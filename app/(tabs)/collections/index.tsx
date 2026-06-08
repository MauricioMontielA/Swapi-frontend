import CollectionGridCard from '@/components/collections/CollectionGridCard'
import CollectionsHeader from '@/components/collections/CollectionsHeader'
import ExploreCatalogCard from '@/components/collections/ExploreCatalogCard'
import { ScrollView } from 'react-native'
import { YStack } from 'tamagui'

const collections = [
  {
    id: 1,
    title: 'World Cup 2026',
    type: 'Stickers',
    progress: 68,
    missing: 192,
    repeated: 45,
    imageUrl:
      'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=800',
  },
  {
    id: 2,
    title: 'Pokémon TCG',
    type: 'Cards',
    progress: 42,
    missing: 548,
    repeated: 12,
    imageUrl:
      'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?q=80&w=800',
  },
  {
    id: 3,
    title: 'NBA Stickers',
    type: 'Stickers',
    progress: 91,
    missing: 32,
    repeated: 89,
    imageUrl:
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800',
  },
]

export default function CollectionsScreen() {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: '#f8f9ff' }}
    >
      <YStack padding="$4" paddingBottom="$8" gap="$5">
        <CollectionsHeader
          onAdd={() => console.log('Add New Collection')}
        />

        <YStack gap="$4">
          {collections.map(collection => (
            <CollectionGridCard
              key={collection.id}
              title={collection.title}
              type={collection.type}
              imageUrl={collection.imageUrl}
              progress={collection.progress}
              missing={collection.missing}
              repeated={collection.repeated}
              onPress={() => console.log(collection.title)}
            />
          ))}
        </YStack>

        <ExploreCatalogCard
          onPress={() => console.log('Explore Catalog')}
        />
      </YStack>
    </ScrollView>
  )
}