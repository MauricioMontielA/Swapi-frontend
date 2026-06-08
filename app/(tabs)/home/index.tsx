import ActivitySection from '@/components/home/ActivitySection'
import CollectionsSection from '@/components/home/CollectionsSection'
import SmartMatchCard from '@/components/home/SmartMatchCard'
import { ScrollView } from 'react-native'
import { Text, YStack } from 'tamagui'

const collections = [
  {
    id: 1,
    title: 'World Cup 2026',
    subtitle: 'Sticker Album',
    completion: 85,
    icon: 'award',
    color: '#3525cd',
    iconBackground: '#dae2fd',
  },
  {
    id: 2,
    title: 'Pokémon TCG',
    subtitle: 'Scarlet & Violet',
    completion: 42,
    icon: 'star',
    color: '#565e74',
    iconBackground: '#dce9ff',
  },
]

const activities = [
  {
    id: 1,
    userName: 'Mateo',
    message: 'just added a rare card to his trade list.',
    timeAgo: '2 mins ago',
    type: 'added' as const,
    avatarUrl: 'https://i.pravatar.cc/100?img=12',
  },
  {
    id: 2,
    userName: 'Sofia',
    message: "finished her 'Vintage Kanto' set! 🎊",
    timeAgo: '1 hour ago',
    type: 'completed' as const,
    avatarUrl: 'https://i.pravatar.cc/100?img=32',
  },
  {
    id: 3,
    message: 'New Community Goal: 1,000 trades this week!',
    timeAgo: 'Global Update',
    type: 'community' as const,
  },
]

export default function HomeScreen() {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: '#f8f9ff' }}
    >
      <YStack padding="$4" paddingBottom="$8" gap="$6">
        <YStack gap="$1">
          <Text fontSize={28} fontWeight="700" color="#0b1c30">
            Hi Alex! Ready to swap?
          </Text>

          <Text fontSize={16} color="#464555">
            There are 12 active collectors near you today.
          </Text>
        </YStack>

        <CollectionsSection
          collections={collections}
          onViewAll={() => console.log('View collections')}
        />

        <SmartMatchCard
          userName="Sarah J."
          avatarUrl="https://i.pravatar.cc/100?img=47"
          matchScore={98}
          sheHas={{
            label: 'She Has',
            name: 'Charizard ex',
            imageUrl:
              'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?q=80&w=800',
            color: '#3525cd',
          }}
          youHave={{
            label: 'You Have',
            name: 'Mewtwo VSTAR',
            imageUrl:
              'https://assets.pokemon.com/static-assets/content-assets/cms2-es-es/img/cards/web/SV02/SV02_ES_62.png',
            color: '#565e74',
          }}
          onProposeTrade={() => console.log('Propose trade')}
        />

        <ActivitySection
          activities={activities}
          onViewFeed={() => console.log('View feed')}
        />
      </YStack>
    </ScrollView>
  )
}