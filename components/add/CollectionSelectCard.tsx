import { Feather } from '@expo/vector-icons'
import { Image } from 'react-native'
import { Button, Card, Text, XStack, YStack } from 'tamagui'

export type SelectableCollection = {
  id: number
  title: string
  description: string
  imageUrl?: string
  progress: number
  missingText?: string
}

type Props = {
  collection: SelectableCollection
  onSelect?: () => void
}

export default function CollectionSelectCard({
  collection,
  onSelect,
}: Props) {
  return (
    <Card
      backgroundColor="#ffffff"
      borderRadius={16}
      padding="$5"
      borderWidth={1}
      borderColor="#e5eeff"
      pressStyle={{ scale: 0.98 }}
      onPress={onSelect}
    >
      <YStack gap="$4">
        <XStack justifyContent="space-between" alignItems="flex-start">
          <YStack
            width={56}
            height={56}
            borderRadius={14}
            overflow="hidden"
            backgroundColor="#e5eeff"
          >
            {collection.imageUrl ? (
              <Image
                source={{ uri: collection.imageUrl }}
                style={{ width: '100%', height: '100%' }}
              />
            ) : (
              <XStack flex={1} alignItems="center" justifyContent="center">
                <Feather name="image" size={24} color="#777587" />
              </XStack>
            )}
          </YStack>

          <XStack
            backgroundColor="#dae2fd"
            paddingHorizontal="$3"
            paddingVertical="$1"
            borderRadius={999}
          >
            <Text fontSize={12} fontWeight="700" color="#5c647a">
              {collection.progress}% COMPLETE
            </Text>
          </XStack>
        </XStack>

        <YStack gap="$2">
          <Text fontSize={24} fontWeight="700" color="#0b1c30">
            {collection.title}
          </Text>

          <Text fontSize={14} color="#464555" lineHeight={21}>
            {collection.description}
          </Text>
        </YStack>

        <YStack gap="$4">
          <YStack
            height={8}
            borderRadius={999}
            backgroundColor="#e5eeff"
            overflow="hidden"
          >
            <YStack
              height="100%"
              width={`${collection.progress}%`}
              backgroundColor="#3525cd"
              borderRadius={999}
            />
          </YStack>

          <Button
            height={48}
            borderRadius={12}
            backgroundColor="#3525cd"
            pressStyle={{ scale: 0.96, backgroundColor: '#4f46e5' }}
            onPress={onSelect}
          >
            <XStack alignItems="center" gap="$2">
              <Text color="#ffffff" fontSize={14} fontWeight="600">
                Select Collection
              </Text>

              <Feather name="chevron-right" size={18} color="#ffffff" />
            </XStack>
          </Button>
        </YStack>
      </YStack>
    </Card>
  )
}