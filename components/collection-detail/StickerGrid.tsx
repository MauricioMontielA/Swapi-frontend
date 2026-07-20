import { useWindowDimensions } from 'react-native'
import { XStack } from 'tamagui'
import StickerCard from './StickerCard'

export type Sticker = {
  id: number
  number: number | string
  imageUrl?: string
  owned: boolean
  duplicates?: number
}

type Props = {
  stickers: Sticker[]
  onStickerPress?: (sticker: Sticker) => void
}

const horizontalPadding = 32
const gap = 12
const columns = 3

export default function StickerGrid({
  stickers,
  onStickerPress,
}: Props) {
  const { width: screenWidth } = useWindowDimensions()
  const cardWidth =
    (screenWidth - horizontalPadding - gap * (columns - 1)) / columns

  return (
    <XStack flexWrap="wrap" gap={gap}>
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
