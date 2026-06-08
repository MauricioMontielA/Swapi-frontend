import { Feather, FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Checkbox, Input, Label, ScrollView, Separator, Text, XStack, YStack } from "tamagui";

export default function Signin() {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <YStack
                    flex={1}
                    padding="$5"
                    backgroundColor="#f8f9ff"
                    justifyContent="center"
                >

                    {/* Logo */}
                    <YStack alignItems="center" gap="$3" marginBottom="$6">
                        <YStack
                            width={64}
                            height={64}
                            borderRadius={16}
                            backgroundColor="rgba(53,37,205,0.1)"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Feather name="repeat" size={28} color="#3525cd" />
                        </YStack>

                        <Text fontSize={28} fontWeight="700">
                            Create your SWAPI account
                        </Text>

                        <Text
                            color="#464555"
                            textAlign="center"
                        >
                            Start your collection journey today.
                        </Text>
                    </YStack>

                    {/* Username */}
                    <YStack gap="$2">
                        <Label>Username</Label>

                        <XStack
                            borderWidth={1}
                            borderColor="#c7c4d8"
                            borderRadius={12}
                            backgroundColor="#eff4ff"
                            alignItems="center"
                            paddingHorizontal="$3"
                        >
                            <Feather name="user" size={18} color="#777587" />

                            <Input
                                flex={1}
                                borderWidth={0}
                                backgroundColor="transparent"
                                placeholder="collector_pro"
                            />
                        </XStack>
                    </YStack>

                    {/* Email */}
                    <YStack gap="$2" marginTop="$4">
                        <Label>Email Address</Label>

                        <XStack
                            borderWidth={1}
                            borderColor="#c7c4d8"
                            borderRadius={12}
                            backgroundColor="#eff4ff"
                            alignItems="center"
                            paddingHorizontal="$3"
                        >
                            <Feather name="mail" size={18} color="#777587" />

                            <Input
                                flex={1}
                                borderWidth={0}
                                backgroundColor="transparent"
                                placeholder="hello@example.com"
                            />
                        </XStack>
                    </YStack>

                    {/* Password */}
                    <YStack gap="$2" marginTop="$4">
                        <Label>Password</Label>

                        <XStack
                            borderWidth={1}
                            borderColor="#c7c4d8"
                            borderRadius={12}
                            backgroundColor="#eff4ff"
                            alignItems="center"
                            paddingHorizontal="$3"
                        >
                            <Feather name="lock" size={18} color="#777587" />

                            <Input
                                flex={1}
                                borderWidth={0}
                                backgroundColor="transparent"
                                secureTextEntry={!showPassword}
                                placeholder="••••••••"
                            />

                            <Button
                                chromeless
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <Feather
                                    name={showPassword ? "eye-off" : "eye"}
                                    size={18}
                                />
                            </Button>
                        </XStack>

                        <Text fontSize={12} color="#777587">
                            Must be at least 8 characters long.
                        </Text>
                    </YStack>

                    {/* Terms */}
                    <XStack gap="$3" marginTop="$5">
                        <Checkbox>
                            <Checkbox.Indicator />
                        </Checkbox>

                        <Text flex={1}>
                            I agree to the Terms of Service and Privacy Policy.
                        </Text>
                    </XStack>

                    {/* Create account */}
                    <Button
                        marginTop="$5"
                        height={56}
                        backgroundColor="#3525cd"
                        color="white"
                    >
                        Create Account
                    </Button>

                    {/* Login */}
                    <XStack
                        justifyContent="center"
                        marginTop="$4"
                    >
                        <Text>Already have an account? </Text>

                        <Text color="#3525cd" fontWeight="700">
                            Login
                        </Text>
                    </XStack>

                    {/* Divider */}
                    <XStack
                        alignItems="center"
                        gap="$3"
                        marginVertical="$6"
                    >
                        <Separator flex={1} />
                        <Text>OR SIGN UP WITH</Text>
                        <Separator flex={1} />
                    </XStack>

                    {/* Social */}
                    <XStack gap="$3">
                        <Button
                            flex={1}
                            icon={<FontAwesome name="google" size={18} />}
                            variant="outlined"
                        >
                            Google
                        </Button>

                        <Button
                            flex={1}
                            icon={<FontAwesome name="apple" size={20} />}
                            variant="outlined"
                        >
                            Apple
                        </Button>
                    </XStack>

                </YStack>
            </ScrollView>
        </SafeAreaView>
    )
}