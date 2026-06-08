import { Dimensions } from 'react-native'
import { XStack } from 'tamagui'
import StickerCard from './StickerCard'

export type Sticker = {
  id: number
  number: number
  imageUrl?: string
  owned: boolean
  duplicates?: number
}

type Props = {
  stickers: Sticker[]
  onStickerPress?: (sticker: Sticker) => void
}

const screenWidth = Dimensions.get('window').width
const horizontalPadding = 32
const gap = 12
const columns = 3
const cardWidth = (screenWidth - horizontalPadding - gap * (columns - 1)) / columns

export default function StickerGrid({
  stickers,
  onStickerPress,
}: Props) {
  return (
    <XStack flexWrap="wrap" gap="$3">
      {stickers.map(sticker => (
        <XStack key={sticker.id} width={cardWidth}>
          <StickerCard
            number={sticker.number}
            imageUrl={sticker.imageUrl}
            owned={sticker.owned}
            duplicates={sticker.duplicates}
            onPress={() => onStickerPress?.(sticker)}
          />
        </XStack>
      ))}
    </XStack>
  )
}