import { Text, XStack, YStack } from 'tamagui'
import CollectionCard from './CollectionCard'

type Collection = {
  id: number
  title: string
  subtitle: string
  completion: number
  icon: any
  color?: string
  iconBackground?: string
}

type Props = {
  collections: Collection[]
  onViewAll?: () => void
}

export default function CollectionsSection({
  collections,
  onViewAll,
}: Props) {
  return (
    <YStack gap="$3">
      <XStack justifyContent="space-between" alignItems="center">
        <Text fontSize={24} fontWeight="700" color="#0b1c30">
          Your Collections
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

      <YStack gap="$3">
        {collections.map(collection => (
          <CollectionCard
            key={collection.id}
            title={collection.title}
            subtitle={collection.subtitle}
            completion={collection.completion}
            icon={collection.icon}
            color={collection.color}
            iconBackground={collection.iconBackground}
          />
        ))}
      </YStack>
    </YStack>
  )
}