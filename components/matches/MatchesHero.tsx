import { Feather } from '@expo/vector-icons'
import { Text, XStack, YStack } from 'tamagui'

export default function MatchesHero() {
  return (
    <YStack
      backgroundColor="#4f46e5"
      borderRadius={28}
      padding="$6"
      gap="$4"
      overflow="hidden"
    >
      <Text fontSize={42} fontWeight="800" color="#ffffff" lineHeight={46}>
        Great news!{'\n'}Matches found.
      </Text>

      <Text fontSize={16} color="#e2dfff" lineHeight={24}>
        We&apos;ve scanned the community and found 12 collectors who have
        exactly what you&apos;re looking for.
      </Text>

      <XStack gap="$3" flexWrap="wrap">
        <HeroPill icon="check-circle" label="Verified Traders" />
        <HeroPill icon="zap" label="Instant Matches" />
      </XStack>
    </YStack>
  )
}

function HeroPill({
  icon,
  label,
}: {
  icon: keyof typeof Feather.glyphMap
  label: string
}) {
  return (
    <XStack
      backgroundColor="rgba(255,255,255,0.18)"
      paddingHorizontal="$3"
      paddingVertical="$2"
      borderRadius={999}
      alignItems="center"
      gap="$2"
    >
      <Feather name={icon} size={16} color="#ffffff" />

      <Text fontSize={14} fontWeight="600" color="#ffffff">
        {label}
      </Text>
    </XStack>
  )
}