import { Feather } from '@expo/vector-icons'
import { Input, Text, XStack, YStack } from 'tamagui'

type Props = {
  value: string
  onChangeText: (value: string) => void
  onFilter?: () => void
}

export default function AddCollectionSearch({
  value,
  onChangeText,
  onFilter,
}: Props) {
  return (
    <YStack gap="$3">
      <XStack
        height={56}
        borderRadius={16}
        backgroundColor="#eff4ff"
        borderWidth={1}
        borderColor="#c7c4d8"
        alignItems="center"
        paddingHorizontal="$3"
        gap="$2"
      >
        <Feather name="search" size={20} color="#777587" />

        <Input
          flex={1}
          borderWidth={0}
          backgroundColor="transparent"
          placeholder="Search your collections..."
          placeholderTextColor={'#777587' as any}
          value={value}
          onChangeText={onChangeText}
          color="#0b1c30"
        />

        <Feather
          name="filter"
          size={20}
          color="#777587"
          onPress={onFilter}
        />
      </XStack>

      <Text
        fontSize={12}
        fontWeight="700"
        color="#464555"
        textTransform="uppercase"
        opacity={0.7}
      >
        Select a collection to begin adding items
      </Text>
    </YStack>
  )
}