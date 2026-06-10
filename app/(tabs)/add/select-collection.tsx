import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { Input, Text, XStack, YStack } from 'tamagui'

import { getCollectionsAdd } from '@/api/collectionService'
import NewCollectionCard from '@/components/add/NewCollectionCard'
import NewCollectionSheet from '@/components/add/NewCollectionSheet'
import SelectCollectionCard from '@/components/add/SelectCollectionCard'

type CollectionInProgress = {
    id: number
    name: string
    description: string
    imageUrl: string
    progress: number
    missingText?: string
    badge?: string
}

type RecommendedCollection = {
    id: number
    name: string
    description: string
    imageUrl: string
}

type CollectionResponseDto = {
    collectionsInProgress: CollectionInProgress[],
    recommendedCollections: RecommendedCollection[]
}


export default function SelectCollectionScreen() {

    const [collectionsInProgress, setCollectionsInProgress] = useState<CollectionInProgress[]>([])
    const [recommendedCollections, setRecommendedCollections] = useState<RecommendedCollection[]>([])

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadCollections()
    }, [])

    const loadCollections = async () => {
        try {
            const data = await getCollectionsAdd()
            setCollectionsInProgress(data.collectionsInProgress)
            setRecommendedCollections(data.recommendedCollections)
            console.log(data)

        } catch (error) {
            console.error('Error loading collections', error)
        } finally {
            setLoading(false)
        }
    }
    const [search, setSearch] = useState('')
    const [newCollectionOpen, setNewCollectionOpen] = useState(false)

    const filteredCollections = collectionsInProgress.filter(collection =>
        collection.name.toLowerCase().includes(search.trim().toLowerCase())
    )

    const handleSelectCollection = (collectionId: number) => {
        router.push({
            pathname: '/(tabs)/add/items',
            params: {
                collectionId: collectionId,
            },
        } as any)


    }

    const goToItems = (collectionId: number) => {
        router.push({
            pathname: '/(tabs)/add/items',
            params: { collectionId },
        } as any)
    }

    return (
        <>
            <YStack flex={1} backgroundColor="#f8f9ff">


                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        padding: 16,
                        paddingBottom: 40,
                    }}
                >

                    {loading && <Text>Loading...</Text>}

                    <YStack gap="$5">
                        <YStack gap="$3">
                            <XStack
                                height={56}
                                borderRadius={16}
                                backgroundColor="#eff4ff"
                                borderWidth={1}
                                borderColor="#c7c4d8"
                                alignItems="center"
                                paddingHorizontal="$3"
                                gap="$2"
                            >
                                <Feather name="search" size={20} color="#777587" />

                                <Input
                                    flex={1}
                                    borderWidth={0}
                                    backgroundColor="transparent"
                                    placeholder="Search your collections..."
                                    placeholderTextColor={'#777587' as any}
                                    value={search}
                                    onChangeText={setSearch}
                                />

                                <Feather name="filter" size={20} color="#c7c4d8" />
                            </XStack>

                            <Text
                                fontSize={12}
                                fontWeight="700"
                                color="#464555"
                                opacity={0.7}
                                textTransform="uppercase"
                            >
                                Select a collection to begin adding items
                            </Text>
                        </YStack>

                        <YStack gap="$4">
                            {filteredCollections.map(collection => (
                                <SelectCollectionCard
                                    key={collection.id}
                                    collection={collection}
                                    onPress={() => handleSelectCollection(collection.id)}
                                />
                            ))}

                            <NewCollectionCard
                                onPress={() => setNewCollectionOpen(true)}
                            />
                        </YStack>
                    </YStack>
                </ScrollView>
            </YStack>
            <NewCollectionSheet
                open={newCollectionOpen}
                onClose={() => setNewCollectionOpen(false)}
                collections={recommendedCollections}
                onSelectCollection={(collectionId) => {
                    setNewCollectionOpen(false)
                    goToItems(collectionId)
                }}
            />
        </>
    )
}