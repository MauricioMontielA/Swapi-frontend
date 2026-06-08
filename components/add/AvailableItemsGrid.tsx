import { Text, XStack, YStack } from 'tamagui'
import AvailableItemCard, { AvailableItem } from './AvailableItemCard'

type Props = {
  items: AvailableItem[]
  selectedIds: number[]
  onToggleItem: (id: number) => void
}

export default function AvailableItemsGrid({
  items,
  selectedIds,
  onToggleItem,
}: Props) {
  return (
    <YStack gap="$4">
      <XStack justifyContent="space-between" alignItems="flex-end">
        <YStack gap="$1">
          <Text fontSize={28} fontWeight="700" color="#0b1c30">
            Available Items
          </Text>

          <Text fontSize={14} color="#464555">
            Select the items you want to add to your vault.
          </Text>
        </YStack>
      </XStack>

      <XStack flexWrap="wrap" gap="$3" justifyContent="space-between">
        {items.map(item => (
          <AvailableItemCard
            key={item.id}
            item={item}
            selected={selectedIds.includes(item.id)}
            onPress={() => onToggleItem(item.id)}
          />
        ))}
      </XStack>
    </YStack>
  )
}