import { Feather } from '@expo/vector-icons'
import { Button, Input, Text, XStack, YStack } from 'tamagui'

type Props = {
  value: string
  onChangeText: (value: string) => void
  onFilter?: () => void
  onSort?: () => void
}

export default function CollectionSearchBar({
  value,
  onChangeText,
  onFilter,
  onSort,
}: Props) {
  return (
    <YStack gap="$3">
      <XStack
        height={52}
        borderRadius={12}
        backgroundColor="#f1f5f9"
        borderWidth={1}
        borderColor="#e5eeff"
        alignItems="center"
        paddingHorizontal="$3"
        gap="$2"
      >
        <Feather name="search" size={20} color="#464555" />

        <Input
          flex={1}
          borderWidth={0}
          backgroundColor="transparent"
          placeholder="Search stickers..."
          placeholderTextColor={'#777587' as any}
          color="#0b1c30"
          value={value}
          onChangeText={onChangeText}
        />
      </XStack>

      <XStack gap="$2">
        <Button
          flex={1}
          height={48}
          borderRadius={12}
          backgroundColor="#dae2fd"
          onPress={onFilter}
        >
          <XStack alignItems="center" gap="$2">
            <Feather name="filter" size={18} color="#5c647a" />
            <Text fontSize={14} fontWeight="600" color="#5c647a">
              Filters
            </Text>
          </XStack>
        </Button>

        <Button
          width={52}
          height={48}
          borderRadius={12}
          backgroundColor="#ffffff"
          borderWidth={1}
          borderColor="#e5eeff"
          onPress={onSort}
        >
          <Feather name="sliders" size={18} color="#464555" />
        </Button>
      </XStack>
    </YStack>
  )
}