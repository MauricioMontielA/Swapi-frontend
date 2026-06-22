import { Feather } from '@expo/vector-icons'
import { Image } from 'react-native'
import { Card, Text, XStack, YStack } from 'tamagui'

export type TradeItem = {
  id: number
  name: string
  subtitle: string
  imageUrl: string
  badge?: string
}

type Props = {
  item: TradeItem
  selected: boolean
  onPress: () => void
}

export default function TradeItemCard({
  item,
  selected,
  onPress,
}: Props) {
  return (
    <Card
      width="48%"
      backgroundColor={selected ? '#e2dfff' : '#ffffff'}
      borderRadius={14}
      padding="$3"
      borderWidth={2}
      borderColor={selected ? '#3525cd' : 'transparent'}
      pressStyle={{ scale: 0.97 }}
      onPress={onPress}
    >
      <YStack gap="$3" position="relative">
        <YStack
          aspectRatio={3 / 4}
          borderRadius={10}
          overflow="hidden"
          backgroundColor="#e5eeff"
          position="relative"
        >
          <Image
            source={{ uri: item.imageUrl }}
            style={{ width: '100%', height: '100%' }}
          />

          {item.badge && (
            <XStack
              position="absolute"
              top={8}
              left={8}
              backgroundColor="#facc15"
              paddingHorizontal="$2"
              paddingVertical="$1"
              borderRadius={6}
            >
              <Text
                fontSize={10}
                fontWeight="800"
                color="#0b1c30"
                textTransform="uppercase"
              >
                {item.badge}
              </Text>
            </XStack>
          )}
        </YStack>

        <YStack>
          <Text fontSize={14} fontWeight="600" color="#0b1c30" numberOfLines={1}>
            {item.name}
          </Text>

          <Text fontSize={12} fontWeight="700" color="#565e74" numberOfLines={1}>
            {item.subtitle}
          </Text>
        </YStack>

        {selected && (
          <XStack
            position="absolute"
            top={-6}
            right={-6}
            width={28}
            height={28}
            borderRadius={999}
            backgroundColor="#3525cd"
            alignItems="center"
            justifyContent="center"
          >
            <Feather name="check" size={16} color="#ffffff" />
          </XStack>
        )}
      </YStack>
    </Card>
  )
}