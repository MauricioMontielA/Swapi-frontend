import { Image } from 'react-native'
import { Card, Text, XStack, YStack } from 'tamagui'

type Props = {
  title: string
  type: string
  imageUrl: string
  progress: number
  missing: number
  repeated: number
  onPress?: () => void
}

export default function CollectionGridCard({
  title,
  type,
  imageUrl,
  progress,
  missing,
  repeated,
  onPress,
}: Props) {
  return (
    <Card
      backgroundColor="#ffffff"
      borderRadius={16}
      padding="$5"
      borderWidth={1}
      borderColor="#e5eeff"
      pressStyle={{ scale: 0.98 }}
      onPress={onPress}
    >
      <YStack gap="$4">
        <XStack justifyContent="space-between" alignItems="flex-start">
          <YStack
            width={64}
            height={64}
            borderRadius={14}
            overflow="hidden"
            backgroundColor="#dce9ff"
          >
            <Image
              source={{ uri: imageUrl }}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'cover',
              }}
            />
          </YStack>

          <XStack
            backgroundColor="#eff4ff"
            paddingHorizontal="$3"
            paddingVertical="$1"
            borderRadius={999}
          >
            <Text fontSize={12} fontWeight="700" color="#464555">
              {type}
            </Text>
          </XStack>
        </XStack>

        <Text fontSize={24} fontWeight="700" color="#0b1c30">
          {title}
        </Text>

        <YStack gap="$2">
          <XStack justifyContent="space-between">
            <Text fontSize={14} fontWeight="600" color="#464555">
              Progress
            </Text>

            <Text fontSize={14} fontWeight="600" color="#3525cd">
              {progress}%
            </Text>
          </XStack>

          <YStack
            height={10}
            borderRadius={999}
            backgroundColor="#dce9ff"
            overflow="hidden"
          >
            <YStack
              height="100%"
              width={`${progress}%`}
              backgroundColor="#3525cd"
              borderRadius={999}
            />
          </YStack>
        </YStack>

        <XStack gap="$3">
          <StatBox label="Missing" value={missing} />
          <StatBox label="Repeated" value={repeated} primary />
        </XStack>
      </YStack>
    </Card>
  )
}

function StatBox({
  label,
  value,
  primary = false,
}: {
  label: string
  value: number
  primary?: boolean
}) {
  return (
    <YStack
      flex={1}
      backgroundColor={primary ? '#dae2fd' : '#e5eeff'}
      borderRadius={12}
      padding="$3"
      alignItems="center"
      gap="$1"
    >
      <Text
        fontSize={11}
        fontWeight="700"
        color="#464555"
        textTransform="uppercase"
        letterSpacing={1}
      >
        {label}
      </Text>

      <Text
        fontSize={24}
        fontWeight="700"
        color={primary ? '#3525cd' : '#0b1c30'}
      >
        {value}
      </Text>
    </YStack>
  )
}