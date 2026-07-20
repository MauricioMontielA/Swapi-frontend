import { ScrollView } from 'react-native'
import { YStack } from 'tamagui'

import InviteMoreCard from '@/components/matches/InviteMoreCard'
import MatchCard, { type Match } from '@/components/matches/MatchCard'
import MatchesHero from '@/components/matches/MatchesHero'
import { router, useLocalSearchParams } from 'expo-router'

export type UserCollectibleMatch = {
  userId: number
  username: string
  myOfferItemsCount: number
  theyOfferItemsCount: number
}

export type UserCollectibleMatchResponse = {
  matchInfo: UserCollectibleMatch[]
  myItemsToOffer: number[]
}

export default function TradesScreen() {
  const { collectionId, matchResponse } = useLocalSearchParams<{
    collectionId?: string
    matchResponse?: string
  }>()

  let data: UserCollectibleMatchResponse = {
    matchInfo: [],
    myItemsToOffer: [],
  }

  if (typeof matchResponse === 'string') {
    try {
      data = JSON.parse(matchResponse)
    } catch {
      data = { matchInfo: [], myItemsToOffer: [] }
    }
  }
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: '#f8f9ff' }}
    >
      <YStack padding="$4" paddingBottom="$8" gap="$5">
        <MatchesHero />

        <YStack gap="$4">
          {data.matchInfo.map((match: Match) => (
            <MatchCard
              key={match.userId}
              match={match}
              onPress={() =>
                router.push({
                  pathname: '/(tabs)/add/MatchesDetails',
                  params: {
                    targetUserId: match.userId,
                    username: match.username,
                    collectionId,
                    filteredIds: JSON.stringify(data.myItemsToOffer),
                  },
                } as any)
              }
            />
          ))}

          <InviteMoreCard onPress={() => console.log('Share link')} />
        </YStack>
      </YStack>
    </ScrollView>
  )
}
