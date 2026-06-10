import { getCollections } from '@/api/collectionService'
import CollectionGridCard from '@/components/collections/CollectionGridCard'
import CollectionsHeader from '@/components/collections/CollectionsHeader'
import ExploreCatalogCard from '@/components/collections/ExploreCatalogCard'
import { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { Text, YStack } from 'tamagui'

type Collection = {
  id: number
  name: string
  type: string
  progress: number
  missing: number
  repeated: number
  imageUrl: string
}

export default function CollectionsScreen() {
  const [collections, setCollections] = useState<Collection[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCollections()
  }, [])

  const loadCollections = async () => {
    try {
      const data = await getCollections()
      setCollections(data)
    } catch (error) {
      console.error('Error loading collections', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: '#f8f9ff' }}
    >
      <YStack padding="$4" paddingBottom="$8" gap="$5">
        <CollectionsHeader onAdd={() => console.log('Add New Collection')} />

        {loading && <Text>Loading...</Text>}

        <YStack gap="$4">
          {collections.map(collection => (
            <CollectionGridCard
              key={collection.id}
              title={collection.name}
              type={collection.type}
              imageUrl={collection.imageUrl}
              progress={collection.progress}
              missing={collection.missing}
              repeated={collection.repeated}
              onPress={() => console.log(collection.name)}
            />
          ))}
        </YStack>

        <ExploreCatalogCard onPress={() => console.log('Explore Catalog')} />
      </YStack>
    </ScrollView>
  )
}