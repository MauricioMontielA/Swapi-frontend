import { Feather } from '@expo/vector-icons'
import { Image } from 'react-native'
import { Card, Text, XStack, YStack } from 'tamagui'

export type AvailableItem = {
  id: number
  number: string
  name: string
  imageUrl?: string
}

type Props = {
  item: AvailableItem
  selected?: boolean
  disabled?: boolean
  onPress?: () => void
}

export default function AvailableItemCard({
  item,
  selected = false,
  disabled = false,
  onPress,
}: Props) {
  return (
    <Card
      width="48%"
      backgroundColor="#ffffff"
      borderRadius={16}
      padding="$3"
      borderWidth={selected ? 2 : 1}
      borderColor={selected ? '#3525cd' : '#e5eeff'}
      opacity={disabled ? 0.6 : 1}
      pressStyle={{ scale: 0.96 }}
      onPress={onPress}
    >
      <YStack gap="$3">
        <YStack
          aspectRatio={3 / 4}
          borderRadius={12}
          overflow="hidden"
          backgroundColor="#e5eeff"
          alignItems="center"
          justifyContent="center"
          position="relative"
        >
          {item.imageUrl ? (
            <Image
              source={{ uri: item.imageUrl }}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'cover',
              }}
            />
          ) : (
            <Feather name="image" size={40} color="#c7c4d8" />
          )}

          <XStack
            position="absolute"
            top={8}
            right={8}
            width={28}
            height={28}
            borderRadius={999}
            backgroundColor={selected ? '#3525cd' : '#e5eeff'}
            alignItems="center"
            justifyContent="center"
          >
            <Feather
              name={selected ? 'check-circle' : 'plus'}
              size={16}
              color={selected ? '#ffffff' : '#464555'}
            />
          </XStack>

          {selected && (
            <XStack
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              backgroundColor="rgba(77,68,227,0.08)"
              alignItems="center"
              justifyContent="center"
            >
              <XStack
                backgroundColor="#3525cd"
                borderRadius={999}
                padding="$2"
              >
                <Feather name="check" size={22} color="#ffffff" />
              </XStack>
            </XStack>
          )}
        </YStack>

        <YStack>
          <Text
            fontSize={14}
            fontWeight="700"
            color={selected ? '#3525cd' : '#464555'}
          >
            #{item.number}
          </Text>

          <Text fontSize={14} color="#0b1c30" numberOfLines={1}>
            {item.name}
          </Text>
        </YStack>
      </YStack>
    </Card>
  )
}