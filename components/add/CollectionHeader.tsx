import { Feather } from '@expo/vector-icons'
import { Input, Text, XStack, YStack } from 'tamagui'

type Props = {
  search: string
  onChangeSearch: (value: string) => void
  onChangeCollection?: () => void
}

export default function CollectionHeader({
  search,
  onChangeSearch,
  onChangeCollection,
}: Props) {
  return (
    <YStack gap="$4">
      <XStack justifyContent="space-between" alignItems="center">
        <XStack alignItems="center" gap="$3" flex={1}>
          <XStack
            width={48}
            height={48}
            borderRadius={12}
            backgroundColor="#4f46e5"
            alignItems="center"
            justifyContent="center"
          >
            <Feather name="award" size={22} color="#ffffff" />
          </XStack>

          <YStack flex={1}>
            <Text fontSize={24} fontWeight="700" color="#0b1c30">
              World Cup 2026
            </Text>

            <Text fontSize={14} color="#464555">
              Panini Official Collection
            </Text>
          </YStack>

          <XStack
            backgroundColor="#dae2fd"
            borderRadius={999}
            paddingHorizontal="$3"
            paddingVertical="$2"
            onPress={onChangeCollection}
          >
            <Text
              fontSize={12}
              fontWeight="700"
              color="#131b2e"
            >
              Change
            </Text>
          </XStack>
        </XStack>
      </XStack>

      <XStack
        height={52}
        borderRadius={16}
        backgroundColor="#eff4ff"
        borderWidth={1}
        borderColor="#c7c4d8"
        alignItems="center"
        paddingHorizontal="$3"
        gap="$2"
      >
        <Feather
          name="search"
          size={18}
          color="#777587"
        />

        <Input
          flex={1}
          borderWidth={0}
          backgroundColor="transparent"
          placeholder="Search by player name or number..."
          placeholderTextColor={'#777587' as any}
          value={search}
          onChangeText={onChangeSearch}
        />
      </XStack>
    </YStack>
  )
}