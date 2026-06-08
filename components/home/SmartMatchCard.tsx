import { Feather } from '@expo/vector-icons'
import { Image } from 'react-native'
import { Button, Card, Text, XStack, YStack } from 'tamagui'

type TradeItem = {
  label: string
  name: string
  imageUrl: string
  color?: string
}

type Props = {
  userName: string
  avatarUrl: string
  matchScore: number
  sheHas: TradeItem
  youHave: TradeItem
  onProposeTrade?: () => void
}

export default function SmartMatchCard({
  userName,
  avatarUrl,
  matchScore,
  sheHas,
  youHave,
  onProposeTrade,
}: Props) {
  return (
    <YStack gap="$3">
      <Text fontSize={24} fontWeight="700" color="#0b1c30">
        Smart Matches
      </Text>

      <Card
        backgroundColor="#eff4ff"
        borderRadius={16}
        padding="$4"
        borderWidth={1}
        borderColor="#e5eeff"
      >
        <YStack gap="$4">
          <XStack justifyContent="space-between" alignItems="center" gap="$3">
            <XStack alignItems="center" gap="$3" flex={1}>
              <Image
                source={{ uri: avatarUrl }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 999,
                }}
              />

              <YStack flex={1}>
                <Text fontSize={14} fontWeight="600" color="#0b1c30">
                  {userName} has an item you need!
                </Text>

                <Text fontSize={12} color="#464555">
                  Match score: {matchScore}%
                </Text>
              </YStack>
            </XStack>

            <XStack
              backgroundColor="#e2dfff"
              paddingHorizontal="$3"
              paddingVertical="$1"
              borderRadius={999}
            >
              <Text
                fontSize={10}
                fontWeight="800"
                color="#3323cc"
                textTransform="uppercase"
                letterSpacing={1}
              >
                Top Match
              </Text>
            </XStack>
          </XStack>

          <YStack gap="$3">
            <TradeItemCard item={sheHas} />

            <XStack justifyContent="center">
              <XStack
                width={40}
                height={40}
                borderRadius={999}
                backgroundColor="#3525cd"
                alignItems="center"
                justifyContent="center"
              >
                <Feather name="repeat" size={18} color="#ffffff" />
              </XStack>
            </XStack>

            <TradeItemCard item={youHave} />
          </YStack>

          <Button
            height={48}
            borderRadius={999}
            backgroundColor="#3525cd"
            pressStyle={{
              scale: 0.96,
              backgroundColor: '#4f46e5',
            }}
            onPress={onProposeTrade}
          >
            <Text color="#ffffff" fontSize={14} fontWeight="600">
              Propose Trade
            </Text>
          </Button>
        </YStack>
      </Card>
    </YStack>
  )
}

function TradeItemCard({ item }: { item: TradeItem }) {
  return (
    <Card
      backgroundColor="#ffffff"
      borderRadius={12}
      padding="$3"
      alignItems="center"
      borderWidth={1}
      borderColor="#e5eeff"
    >
      <Text
        fontSize={10}
        fontWeight="700"
        color="#464555"
        textTransform="uppercase"
        marginBottom="$2"
      >
        {item.label}
      </Text>

      <Image
        source={{ uri: item.imageUrl }}
        style={{
          width: '100%',
          height: 160,
          borderRadius: 10,
          resizeMode: 'cover',
          marginBottom: 8,
        }}
      />

      <Text fontSize={14} fontWeight="600" color={item.color ?? '#3525cd'}>
        {item.name}
      </Text>
    </Card>
  )
}