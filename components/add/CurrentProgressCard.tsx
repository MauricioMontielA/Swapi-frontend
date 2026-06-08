import { Feather } from '@expo/vector-icons'
import { Card, Text, XStack, YStack } from 'tamagui'

type Props = {
  title: string
  collected: number
  total: number
}

export default function CurrentProgressCard({
  title,
  collected,
  total,
}: Props) {
  const percentage = Math.round((collected / total) * 100)

  return (
    <Card
      backgroundColor="#3525cd"
      borderRadius={16}
      padding="$5"
      overflow="hidden"
    >
      <YStack gap="$3">
        <Text
          color="rgba(255,255,255,0.7)"
          fontSize={12}
          fontWeight="700"
          textTransform="uppercase"
          letterSpacing={1}
        >
          Current Progress
        </Text>

        <Text color="#ffffff" fontSize={24} fontWeight="700">
          {title}
        </Text>

        <XStack alignItems="flex-end" gap="$2">
          <Text color="#ffffff" fontSize={32} fontWeight="800">
            {collected}
          </Text>

          <Text color="rgba(255,255,255,0.7)" fontSize={14} marginBottom="$1">
            / {total} collected
          </Text>
        </XStack>

        <YStack
          height={8}
          borderRadius={999}
          backgroundColor="rgba(255,255,255,0.2)"
          overflow="hidden"
        >
          <YStack
            height="100%"
            width={`${percentage}%`}
            backgroundColor="#ffffff"
          />
        </YStack>

        <XStack position="absolute" right={-16} bottom={-16} opacity={0.12}>
          <Feather name="circle" size={96} color="#ffffff" />
        </XStack>
      </YStack>
    </Card>
  )
}