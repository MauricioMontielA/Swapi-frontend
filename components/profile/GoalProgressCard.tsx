import { Card, Text, XStack, YStack } from "tamagui"
import { GoalProgressItem } from "./GoalProgressItem"

type Goal = {
  id: number
  title: string
  percentage: number
  description: string
  color?: string
}

type GoalProgressCardProps = {
  goals: Goal[]
  onViewAll?: () => void
}

export default function GoalProgressCard({
  goals,
  onViewAll,
}: GoalProgressCardProps) {
  return (
    <Card
      backgroundColor="#FFFFFF"
      borderRadius={24}
      padding="$5"
      borderWidth={1}
      borderColor="#e5eeff"
    >
      <YStack gap="$5">

        <XStack
          justifyContent="space-between"
          alignItems="center"
        >
          <Text
            fontSize={24}
            fontWeight="700"
            color="#0b1c30"
          >
            Active Goals
          </Text>

          <Text
            color="#3525cd"
            fontSize={14}
            fontWeight="600"
            onPress={onViewAll}
          >
            View All
          </Text>
        </XStack>

        {goals.map(goal => (
          <GoalProgressItem
            key={goal.id}
            title={goal.title}
            percentage={goal.percentage}
            description={goal.description}
            color={goal.color}
          />
        ))}

      </YStack>
    </Card>
  )
}