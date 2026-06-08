import { Feather } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { ScrollView } from 'react-native'
import { Text, XStack, YStack } from 'tamagui'

import AddStickerButton from '@/components/collection-detail/AddStickerButton'
import CollectionProgressCard from '@/components/collection-detail/CollectionProgressCard'
import CollectionSearchBar from '@/components/collection-detail/CollectionSearchBar'
import StickerGrid, { Sticker } from '@/components/collection-detail/StickerGrid'

const stickers: Sticker[] = [
  {
    id: 1,
    number: 10,
    owned: true,
    imageUrl:
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800',
  },
  {
    id: 2,
    number: 7,
    owned: true,
    duplicates: 2,
    imageUrl:
      'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=800',
  },
  {
    id: 3,
    number: 8,
    owned: false,
  },
  {
    id: 4,
    number: 1,
    owned: true,
    imageUrl:
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800',
  },
  {
    id: 5,
    number: 9,
    owned: false,
  },
  {
    id: 6,
    number: 12,
    owned: true,
    duplicates: 1,
    imageUrl:
      'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?q=80&w=800',
  },
  {
    id: 7,
    number: 13,
    owned: false,
  },
  {
    id: 8,
    number: 14,
    owned: false,
  },
  {
    id: 9,
    number: 15,
    owned: false,
  },
  {
    id: 10,
    number: 16,
    owned: false,
  },
  {
    id: 11,
    number: 17,
    owned: false,
  },
  {
    id: 12,
    number: 18,
    owned: false,
  },
]

export default function CollectionDetailScreen() {
  const { id } = useLocalSearchParams()
  const [search, setSearch] = useState('')

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

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 120,
        }}
      >
        <YStack gap="$5">
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
        </YStack>
      </ScrollView>

      <AddStickerButton
        onPress={() => console.log('Add Sticker', id)}
      />
    </YStack>
  )
}