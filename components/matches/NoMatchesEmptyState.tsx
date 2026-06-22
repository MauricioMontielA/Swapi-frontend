import { Feather } from '@expo/vector-icons'
import { Button, Text, XStack, YStack } from 'tamagui'

type Props = {
  onAddMore?: () => void
}

export default function NoMatchesEmptyState({ onAddMore }: Props) {
  return (
    <YStack alignItems="center" gap="$5" paddingVertical="$8">
      <YStack width={220} height={220} position="relative" alignItems="center" justifyContent="center">
        <YStack
          position="absolute"
          width={220}
          height={220}
          borderRadius={999}
          backgroundColor="#dae2fd"
          opacity={0.35}
        />

        <YStack
          width={180}
          height={180}
          borderRadius={32}
          backgroundColor="#ffffff"
          borderWidth={1}
          borderColor="#d3e4fe"
          alignItems="center"
          justifyContent="center"
          shadowColor="#0b1c30"
          shadowOpacity={0.05}
          shadowRadius={20}
        >
          <XStack
            width={82}
            height={82}
            borderRadius={999}
            backgroundColor="#4f46e5"
            alignItems="center"
            justifyContent="center"
          >
            <Feather name="search" size={42} color="#ffffff" />
          </XStack>
        </YStack>

        <XStack
          position="absolute"
          top={10}
          right={8}
          backgroundColor="#ffffff"
          padding="$3"
          borderRadius={14}
        >
          <Feather name="layers" size={22} color="#565e74" />
        </XStack>

        <XStack
          position="absolute"
          bottom={12}
          left={0}
          backgroundColor="#ffffff"
          padding="$3"
          borderRadius={14}
        >
          <Feather name="repeat" size={22} color="#3525cd" />
        </XStack>
      </YStack>

      <YStack alignItems="center" gap="$3">
        <Text fontSize={28} fontWeight="700" color="#0b1c30" textAlign="center">
          No matches found yet
        </Text>

        <Text fontSize={16} color="#464555" textAlign="center" lineHeight={24}>
          Don&apos;t worry! New collectors join Swapi every day. Try adding more
          items to your collection or checking back later.
        </Text>
      </YStack>

      <Button
        height={54}
        borderRadius={999}
        backgroundColor="#3525cd"
        paddingHorizontal="$6"
        pressStyle={{ scale: 0.96 }}
        onPress={onAddMore}
      >
        <XStack alignItems="center" gap="$2">
          <Feather name="plus-circle" size={20} color="#ffffff" />
          <Text color="#ffffff" fontSize={14} fontWeight="700">
            Add More Items
          </Text>
        </XStack>
      </Button>
    </YStack>
  )
}