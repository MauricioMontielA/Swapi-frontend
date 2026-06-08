import { Feather } from '@expo/vector-icons'
import { Image } from 'react-native'
import { Card, Text, XStack, YStack } from 'tamagui'

type Props = {
  number: number
  imageUrl?: string
  owned: boolean
  duplicates?: number
  onPress?: () => void
}

export default function StickerCard({
  number,
  imageUrl,
  owned,
  duplicates = 0,
  onPress,
}: Props) {
  const formattedNumber = `#${String(number).padStart(2, '0')}`

  if (!owned) {
    return (
      <Card
        aspectRatio={3 / 4}
        borderRadius={12}
        backgroundColor="#e5eeff"
        borderWidth={2}
        borderColor="#c7c4d8"
        borderStyle="dashed"
        alignItems="center"
        justifyContent="center"
        pressStyle={{ scale: 0.92 }}
        onPress={onPress}
      >
        <YStack alignItems="center" gap="$1">
          <Feather name="help-circle" size={28} color="#c7c4d8" />

          <Text fontSize={12} fontWeight="700" color="#777587">
            {formattedNumber}
          </Text>
        </YStack>
      </Card>
    )
  }

  return (
    <Card
      aspectRatio={3 / 4}
      borderRadius={12}
      backgroundColor="#ffffff"
      padding="$2"
      overflow="hidden"
      borderWidth={duplicates > 0 ? 2 : 1}
      borderColor={duplicates > 0 ? '#3525cd' : '#e5eeff'}
      pressStyle={{ scale: 0.92 }}
      onPress={onPress}
    >
      <YStack flex={1} position="relative">
        <Image
          source={{ uri: imageUrl }}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 8,
            resizeMode: 'cover',
          }}
        />

        {duplicates > 0 && (
          <XStack
            position="absolute"
            top={4}
            left={4}
            backgroundColor="#3525cd"
            paddingHorizontal="$2"
            paddingVertical="$1"
            borderRadius={999}
          >
            <Text color="#ffffff" fontSize={11} fontWeight="700">
              +{duplicates}
            </Text>
          </XStack>
        )}

        <XStack
          position="absolute"
          bottom={4}
          right={4}
          backgroundColor="rgba(53,37,205,0.9)"
          paddingHorizontal="$2"
          paddingVertical="$1"
          borderRadius={6}
        >
          <Text color="#ffffff" fontSize={10} fontWeight="700">
            {formattedNumber}
          </Text>
        </XStack>
      </YStack>
    </Card>
  )
}