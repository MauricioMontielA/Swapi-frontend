import { Feather } from '@expo/vector-icons'
import { Button, Text, XStack } from 'tamagui'

type Props = {
  onPress?: () => void
}

export default function AddStickerButton({ onPress }: Props) {
  return (
    <Button
      position="absolute"
      right={16}
      bottom={24}
      height={56}
      borderRadius={999}
      backgroundColor="#3525cd"
      paddingHorizontal="$5"
      shadowColor="#3525cd"
      shadowOpacity={0.3}
      shadowRadius={12}
      shadowOffset={{ width: 0, height: 6 }}
      pressStyle={{
        scale: 0.96,
        backgroundColor: '#4f46e5',
      }}
      onPress={onPress}
    >
      <XStack alignItems="center" gap="$2">
        <Feather name="plus" size={20} color="#ffffff" />

        <Text color="#ffffff" fontSize={14} fontWeight="600">
          Add Sticker
        </Text>
      </XStack>
    </Button>
  )
}