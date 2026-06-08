import { Button, Card, Text, XStack, YStack } from 'tamagui'

type Props = {
  onPress?: () => void
}

export default function ExploreCatalogCard({ onPress }: Props) {
  return (
    <Card
      backgroundColor="#4f46e5"
      borderRadius={16}
      padding="$5"
      overflow="hidden"
      pressStyle={{ scale: 0.98 }}
    >
      <YStack gap="$4">
        <YStack gap="$2">
          <Text fontSize={24} fontWeight="700" color="#ffffff">
            Missing something?
          </Text>

          <Text fontSize={15} color="rgba(255,255,255,0.9)" lineHeight={22}>
            Start tracking a new collection today. We support over 500+
            different sticker albums and card games.
          </Text>
        </YStack>

        <XStack>
          <Button
            height={44}
            borderRadius={999}
            backgroundColor="#ffffff"
            paddingHorizontal="$5"
            pressStyle={{ scale: 0.96 }}
            onPress={onPress}
          >
            <Text color="#3525cd" fontSize={14} fontWeight="600">
              Explore Catalog
            </Text>
          </Button>
        </XStack>
      </YStack>
    </Card>
  )
}