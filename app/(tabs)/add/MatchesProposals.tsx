import { ScrollView } from 'react-native'
import { YStack } from 'tamagui'

import InviteMoreCard from '@/components/matches/InviteMoreCard'
import MatchCard, { type Match } from '@/components/matches/MatchCard'
import MatchesHero from '@/components/matches/MatchesHero'
import { useLocalSearchParams } from 'expo-router'

export type UserCollectibleMatch = {
  userId: number
  username: string
  myOfferItemsCount: number
  theyOfferItemsCount: number
}

export type UserCollectibleMatchResponse = {
  matchInfo: Match[]
  myItemsToOffer: number[]
}

export default function TradesScreen() {
  const { matchResponse } = useLocalSearchParams()
  const data: UserCollectibleMatchResponse =
    typeof matchResponse === 'string'
      ? JSON.parse(matchResponse)
      : {
        matchInfo: [],
        myItemsToOffer: [],
      }
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: '#f8f9ff' }}
    >
      <YStack padding="$4" paddingBottom="$8" gap="$5">
        <MatchesHero />

        <YStack gap="$4">
          {data.matchInfo.map(match => (
            <MatchCard
              key={match.userId}
              match={match}
              onPress={() => console.log('View trade', match.userId)}
            />
          ))}

          <InviteMoreCard onPress={() => console.log('Share link')} />
        </YStack>
      </YStack>
    </ScrollView>
  )
}