import { Feather } from '@expo/vector-icons'
import { Image } from 'react-native'
import { Button, Card, Text, XStack, YStack } from 'tamagui'

export type Match = {
  userId: number
  username: string
  location: string
  avatarUrl: string
  matchPercentage: number
  myOfferItemsCount: number
  theyOfferItemsCount: number
}

type Props = {
  match: Match
  onPress?: () => void
}

export default function MatchCard({ match, onPress }: Props) {
  return (
    <Card
      backgroundColor="#ffffff"
      borderRadius={20}
      padding="$5"
      borderWidth={1}
      borderColor="#e5eeff"
      pressStyle={{ scale: 0.98 }}
    >
      <YStack gap="$5">
        <XStack justifyContent="space-between" alignItems="flex-start">
          <XStack alignItems="center" gap="$3" flex={1}>
            <YStack
              width={64}
              height={64}
              borderRadius={16}
              overflow="hidden"
              backgroundColor="#e5eeff"
            >
              <Image
                source={{ uri: match.avatarUrl }}
                style={{ width: '100%', height: '100%' }}
              />
            </YStack>

            <YStack flex={1}>
              <Text fontSize={22} fontWeight="700" color="#0b1c30">
                {match.username}
              </Text>

              <XStack alignItems="center" gap="$1">
                <Feather name="map-pin" size={13} color="#464555" />

                <Text fontSize={12} fontWeight="700" color="#464555">
                  {match.location}
                </Text>
              </XStack>
            </YStack>
          </XStack>

          <XStack
            backgroundColor="#e2dfff"
            paddingHorizontal="$3"
            paddingVertical="$1"
            borderRadius={999}
          >
            <Text fontSize={14} fontWeight="600" color="#3525cd">
              {match.matchPercentage}% Match
            </Text>
          </XStack>
        </XStack>

        <XStack gap="$3">
          <StatBox
            value={match.theyOfferItemsCount}
            label="Has For You"
            color="#3525cd"
          />

          <StatBox
            value={match.myOfferItemsCount}
            label="Needs From You"
            color="#565e74"
          />
        </XStack>

        <Button
          height={52}
          borderRadius={14}
          backgroundColor="#3525cd"
          pressStyle={{ scale: 0.96, backgroundColor: '#4f46e5' }}
          onPress={onPress}
        >
          <XStack alignItems="center" gap="$2">
            <Text color="#ffffff" fontSize={14} fontWeight="700">
              View Trade
            </Text>

            <Feather name="chevron-right" size={18} color="#ffffff" />
          </XStack>
        </Button>
      </YStack>
    </Card>
  )
}

function StatBox({
  value,
  label,
  color,
}: {
  value: number
  label: string
  color: string
}) {
  return (
    <YStack
      flex={1}
      backgroundColor="#eff4ff"
      borderRadius={14}
      padding="$4"
      alignItems="center"
      gap="$1"
    >
      <Text fontSize={24} fontWeight="700" color={color}>
        {value}
      </Text>

      <Text
        fontSize={11}
        fontWeight="700"
        color="#5c647a"
        textTransform="uppercase"
        textAlign="center"
      >
        {label}
      </Text>
    </YStack>
  )
}