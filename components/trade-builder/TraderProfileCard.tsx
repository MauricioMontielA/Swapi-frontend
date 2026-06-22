import { Feather } from '@expo/vector-icons'
import { Image } from 'react-native'
import { Card, Text, XStack, YStack } from 'tamagui'

type Props = {
  name: string
  avatarUrl: string
  successfulTrades: number
  rating: number
  compatibility: number
}

export default function TraderProfileCard({
  name,
  avatarUrl,
  successfulTrades,
  rating,
  compatibility,
}: Props) {
  return (
    <Card
      backgroundColor="#ffffff"
      borderRadius={16}
      padding="$5"
      borderWidth={1}
      borderColor="#e5eeff"
    >
      <YStack alignItems="center" gap="$4">
        <YStack position="relative">
          <YStack
            width={96}
            height={96}
            borderRadius={999}
            borderWidth={4}
            borderColor="#dad7ff"
            padding="$1"
            backgroundColor="#ffffff"
            overflow="hidden"
          >
            <Image
              source={{ uri: avatarUrl }}
              style={{ width: '100%', height: '100%', borderRadius: 999 }}
            />
          </YStack>

          <YStack
            position="absolute"
            right={2}
            bottom={2}
            width={22}
            height={22}
            borderRadius={999}
            backgroundColor="#22c55e"
            borderWidth={3}
            borderColor="#ffffff"
          />
        </YStack>

        <YStack alignItems="center" gap="$2">
          <Text fontSize={24} fontWeight="700" color="#0b1c30" textAlign="center">
            {name}
          </Text>

          <XStack gap="$2" flexWrap="wrap" justifyContent="center">
            <Badge icon="shield" text={`${successfulTrades} Successful Trades`} />
            <Badge icon="star" text={`${rating} Rating`} primary />
          </XStack>
        </YStack>

        <YStack
          backgroundColor="#e2dfff"
          borderRadius={14}
          padding="$4"
          alignItems="center"
          width="100%"
        >
          <Text
            fontSize={12}
            fontWeight="700"
            color="#3525cd"
            textTransform="uppercase"
            letterSpacing={1}
          >
            Trading compatibility
          </Text>

          <Text fontSize={24} fontWeight="700" color="#3525cd">
            {compatibility}%
          </Text>
        </YStack>
      </YStack>
    </Card>
  )
}

function Badge({
  icon,
  text,
  primary = false,
}: {
  icon: keyof typeof Feather.glyphMap
  text: string
  primary?: boolean
}) {
  return (
    <XStack
      backgroundColor={primary ? '#dae2fd' : '#eff4ff'}
      borderRadius={999}
      paddingHorizontal="$3"
      paddingVertical="$1"
      alignItems="center"
      gap="$1"
    >
      <Feather name={icon} size={14} color={primary ? '#3525cd' : '#565e74'} />

      <Text
        fontSize={12}
        fontWeight="700"
        color={primary ? '#5c647a' : '#565e74'}
      >
        {text}
      </Text>
    </XStack>
  )
}