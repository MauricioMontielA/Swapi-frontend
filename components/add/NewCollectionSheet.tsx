import { Feather } from '@expo/vector-icons'
import { Image, Modal } from 'react-native'
import { Button, Input, Text, XStack, YStack } from 'tamagui'

export type RecommendedCollection = {
    id: number
    title: string
    subtitle: string
    imageUrl: string
}

type Props = {
    open: boolean
    onClose: () => void
    collections: RecommendedCollection[]
    onSelectCollection: (collectionId: number) => void
}

export default function NewCollectionSheet({
    open,
    onClose,
    collections,
    onSelectCollection,
}: Props) {
    return (
        <Modal visible={open} transparent animationType="slide">
            <YStack
                flex={1}
                justifyContent="flex-end"
                backgroundColor="rgba(33,49,69,0.4)"
            >
                <YStack
                    backgroundColor="#ffffff"
                    borderTopLeftRadius={24}
                    borderTopRightRadius={24}
                    padding="$4"
                    maxHeight="75%"
                >
                    <YStack alignItems="center" marginBottom="$4">
                        <YStack
                            width={48}
                            height={6}
                            borderRadius={999}
                            backgroundColor="#c7c4d8"
                            opacity={0.5}
                        />
                    </YStack>

                    <XStack justifyContent="space-between" alignItems="center" marginBottom="$4">
                        <Text fontSize={24} fontWeight="700" color="#0b1c30">
                            Empieza una nueva colección
                        </Text>

                        <Button circular chromeless onPress={onClose}>
                            <Feather name="x" size={22} color="#565e74" />
                        </Button>
                    </XStack>

                    <XStack
                        height={52}
                        borderRadius={14}
                        backgroundColor="#e5eeff"
                        alignItems="center"
                        paddingHorizontal="$3"
                        gap="$2"
                        marginBottom="$5"
                    >
                        <Feather name="search" size={18} color="#777587" />

                        <Input
                            flex={1}
                            borderWidth={0}
                            backgroundColor="transparent"
                            placeholder="Buscar colecciones..."
                            placeholderTextColor={'#777587' as any}
                        />
                    </XStack>

                    <Text
                        fontSize={12}
                        fontWeight="700"
                        color="#565e74"
                        textTransform="uppercase"
                        letterSpacing={1}
                        marginBottom="$3"
                    >
                        Colecciones Recomendadas
                    </Text>

                    <YStack gap="$3">
                        {collections.map(collection => (
                            <RecommendedCollectionRow
                                key={collection.id}
                                collection={collection}
                                onPress={() => onSelectCollection(collection.id)}
                            />
                        ))}
                    </YStack>
                </YStack>
            </YStack>
        </Modal>
    )
}

function RecommendedCollectionRow({
    collection,
    onPress,
}: {
    collection: RecommendedCollection
    onPress: () => void
}) {
    return (
        <XStack
            backgroundColor="#eff4ff"
            borderRadius={16}
            padding="$3"
            borderWidth={1}
            borderColor="#e5eeff"
            alignItems="center"
            gap="$3"
            pressStyle={{ scale: 0.98 }}
            onPress={onPress}
        >
            <YStack
                width={64}
                height={64}
                borderRadius={12}
                overflow="hidden"
                backgroundColor="#dce9ff"
            >
                <Image
                    source={{ uri: collection.imageUrl }}
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                />
            </YStack>

            <YStack flex={1}>
                <Text fontSize={14} fontWeight="600" color="#0b1c30">
                    {collection.title}
                </Text>

                <Text fontSize={12} color="#565e74">
                    {collection.subtitle}
                </Text>
            </YStack>

            <Button circular size="$3" backgroundColor="#3525cd" onPress={onPress}>
                <Feather name="plus" size={18} color="#ffffff" />
            </Button>
        </XStack>
    )
}