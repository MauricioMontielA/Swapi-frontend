import { Feather } from '@expo/vector-icons'
import { Image } from 'react-native'
import { Card, Text, XStack, YStack } from 'tamagui'

type Props = {
  number: number | string
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
        width="100%"
        aspectRatio={3 / 4}
        borderRadius={12}
        backgroundColor="#e5eeff"
        borderWidth={2}
        borderColor="rgba(199,196,216,0.45)"
        borderStyle="dashed"
        alignItems="center"
        justifyContent="center"
        pressStyle={{ scale: 0.92 }}
        onPress={onPress}
      >
        <YStack alignItems="center" gap="$1">
          <Feather name="help-circle" size={28} color="rgba(199,196,216,0.7)" />
          <Text fontSize={12} fontWeight="700" color="#777587">
            {formattedNumber}
          </Text>
        </YStack>
      </Card>
    )
  }

  return (
    <Card
      width="100%"
      aspectRatio={3 / 4}
      borderRadius={12}
      backgroundColor="#ffffff"
      padding={8}
      overflow="hidden"
      borderWidth={duplicates > 0 ? 2 : 1}
      borderColor={duplicates > 0 ? '#3525cd' : 'rgba(199,196,216,0.25)'}
      pressStyle={{ scale: 0.92 }}
      onPress={onPress}
    >
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
          top={8}
          left={8}
          minWidth={30}
          height={22}
          paddingHorizontal={8}
          borderRadius={999}
          backgroundColor="#3525cd"
          alignItems="center"
          justifyContent="center"
        >
          <Text color="#ffffff" fontSize={11} fontWeight="700">
            +{duplicates}
          </Text>
        </XStack>
      )}

      <XStack
        position="absolute"
        right={8}
        bottom={8}
        paddingHorizontal={6}
        paddingVertical={3}
        borderRadius={4}
        backgroundColor="rgba(53,37,205,0.9)"
      >
        <Text color="#ffffff" fontSize={10} fontWeight="800">
          {formattedNumber}
        </Text>
      </XStack>
    </Card>
  )
}
