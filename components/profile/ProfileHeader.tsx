import { Feather } from '@expo/vector-icons'
import { Image } from 'react-native'
import { Text, XStack, YStack } from 'tamagui'

type ProfileHeaderProps = {
  imageUrl: string
  name: string
  badgeText?: string
  bio?: string
  swaps: string
  rating: string
  sets: string
}

export default function ProfileHeader({
  imageUrl,
  name,
  badgeText = 'Active Collector',
  bio = 'Building a complete set of vintage sports cards and holographic stickers.',
  swaps,
  rating,
  sets,
}: ProfileHeaderProps) {
  return (
    <YStack
      backgroundColor="#4f46e5"
      borderRadius={32}
      padding="$5"
      alignItems="center"
      gap="$4"
      overflow="hidden"
    >
      <YStack position="relative">
        <YStack
          width={140}
          height={140}
          borderRadius={999}
          overflow="hidden"
          borderWidth={4}
          borderColor="#f8f9ff"
          backgroundColor="#ffffff"
        >
          <Image
            source={{ uri: imageUrl }}
            style={{ width: '100%', height: '100%' }}
          />
        </YStack>

        <XStack
          position="absolute"
          bottom={0}
          right={0}
          backgroundColor="#565e74"
          paddingHorizontal="$2"
          paddingVertical="$1"
          borderRadius={999}
          borderWidth={2}
          borderColor="#f8f9ff"
          alignItems="center"
          gap="$1"
        >
          <Feather name="check-circle" size={12} color="white" />

          <Text color="white" fontSize={11} fontWeight="700">
            PRO
          </Text>
        </XStack>
      </YStack>

      <YStack alignItems="center" gap="$2">
        <Text fontSize={28} fontWeight="700" color="white">
          {name}
        </Text>

        <XStack
          backgroundColor="#d3e4fe"
          paddingHorizontal="$3"
          paddingVertical="$1.5"
          borderRadius={999}
        >
          <Text color="#3525cd" fontSize={13} fontWeight="600">
            {badgeText}
          </Text>
        </XStack>

        <Text
          color="rgba(255,255,255,0.8)"
          fontSize={14}
          textAlign="center"
          lineHeight={22}
        >
          {bio}
        </Text>
      </YStack>

      <XStack gap="$3" width="100%">
        <ProfileStat value={swaps} label="Swaps" />
        <ProfileStat value={rating} label="Rating" showStar />
        <ProfileStat value={sets} label="Sets" />
      </XStack>
    </YStack>
  )
}

function ProfileStat({
  value,
  label,
  showStar = false,
}: {
  value: string
  label: string
  showStar?: boolean
}) {
  return (
    <YStack
      flex={1}
      backgroundColor="rgba(255,255,255,0.10)"
      borderRadius={16}
      padding="$3"
      alignItems="center"
      gap="$1"
    >
      <XStack alignItems="center" gap="$1">
        <Text fontSize={22} fontWeight="700" color="white">
          {value}
        </Text>

        {showStar && (
          <Feather name="star" size={16} color="#facc15" />
        )}
      </XStack>

      <Text
        fontSize={11}
        fontWeight="700"
        color="rgba(255,255,255,0.7)"
        textTransform="uppercase"
        letterSpacing={1}
      >
        {label}
      </Text>
    </YStack>
  )
}