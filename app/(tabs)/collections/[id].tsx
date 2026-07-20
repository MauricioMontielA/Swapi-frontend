import { Feather } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList } from 'react-native'
import { Text, XStack, YStack } from 'tamagui'

import { getCollectionStickers } from '@/api/collectionService'
import AddStickerButton from '@/components/collection-detail/AddStickerButton'
import CollectionProgressCard from '@/components/collection-detail/CollectionProgressCard'
import CollectionSearchBar from '@/components/collection-detail/CollectionSearchBar'
import StickerGrid, { Sticker } from '@/components/collection-detail/StickerGrid'

const PAGE_SIZE = 30

export default function CollectionDetailScreen() {
  const { id } = useLocalSearchParams()
  const collectionId = Number(id)
  const [search, setSearch] = useState('')
  const [stickers, setStickers] = useState<Sticker[]>([])
  const [page, setPage] = useState(0)
  const [isLastPage, setIsLastPage] = useState(false)
  const [loading, setLoading] = useState(false)

  const loadStickers = useCallback(async (pageToLoad: number) => {
    if (!collectionId) return

    try {
      setLoading(true)
      const data = await getCollectionStickers(
        collectionId,
        pageToLoad,
        PAGE_SIZE,
      )
      const nextStickers: Sticker[] = data.content.map(sticker => ({
        id: sticker.id,
        number: sticker.number,
        imageUrl: sticker.imageUrl,
        owned: sticker.owned > 0,
        duplicates: Math.max(0, sticker.owned - 1),
      }))

      setStickers(current => {
        if (pageToLoad === 0) return nextStickers

        const existingIds = new Set(current.map(sticker => sticker.id))
        return [
          ...current,
          ...nextStickers.filter(sticker => !existingIds.has(sticker.id)),
        ]
      })
      setPage(data.page.number)
      setIsLastPage(data.page.number + 1 >= data.page.totalPages)
    } catch (error) {
      console.error('Error loading collection stickers', error)
    } finally {
      setLoading(false)
    }
  }, [collectionId])

  useEffect(() => {
    setStickers([])
    setPage(0)
    setIsLastPage(false)
    loadStickers(0)
  }, [loadStickers])

  const loadMore = () => {
    if (!loading && !isLastPage) loadStickers(page + 1)
  }

  const filteredStickers = stickers.filter(sticker =>
    String(sticker.number).includes(search.trim())
  )

  return (
    <YStack flex={1} backgroundColor="#f8f9ff">
      <XStack
        paddingHorizontal="$4"
        paddingVertical="$3"
        alignItems="center"
        justifyContent="space-between"
        backgroundColor="rgba(248,249,255,0.95)"
        borderBottomWidth={1}
        borderBottomColor="#e5eeff"
      >
        <XStack alignItems="center" gap="$3">
          <XStack
            width={40}
            height={40}
            borderRadius={999}
            alignItems="center"
            justifyContent="center"
            pressStyle={{ scale: 0.95 }}
            onPress={() => router.back()}
          >
            <Feather name="arrow-left" size={22} color="#3525cd" />
          </XStack>

          <Text fontSize={24} fontWeight="700" color="#3525cd">
            World Cup 2026
          </Text>
        </XStack>

        <Feather name="more-vertical" size={22} color="#464555" />
      </XStack>

      <FlatList
        data={[{ id: 'collection-content' }]}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 120,
        }}
        onEndReached={loadMore}
        onEndReachedThreshold={0.4}
        renderItem={() => <YStack gap="$5">
          <CollectionProgressCard
            completion={68}
            collected={408}
            total={600}
            missing={192}
            repeated={45}
            rank={1204}
          />

          <CollectionSearchBar
            value={search}
            onChangeText={setSearch}
            onFilter={() => console.log('filters')}
            onSort={() => console.log('sort')}
          />

          <StickerGrid
            stickers={filteredStickers}
            onStickerPress={sticker => console.log(sticker)}
          />

          {loading && (
            <ActivityIndicator size="small" color="#3525cd" />
          )}
        </YStack>}
      />

      <AddStickerButton
        onPress={() => console.log('Add Sticker', id)}
      />
    </YStack>
  )
}
