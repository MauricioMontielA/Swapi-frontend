import { Feather } from '@expo/vector-icons'
import { Button, Card, Input, Label, Text, XStack, YStack } from 'tamagui'

type Props = {
  search: string
  onChangeSearch: (value: string) => void
  status: 'NEW' | 'DUPLICATE'
  onChangeStatus: (status: 'NEW' | 'DUPLICATE') => void
}

export default function AddConfiguratorCard({
  search,
  onChangeSearch,
  status,
  onChangeStatus,
}: Props) {
  return (
    <Card
      backgroundColor="#ffffff"
      borderRadius={16}
      padding="$5"
      borderWidth={1}
      borderColor="#e5eeff"
    >
      <YStack gap="$5">
        <YStack gap="$2">
          <Label fontSize={14} fontWeight="600" color="#464555">
            Step 1: Select Collection
          </Label>

          <XStack
            height={52}
            borderRadius={12}
            backgroundColor="#eff4ff"
            borderWidth={1}
            borderColor="#c7c4d8"
            alignItems="center"
            paddingHorizontal="$3"
          >
            <Text flex={1} fontSize={14} fontWeight="600" color="#0b1c30">
              World Cup 2026 Stickers
            </Text>

            <Feather name="chevron-down" size={20} color="#777587" />
          </XStack>
        </YStack>

        <YStack gap="$2">
          <Label fontSize={14} fontWeight="600" color="#464555">
            Step 2: Find Specific Item
          </Label>

          <XStack
            height={52}
            borderRadius={12}
            backgroundColor="#eff4ff"
            borderWidth={1}
            borderColor="#c7c4d8"
            alignItems="center"
            paddingHorizontal="$3"
            gap="$2"
          >
            <Feather name="search" size={18} color="#777587" />

            <Input
              flex={1}
              borderWidth={0}
              backgroundColor="transparent"
              placeholder="Search by name or number"
              placeholderTextColor={'#777587' as any}
              value={search}
              onChangeText={onChangeSearch}
            />
          </XStack>
        </YStack>

        <YStack gap="$3" borderTopWidth={1} borderTopColor="#e5eeff" paddingTop="$4">
          <Text fontSize={14} fontWeight="600" color="#464555">
            Item Status
          </Text>

          <XStack gap="$2">
            <StatusButton
              active={status === 'NEW'}
              icon="star"
              label="New"
              onPress={() => onChangeStatus('NEW')}
            />

            <StatusButton
              active={status === 'DUPLICATE'}
              icon="copy"
              label="Duplicate"
              onPress={() => onChangeStatus('DUPLICATE')}
            />
          </XStack>
        </YStack>
      </YStack>
    </Card>
  )
}

function StatusButton({
  active,
  icon,
  label,
  onPress,
}: {
  active: boolean
  icon: keyof typeof Feather.glyphMap
  label: string
  onPress: () => void
}) {
  return (
    <Button
      flex={1}
      height={48}
      borderRadius={12}
      backgroundColor={active ? '#dae2fd' : '#eff4ff'}
      borderWidth={active ? 2 : 1}
      borderColor={active ? '#3525cd' : '#c7c4d8'}
      pressStyle={{ scale: 0.96 }}
      onPress={onPress}
    >
      <XStack alignItems="center" gap="$2">
        <Feather
          name={icon}
          size={17}
          color={active ? '#3525cd' : '#464555'}
        />

        <Text
          fontSize={14}
          fontWeight="700"
          color={active ? '#3525cd' : '#464555'}
        >
          {label}
        </Text>
      </XStack>
    </Button>
  )
}