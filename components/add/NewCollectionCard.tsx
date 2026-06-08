import { Feather } from '@expo/vector-icons'
import { Card, Text, XStack, YStack } from 'tamagui'

type Props = {
  onPress?: () => void
}

export default function NewCollectionCard({ onPress }: Props) {
  return (
    <Card
      backgroundColor="#eff4ff"
      borderRadius={16}
      padding="$5"
      borderWidth={2}
      borderColor="#c7c4d8"
      borderStyle="dashed"
      alignItems="center"
      justifyContent="center"
      minHeight={260}
      pressStyle={{ scale: 0.98, borderColor: '#3525cd' }}
      onPress={onPress}
    >
      <YStack alignItems="center" gap="$3">
        <XStack
          width={64}
          height={64}
          borderRadius={999}
          backgroundColor="#ffffff"
          alignItems="center"
          justifyContent="center"
        >
          <Feather name="plus" size={30} color="#3525cd" />
        </XStack>

        <Text fontSize={24} fontWeight="700" color="#0b1c30">
          New Collection
        </Text>

        <Text fontSize={14} color="#464555" textAlign="center" lineHeight={21}>
          Can&apos;t find what you&apos;re looking for? Create a new set to start tracking
          your progress.
        </Text>
      </YStack>
    </Card>
  )
}