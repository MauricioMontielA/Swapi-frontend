import { Text, XStack, YStack } from 'tamagui'

type GoalProgressItemProps = {
  title: string
  percentage: number
  description: string
  color?: string
}

export function GoalProgressItem({
  title,
  percentage,
  description,
  color = '#3525cd',
}: GoalProgressItemProps) {
  return (
    <YStack gap="$2">
      <XStack justifyContent="space-between">
        <Text
          fontSize={14}
          fontWeight="600"
          color="#0b1c30"
        >
          {title}
        </Text>

        <Text
          fontSize={14}
          fontWeight="600"
          color="#3525cd"
        >
          {percentage}%
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
          width={`${percentage}%`}
          backgroundColor={color}
        />
      </YStack>

      <Text
        fontSize={12}
        color="#464555"
      >
        {description}
      </Text>
    </YStack>
  )
}