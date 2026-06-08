import { Feather } from '@expo/vector-icons'
import { Button, Text, XStack } from 'tamagui'

type Props = {
  selectedCount: number
  onCancel?: () => void
  onAdd?: () => void
}

export default function BottomAddBar({
  selectedCount,
  onCancel,
  onAdd,
}: Props) {
  return (
    <XStack
      position="absolute"
      bottom={0}
      left={0}
      right={0}
      backgroundColor="#ffffff"
      borderTopWidth={1}
      borderTopColor="#e5eeff"
      padding="$4"
      gap="$3"
      alignItems="center"
    >
      <Button
        flex={1}
        height={48}
        borderRadius={12}
        backgroundColor="transparent"
        borderWidth={1}
        borderColor="#c7c4d8"
        onPress={onCancel}
      >
        <Text fontSize={14} fontWeight="700" color="#464555">
          Cancel
        </Text>
      </Button>

      <Button
        flex={2}
        height={48}
        borderRadius={12}
        backgroundColor="#3525cd"
        disabled={selectedCount === 0}
        opacity={selectedCount === 0 ? 0.5 : 1}
        pressStyle={{ scale: 0.96, backgroundColor: '#4f46e5' }}
        onPress={onAdd}
      >
        <XStack alignItems="center" gap="$2">
          <Feather name="plus-circle" size={18} color="#ffffff" />

          <Text fontSize={14} fontWeight="700" color="#ffffff">
            Add {selectedCount > 0 ? `(${selectedCount})` : ''}
          </Text>
        </XStack>
      </Button>
    </XStack>
  )
}