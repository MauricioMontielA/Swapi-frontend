import { router, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { YStack } from 'tamagui'

import { getItemsAdd } from '@/api/collectionService'
import AvailableItemsGrid from '@/components/add/AvailableItemsGrid'
import BottomAddBar from '@/components/add/BottomAddBar'
import CollectionHeader from '@/components/add/CollectionHeader'

type Item = {
  id: number
  number: string
  name: string
  imageUrl: string
}

export default function AddScreen() {
  const { collectionId } = useLocalSearchParams()

  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<'NEW' | 'DUPLICATE'>('NEW')
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const [items, setItems] = useState<Item[]>([])
  const [page, setPage] = useState(0)
  const [isLastPage, setIsLastPage] = useState(false)
  const [loading, setLoading] = useState(false)

  const size = 30

  useEffect(() => {
    loadItems(0)
  }, [collectionId])

  const loadItems = async (pageToLoad: number) => {
    if (loading || isLastPage) return

    try {
      setLoading(true)

      const data = await getItemsAdd(Number(collectionId), pageToLoad, size)

      setItems(current =>
        pageToLoad === 0
          ? data.content
          : [...current, ...data.content]
      )

      setPage(pageToLoad)
      setIsLastPage(data.last)
    } catch (error) {
      console.error('Error loading items', error)
    } finally {
      setLoading(false)
    }
  }

  const loadMore = () => {
    if (!loading && !isLastPage) {
      loadItems(page + 1)
    }
  }

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
      <FlatList
        data={[{ id: 'content' }]}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 110,
        }}
        onEndReached={loadMore}
        onEndReachedThreshold={0.4}
        renderItem={() => (
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
        )}
      />

      <BottomAddBar
        selectedCount={selectedIds.length}
        onCancel={() => setSelectedIds([])}
        onAdd={() => console.log('Add items', selectedIds, status)}
      />
    </YStack>
  )
}