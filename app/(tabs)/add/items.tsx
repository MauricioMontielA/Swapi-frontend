import { useState } from 'react'
import { ScrollView } from 'react-native'
import { YStack } from 'tamagui'

import { AvailableItem } from '@/components/add/AvailableItemCard'
import AvailableItemsGrid from '@/components/add/AvailableItemsGrid'
import BottomAddBar from '@/components/add/BottomAddBar'
import CollectionHeader from '@/components/add/CollectionHeader'
import { router, useLocalSearchParams } from 'expo-router'


const items: AvailableItem[] = [
    {
        id: 1,
        number: 452,
        name: 'Lionel Messi (ARG)',
        imageUrl:
            'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800',
    },
    {
        id: 2,
        number: 453,
        name: 'Kylian Mbappé (FRA)',
        imageUrl:
            'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=800',
    },
    {
        id: 3,
        number: 454,
        name: 'Vinicius Jr (BRA)',
        imageUrl:
            'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800',
    },
    {
        id: 4,
        number: 455,
        name: 'Erling Haaland (NOR)',
        imageUrl:
            'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?q=80&w=800',
    },
    {
        id: 5,
        number: 456,
        name: 'Cristiano Ronaldo (POR)',
    },
    {
        id: 6,
        number: 457,
        name: 'Jude Bellingham (ENG)',
    },
]

export default function AddScreen() {
    const { collectionId } = useLocalSearchParams()

      console.log(collectionId)

    const [search, setSearch] = useState('')
    const [status, setStatus] = useState<'NEW' | 'DUPLICATE'>('NEW')
    const [selectedIds, setSelectedIds] = useState<number[]>([4])

    const filteredItems = items.filter(item => {
        const text = `${item.number} ${item.name}`.toLowerCase()
        return text.includes(search.toLowerCase())
    })

    const toggleItem = (id: number) => {
        setSelectedIds(current =>
            current.includes(id)
                ? current.filter(itemId => itemId !== id)
                : [...current, id]
        )
    }

    return (
        <YStack flex={1} backgroundColor="#f8f9ff">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    padding: 16,
                    paddingBottom: 110,
                }}
            >
                <YStack gap="$5">


                    <CollectionHeader
                        search={search}
                        onChangeSearch={setSearch}
                        onChangeCollection={() =>
                            router.push('/(tabs)/add/select-collection' as any)
                        }
                    />

                    <AvailableItemsGrid
                        items={filteredItems}
                        selectedIds={selectedIds}
                        onToggleItem={toggleItem}
                    />
                </YStack>
            </ScrollView>

            <BottomAddBar
                selectedCount={selectedIds.length}
                onCancel={() => setSelectedIds([])}
                onAdd={() => console.log('Add items', selectedIds, status)}
            />
        </YStack>
    )
}