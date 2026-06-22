import { Feather } from '@expo/vector-icons'
import { Button, Card, Text, XStack, YStack } from 'tamagui'

type Props = {
  onPress?: () => void
}

export default function InviteMoreCard({ onPress }: Props) {
  return (
    <Card
      backgroundColor="#dce9ff"
      borderRadius={20}
      padding="$6"
      borderWidth={1}
      borderColor="#dae2fd"
      alignItems="center"
    >
      <YStack alignItems="center" gap="$4">
        <XStack
          width={64}
          height={64}
          borderRadius={999}
          backgroundColor="#ffffff"
          alignItems="center"
          justifyContent="center"
        >
          <Feather name="users" size={30} color="#3525cd" />
        </XStack>

        <Text fontSize={24} fontWeight="700" color="#0b1c30">
          Want more?
        </Text>

        <Text fontSize={15} color="#464555" textAlign="center" lineHeight={22}>
          Invite friends to Swapi and get notified when they have matches for
          you!
        </Text>

        <Button
          height={46}
          borderRadius={12}
          backgroundColor="#ffffff"
          borderWidth={1}
          borderColor="#c7c4d8"
          paddingHorizontal="$5"
          onPress={onPress}
        >
          <Text color="#3525cd" fontSize={14} fontWeight="700">
            Share Link
          </Text>
        </Button>
      </YStack>
    </Card>
  )
}