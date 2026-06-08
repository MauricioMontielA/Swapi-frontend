import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useState } from 'react'
import { ScrollView } from 'react-native'
import { Input, Text, XStack, YStack } from 'tamagui'

import NewCollectionCard from '@/components/add/NewCollectionCard'
import NewCollectionSheet from '@/components/add/NewCollectionSheet'
import SelectCollectionCard, {
    type SelectCollection,
} from '@/components/add/SelectCollectionCard'

const collections: SelectCollection[] = [
    {
        id: 1,
        title: 'World Cup 2026',
        description:
            'Standard edition stickers from the global tournament. Missing 112 stickers.',
        progress: 82,
        imageUrl:
            'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=800',
    },
    {
        id: 2,
        title: 'Pokemon Scarlet & Violet',
        description:
            'Paldea region expansion pack. Currently collecting holographic rares.',
        progress: 45,
        imageUrl:
            'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?q=80&w=800',
    },
    {
        id: 3,
        title: 'Vintage Stamps 1950s',
        description:
            'European post-war era collection. You recently acquired the London Expo 1952 commemorative stamp.',
        progress: 8,
        badge: 'NEW',
        imageUrl:
            'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=800',
    },
    {
        id: 4,
        title: 'Disney Lorcana S2',
        description: '12 / 204 collected. Early progress collection.',
        progress: 5,
    },
]

const recommendedCollections = [
    {
        id: 1,
        title: 'NBA 2024-25 Stickers',
        subtitle: 'Panini Official',
        imageUrl:
            'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800',
    },
    {
        id: 2,
        title: 'Dragon Ball Z TCG',
        subtitle: 'Bandai Namco',
        imageUrl:
            'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=800',
    },
    {
        id: 3,
        title: 'F1 2024 Turbo Attax',
        subtitle: 'Topps Collection',
        imageUrl:
            'https://images.unsplash.com/photo-1537021279421-6861c2a2d3e5?q=80&w=800',
    },
]

export default function SelectCollectionScreen() {
    const [search, setSearch] = useState('')
    const [newCollectionOpen, setNewCollectionOpen] = useState(false)

    const filteredCollections = collections.filter(collection =>
        collection.title.toLowerCase().includes(search.trim().toLowerCase())
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