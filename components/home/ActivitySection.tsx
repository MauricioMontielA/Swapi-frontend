import { Feather } from '@expo/vector-icons'
import { Image } from 'react-native'
import { Button, Card, Text, XStack, YStack } from 'tamagui'

type Activity = {
  id: number
  userName?: string
  message: string
  timeAgo: string
  avatarUrl?: string
  type: 'added' | 'completed' | 'community'
}

type Props = {
  activities: Activity[]
  onViewFeed?: () => void
}

export default function ActivitySection({
  activities,
  onViewFeed,
}: Props) {
  return (
    <Card
      backgroundColor="#ffffff"
      borderRadius={16}
      padding="$4"
      borderWidth={1}
      borderColor="#e5eeff"
    >
      <YStack gap="$5">
        <Text fontSize={24} fontWeight="700" color="#0b1c30">
          Recent Activity
        </Text>

        {activities.map(activity => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}

        <Button
          height={48}
          borderRadius={999}
          backgroundColor="transparent"
          borderWidth={1}
          borderColor="#c7c4d8"
          onPress={onViewFeed}
        >
          <Text color="#464555" fontSize={14} fontWeight="600">
            View Feed
          </Text>
        </Button>
      </YStack>
    </Card>
  )
}

function ActivityItem({ activity }: { activity: Activity }) {
  const isCommunity = activity.type === 'community'

  return (
    <XStack gap="$3" alignItems="flex-start">
      <YStack position="relative">
        {isCommunity ? (
          <XStack
            width={40}
            height={40}
            borderRadius={999}
            backgroundColor="#e2dfff"
            alignItems="center"
            justifyContent="center"
          >
            <Feather name="users" size={18} color="#3525cd" />
          </XStack>
        ) : (
          <Image
            source={{ uri: activity.avatarUrl }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 999,
            }}
          />
        )}

        {!isCommunity && (
          <XStack
            position="absolute"
            bottom={-3}
            right={-3}
            width={20}
            height={20}
            borderRadius={999}
            backgroundColor={
              activity.type === 'added' ? '#22c55e' : '#f59e0b'
            }
            borderWidth={2}
            borderColor="#ffffff"
            alignItems="center"
            justifyContent="center"
          >
            <Feather
              name={activity.type === 'added' ? 'plus' : 'star'}
              size={10}
              color="#ffffff"
            />
          </XStack>
        )}
      </YStack>

      <YStack flex={1}>
        <Text fontSize={14} color="#0b1c30" lineHeight={22}>
          {activity.userName ? `${activity.userName} ${activity.message}` : activity.message}
        </Text>

        <Text fontSize={12} color="#464555" marginTop="$1">
          {activity.timeAgo}
        </Text>
      </YStack>
    </XStack>
  )
}