import { router, useLocalSearchParams } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { YStack } from 'tamagui'

import { addItemsToCollection, getItemsAdd } from '@/api/collectionService'
import AvailableItemsGrid from '@/components/add/AvailableItemsGrid'
import BottomAddBar from '@/components/add/BottomAddBar'
import CollectionHeader from '@/components/add/CollectionHeader'
import { UserCollectibleMatchResponse } from './MatchesProposals'

type Item = {
  id: number
  number: string
  name: string
  imageUrl: string
}

type ItemsPageResponse = {
  content: Item[]
  page: {
    size: number
    number: number
    totalElements: number
    totalPages: number
  }
}

export default function AddScreen() {
  const params = useLocalSearchParams<{
    collectionId?: string
    collectionName?: string
    collectionDescription?: string
  }>()
  const collectionId = Number(params.collectionId)

  const [search, setSearch] = useState('')
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const [items, setItems] = useState<Item[]>([])
  const [page, setPage] = useState(0)
  const [isLastPage, setIsLastPage] = useState(false)
  const [loading, setLoading] = useState(false)

  const size = 30

  const loadItems = useCallback(async (pageToLoad: number) => {
    if (!collectionId) return

    try {
      setLoading(true)

      const data: ItemsPageResponse = await getItemsAdd(
        collectionId,
        pageToLoad,
        size
      )

      setItems(current =>
        pageToLoad === 0
          ? data.content
          : [...current, ...data.content]
      )

      setPage(data.page.number)
      setIsLastPage(data.page.number + 1 >= data.page.totalPages)
    } catch (error) {
      console.error('Error loading items', error)
    } finally {
      setLoading(false)
    }
  }, [collectionId])

  useEffect(() => {
    setItems([])
    setPage(0)
    setIsLastPage(false)
    setSelectedIds([])

    loadItems(0)
  }, [loadItems])

  const goToProposedMatches = (data: UserCollectibleMatchResponse) => {
    const matchInfo = data.matchInfo ?? []
    const myItemsToOffer = data.myItemsToOffer ?? []

    if (matchInfo.length > 0) {
      router.replace({
        pathname: '/(tabs)/add/MatchesProposals',
        params: {
          collectionId,
          matchResponse: JSON.stringify({
            matchInfo,
            myItemsToOffer,
          }),
        },
      } as any)
    } else {
      router.replace({
        pathname: '/(tabs)/add/no-matches',
        params: {
          collectionId,
          collectionName: params.collectionName,
          collectionDescription: params.collectionDescription,
        },
      } as any)
    }
  }

  const addItems = async () => {
    if (loading) return
    if (selectedIds.length < 1) return

    try {
      setLoading(true)

      const data: UserCollectibleMatchResponse = await addItemsToCollection(
        selectedIds,
        collectionId
      )

      goToProposedMatches(data)
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
              collectionName={params.collectionName}
              collectionDescription={params.collectionDescription}
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
        onAdd={addItems}
      />
    </YStack>
  )
}
