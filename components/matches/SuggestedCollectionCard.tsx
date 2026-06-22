import { Feather } from '@expo/vector-icons'
import { Image } from 'react-native'
import { Card, Text, XStack, YStack } from 'tamagui'

export type SuggestedCollection = {
  id: number
  label: string
  title: string
  activeCollectors: string
  imageUrl: string
  labelColor?: string
}

type Props = {
  collection: SuggestedCollection
  onPress?: () => void
}

export default function SuggestedCollectionCard({
  collection,
  onPress,
}: Props) {
  return (
    <Card
      backgroundColor="#ffffff"
      borderRadius={20}
      padding="$4"
      borderWidth={1}
      borderColor="#d3e4fe"
      pressStyle={{ scale: 0.98 }}
      onPress={onPress}
    >
      <YStack gap="$3">
        <YStack
          aspectRatio={4 / 3}
          borderRadius={14}
          overflow="hidden"
          backgroundColor="#e5eeff"
        >
          <Image
            source={{ uri: collection.imageUrl }}
            style={{ width: '100%', height: '100%' }}
          />
        </YStack>

        <XStack justifyContent="space-between" alignItems="flex-start">
          <YStack flex={1}>
            <Text
              fontSize={14}
              fontWeight="600"
              color={collection.labelColor ?? '#3525cd'}
            >
              {collection.label}
            </Text>

            <Text fontSize={18} fontWeight="700" color="#0b1c30">
              {collection.title}
            </Text>
          </YStack>

          <Feather name="chevron-right" size={22} color="#777587" />
        </XStack>

        <Text fontSize={12} color="#464555">
          {collection.activeCollectors} collectors active
        </Text>
      </YStack>
    </Card>
  )
}