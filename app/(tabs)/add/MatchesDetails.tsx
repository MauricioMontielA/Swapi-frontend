import { router } from 'expo-router'
import { useState } from 'react'
import { ScrollView } from 'react-native'
import { YStack } from 'tamagui'

import TradeFooter from '@/components/trade-builder/TradeFooter'
import { type TradeItem } from '@/components/trade-builder/TradeItemCard'
import TradeItemSection from '@/components/trade-builder/TradeItemSection'
import TraderProfileCard from '@/components/trade-builder/TraderProfileCard'

const wantItems: TradeItem[] = [
  {
    id: 1,
    name: 'Mech-Warrior Prime',
    subtitle: 'Rare Holographic',
    imageUrl: 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?q=80&w=800',
  },
  {
    id: 2,
    name: 'The Eye of Aras',
    subtitle: 'Legendary Coin',
    imageUrl: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=800',
  },
  {
    id: 3,
    name: 'Street Cat Kid',
    subtitle: 'Art Series',
    imageUrl: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=800',
  },
  {
    id: 4,
    name: 'Crystal Wyvern',
    subtitle: 'First Edition',
    imageUrl: 'https://images.unsplash.com/photo-1618945524163-32451704cbb8?q=80&w=800',
  },
]

const offerItems: TradeItem[] = [
  {
    id: 101,
    name: 'Hyper-Kicks 2.0',
    subtitle: 'Rare Accessory',
    badge: 'Wishlist Item',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800',
  },
  {
    id: 102,
    name: 'Retro Adventure X',
    subtitle: 'Vintage Game',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800',
  },
  {
    id: 103,
    name: 'Neon Sage #88',
    subtitle: 'Cyber Edition',
    imageUrl: 'https://images.unsplash.com/photo-1601814933824-fd0b574dd592?q=80&w=800',
  },
]

export default function TradeBuilderScreen() {
  const [selectedWantIds, setSelectedWantIds] = useState<number[]>([])
  const [selectedOfferIds, setSelectedOfferIds] = useState<number[]>([])

  const toggleWant = (id: number) => {
    setSelectedWantIds(current =>
      current.includes(id)
        ? current.filter(itemId => itemId !== id)
        : [...current, id]
    )
  }

  const toggleOffer = (id: number) => {
    setSelectedOfferIds(current =>
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
          paddingBottom: 150,
        }}
      >
        <YStack gap="$6">
          <TraderProfileCard
            name='Alex "The Collector" Rivera'
            avatarUrl="https://i.pravatar.cc/200?img=12"
            successfulTrades={142}
            rating={4.9}
            compatibility={94}
          />

          <TradeItemSection
            title="What you want"
            subtitle="42 duplicates found"
            icon="shopping-bag"
            iconBackground="#ffdad6"
            iconColor="#ba1a1a"
            items={wantItems}
            selectedIds={selectedWantIds}
            onToggle={toggleWant}
          />

          <TradeItemSection
            title="What you offer"
            rightAction="Filter by his Wishlist"
            icon="archive"
            iconBackground="#dae2fd"
            iconColor="#3525cd"
            items={offerItems}
            selectedIds={selectedOfferIds}
            onToggle={toggleOffer}
          />
        </YStack>
      </ScrollView>

      <TradeFooter
        wantCount={selectedWantIds.length}
        offerCount={selectedOfferIds.length}
        onCancel={() => router.back()}
        onSend={() =>
          console.log('Send proposal', {
            wanted: selectedWantIds,
            offered: selectedOfferIds,
          })
        }
      />
    </YStack>
  )
}