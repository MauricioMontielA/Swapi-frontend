import { Text, XStack, YStack } from 'tamagui'
import SuggestedCollectionCard, {
    type SuggestedCollection,
} from './SuggestedCollectionCard'

type Props = {
  collections: SuggestedCollection[]
  onExploreAll?: () => void
  onPressCollection?: (id: number) => void
}

export default function SuggestedCollectionsSection({
  collections,
  onExploreAll,
  onPressCollection,
}: Props) {
  return (
    <YStack gap="$4">
      <XStack justifyContent="space-between" alignItems="center">
        <Text fontSize={24} fontWeight="700" color="#0b1c30">
          While you wait...
        </Text>

        <Text color="#3525cd" fontSize={14} fontWeight="600" onPress={onExploreAll}>
          Explore All
        </Text>
      </XStack>

      <YStack gap="$4">
        {collections.map(collection => (
          <SuggestedCollectionCard
            key={collection.id}
            collection={collection}
            onPress={() => onPressCollection?.(collection.id)}
          />
        ))}
      </YStack>
    </YStack>
  )
}