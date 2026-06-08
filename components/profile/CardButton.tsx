// components/CardButton.tsx

import { Feather } from '@expo/vector-icons'
import { Card, Text, XStack, YStack } from 'tamagui'

type CardButtonProps = {
    title: string
    subtitle: string
    icon: keyof typeof Feather.glyphMap
    onPress?: () => void
    iconBackground?: string
    iconColor?: string
}

export default function CardButton({
    title,
    subtitle,
    icon,
    onPress,
    iconBackground = '#e5eeff',
    iconColor = '#3525cd',
}: CardButtonProps) {
    return (
        <Card
            //borderWidth={1}
            //borderColor="#e5eeff"
            backgroundColor="#FFFFFF"
            borderRadius={20}
            marginBottom="$3"
            pressStyle={{
                scale: 0.98,
            }}
            onPress={onPress}
        >
            <XStack
                alignItems="center"
                padding="$4"
                gap="$4"
            >
                <XStack
                    width={48}
                    height={48}
                    borderRadius={12}
                    backgroundColor={iconBackground}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Feather
                        name={icon}
                        size={22}
                        color={iconColor}
                    />
                </XStack>

                <YStack flex={1}>
                    <Text
                        fontSize={14}
                        fontWeight="600"
                        color="#0b1c30"
                    >
                        {title}
                    </Text>

                    <Text
                        fontSize={12}
                        color="#464555"
                    >
                        {subtitle}
                    </Text>
                </YStack>

                <Feather
                    name="chevron-right"
                    size={20}
                    color="#777587"
                />
            </XStack>
        </Card>
    )
}