import { Feather } from '@expo/vector-icons'
import { Button, Text, XStack, YStack } from 'tamagui'

type Props = {
  onAdd?: () => void
}

export default function CollectionsHeader({ onAdd }: Props) {
  return (
    <YStack gap="$4">
      <YStack gap="$1">
        <Text fontSize={28} fontWeight="700" color="#0b1c30">
          My Collections
        </Text>

        <Text fontSize={16} color="#464555">
          Manage your favorite cards and stickers.
        </Text>
      </YStack>

      <Button
        height={56}
        borderRadius={14}
        backgroundColor="#3525cd"
        pressStyle={{
          scale: 0.96,
          backgroundColor: '#4f46e5',
        }}
        onPress={onAdd}
      >
        <XStack alignItems="center" gap="$2">
          <Feather name="plus-circle" size={20} color="#ffffff" />

          <Text color="#ffffff" fontSize={14} fontWeight="600">
            Add New Collection
          </Text>
        </XStack>
      </Button>
    </YStack>
  )
}