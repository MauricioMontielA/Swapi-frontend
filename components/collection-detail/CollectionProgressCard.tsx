import { Card, Text, XStack, YStack } from 'tamagui'

type Props = {
  completion: number
  collected: number
  total: number
  missing: number
  repeated: number
  rank: number
}

export default function CollectionProgressCard({
  completion,
  collected,
  total,
  missing,
  repeated,
  rank,
}: Props) {
  return (
    <Card
      backgroundColor="#ffffff"
      borderRadius={16}
      padding="$5"
      borderWidth={1}
      borderColor="#e5eeff"
    >
      <YStack gap="$4">
        <YStack gap="$1">
          <Text
            fontSize={12}
            fontWeight="700"
            color="#3525cd"
            textTransform="uppercase"
            letterSpacing={1}
          >
            Overall Progress
          </Text>

          <Text fontSize={32} fontWeight="700" color="#0b1c30">
            {completion}% Complete
          </Text>
        </YStack>

        <XStack flexWrap="wrap" gap="$4">
          <ProgressStat
            label="Collected"
            value={`${collected}`}
            suffix={`/${total}`}
            color="#0b1c30"
          />

          <ProgressStat
            label="Missing"
            value={`${missing}`}
            color="#ba1a1a"
          />

          <ProgressStat
            label="Repeated"
            value={`${repeated}`}
            color="#565e74"
          />

          <ProgressStat
            label="Rank"
            value={`#${rank.toLocaleString()}`}
            color="#3525cd"
          />
        </XStack>

        <YStack
          height={12}
          borderRadius={999}
          backgroundColor="#e5eeff"
          overflow="hidden"
        >
          <XStack height="100%">
            <YStack
              height="100%"
              width={`${completion}%`}
              backgroundColor="#3525cd"
            />
            <YStack
              height="100%"
              width="7%"
              backgroundColor="#dae2fd"
              opacity={0.7}
            />
          </XStack>
        </YStack>

        <XStack justifyContent="space-between">
          <Text fontSize={10} fontWeight="800" color="#464555">
            COLLECTION START
          </Text>

          <Text fontSize={10} fontWeight="800" color="#464555">
            GOAL: COMPLETE
          </Text>
        </XStack>
      </YStack>
    </Card>
  )
}

function ProgressStat({
  label,
  value,
  suffix,
  color,
}: {
  label: string
  value: string
  suffix?: string
  color: string
}) {
  return (
    <YStack minWidth="42%" gap="$1">
      <Text fontSize={12} fontWeight="700" color="#464555">
        {label}
      </Text>

      <XStack alignItems="baseline">
        <Text fontSize={24} fontWeight="700" color={color}>
          {value}
        </Text>

        {suffix && (
          <Text fontSize={16} color="#464555">
            {suffix}
          </Text>
        )}
      </XStack>
    </YStack>
  )
}