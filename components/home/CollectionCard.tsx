import { Feather } from '@expo/vector-icons'
import { Card, Text, XStack, YStack } from 'tamagui'

type Props = {
  title: string
  subtitle: string
  completion: number
  icon: keyof typeof Feather.glyphMap
  color?: string
  iconBackground?: string
}

export default function CollectionCard({
  title,
  subtitle,
  completion,
  icon,
  color = '#3525cd',
  iconBackground = '#dae2fd',
}: Props) {
  return (
    <Card
      backgroundColor="#ffffff"
      borderRadius={16}
      padding="$4"
      borderWidth={1}
      borderColor="#e5eeff"
      pressStyle={{ scale: 0.98 }}
    >
      <YStack gap="$4">
        <XStack alignItems="center" gap="$3">
          <XStack
            width={48}
            height={48}
            borderRadius={12}
            backgroundColor={iconBackground}
            alignItems="center"
            justifyContent="center"
          >
            <Feather name={icon} size={22} color={color} />
          </XStack>

          <YStack>
            <Text fontSize={14} fontWeight="600" color="#0b1c30">
              {title}
            </Text>

            <Text fontSize={12} color="#464555">
              {subtitle}
            </Text>
          </YStack>
        </XStack>

        <YStack gap="$2">
          <XStack justifyContent="space-between">
            <Text fontSize={12} fontWeight="700" color="#464555">
              Completion
            </Text>

            <Text fontSize={12} fontWeight="700" color={color}>
              {completion}%
            </Text>
          </XStack>

          <YStack
            height={12}
            borderRadius={999}
            backgroundColor="#e5eeff"
            overflow="hidden"
          >
            <YStack
              height="100%"
              width={`${completion}%`}
              backgroundColor={color}
              borderRadius={999}
            />
          </YStack>
        </YStack>
      </YStack>
    </Card>
  )
}