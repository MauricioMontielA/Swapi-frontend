import { Feather } from '@expo/vector-icons'
import { Button, Text, XStack, YStack } from 'tamagui'

type Props = {
  wantCount: number
  offerCount: number
  onCancel?: () => void
  onSend?: () => void
}

export default function TradeFooter({
  wantCount,
  offerCount,
  onCancel,
  onSend,
}: Props) {
  const canSend = wantCount > 0 && offerCount > 0

  return (
    <YStack
      position="absolute"
      left={0}
      right={0}
      bottom={0}
      backgroundColor="rgba(255,255,255,0.95)"
      borderTopWidth={1}
      borderTopColor="#e5eeff"
      padding="$4"
      gap="$3"
    >
      <XStack alignItems="center" justifyContent="center" gap="$2">
        <BubbleGroup count={wantCount} color="#ffdad6" />

        <Feather name="repeat" size={20} color="#565e74" />

        <BubbleGroup count={offerCount} color="#4f46e5" />

        <Text fontSize={14} fontWeight="600" color="#0b1c30" marginLeft="$2">
          {wantCount} wanted • {offerCount} offered
        </Text>
      </XStack>

      <XStack gap="$3">
        <Button
          flex={1}
          height={48}
          borderRadius={999}
          backgroundColor="transparent"
          borderWidth={1}
          borderColor="#3525cd"
          onPress={onCancel}
        >
          <Text color="#3525cd" fontSize={14} fontWeight="700">
            Cancel
          </Text>
        </Button>

        <Button
          flex={1}
          height={48}
          borderRadius={999}
          backgroundColor="#3525cd"
          opacity={canSend ? 1 : 0.5}
          disabled={!canSend}
          onPress={onSend}
        >
          <Text color="#ffffff" fontSize={14} fontWeight="700">
            Send Proposal
          </Text>
        </Button>
      </XStack>
    </YStack>
  )
}

function BubbleGroup({
  count,
  color,
}: {
  count: number
  color: string
}) {
  const visible = Math.min(count, 3)

  return (
    <XStack marginRight="$1">
      {Array.from({ length: visible }).map((_, index) => (
        <YStack
          key={index}
          width={28}
          height={28}
          borderRadius={999}
          backgroundColor={color}
          borderWidth={2}
          borderColor="#ffffff"
          marginLeft={index === 0 ? 0 : -8}
        />
      ))}

      {count > 3 && (
        <XStack
          width={28}
          height={28}
          borderRadius={999}
          backgroundColor="#d3e4fe"
          borderWidth={2}
          borderColor="#ffffff"
          marginLeft={-8}
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize={10} fontWeight="800" color="#0b1c30">
            +{count - 3}
          </Text>
        </XStack>
      )}
    </XStack>
  )
}