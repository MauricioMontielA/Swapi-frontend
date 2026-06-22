import { Feather } from '@expo/vector-icons'
import { Card, Text, XStack, YStack } from 'tamagui'
import TradeItemCard, { type TradeItem } from './TradeItemCard'

type Props = {
  title: string
  subtitle?: string
  icon: keyof typeof Feather.glyphMap
  iconBackground: string
  iconColor: string
  items: TradeItem[]
  selectedIds: number[]
  onToggle: (itemId: number) => void
  rightAction?: string
}

export default function TradeItemSection({
  title,
  subtitle,
  icon,
  iconBackground,
  iconColor,
  items,
  selectedIds,
  onToggle,
  rightAction,
}: Props) {
  return (
    <YStack gap="$3">
      <XStack justifyContent="space-between" alignItems="center">
        <XStack alignItems="center" gap="$2">
          <XStack
            width={32}
            height={32}
            borderRadius={8}
            backgroundColor={iconBackground}
            alignItems="center"
            justifyContent="center"
          >
            <Feather name={icon} size={18} color={iconColor} />
          </XStack>

          <Text fontSize={24} fontWeight="700" color="#0b1c30">
            {title}
          </Text>
        </XStack>

        {rightAction ? (
          <Text fontSize={14} fontWeight="600" color="#3525cd">
            {rightAction}
          </Text>
        ) : (
          <Text fontSize={14} fontWeight="600" color="#464555">
            {subtitle}
          </Text>
        )}
      </XStack>

      <Card
        backgroundColor="#eff4ff"
        borderRadius={20}
        padding="$4"
        borderWidth={0}
        minHeight={360}
      >
        <XStack flexWrap="wrap" gap="$3" justifyContent="space-between">
          {items.map(item => (
            <TradeItemCard
              key={item.id}
              item={item}
              selected={selectedIds.includes(item.id)}
              onPress={() => onToggle(item.id)}
            />
          ))}
        </XStack>
      </Card>
    </YStack>
  )
}