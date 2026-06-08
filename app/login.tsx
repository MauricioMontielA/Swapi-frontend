import { login } from '@/services/authService';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Button,
  Card,
  Input,
  Label,
  Separator,
  Text,
  XStack,
  YStack,
} from 'tamagui';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    try {
      const token = await login({
        email,
        password,
      });

      console.log('Token guardado:', token);
      if (token) {
        router.replace('/(tabs)/home')
      }
    } catch (error) {
      console.log('Error en login:', error);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0b1c30' }}>
      <YStack
        flex={1}
        backgroundColor="#0b1c30"
        alignItems="center"
        justifyContent="center"
        padding="$4"
      >
        <Card
          width="100%"
          maxWidth={420}
          padding="$6"
          borderRadius={24}
          backgroundColor="#f8f9ff"
          elevation="$6"
        >
          <YStack alignItems="center" gap="$2" marginBottom="$6">
            <Text
              fontSize={48}
              fontWeight="800"
              color="#3525cd"
              letterSpacing={-1}
            >
              Swapi
            </Text>

            <Text
              fontSize={16}
              color="#464555"
              textAlign="center"
              lineHeight={24}
            >
              Join the community and complete your collections.
            </Text>
          </YStack>

          <YStack gap="$4">
            <YStack gap="$2">
              <Label
                fontSize={14}
                fontWeight="600"
                color="#0b1c30"
                paddingLeft="$1"
              >
                Email or Username
              </Label>

              <Input
                height={52}
                borderRadius={12}
                backgroundColor="#eff4ff"
                borderColor="#c7c4d8"
                color="#0b1c30"
                placeholder="collector@swapi.com"
                placeholderTextColor={'#777587' as any}
                fontSize={16}
                focusStyle={{
                  borderColor: '#3525cd',
                  borderWidth: 2,
                }}
                value={email}
                onChangeText={setEmail}
              />
            </YStack>

            <YStack gap="$2">
              <XStack justifyContent="space-between" alignItems="center">
                <Label
                  fontSize={14}
                  fontWeight="600"
                  color="#0b1c30"
                  paddingLeft="$1"
                >
                  Password
                </Label>

                <Text
                  fontSize={12}
                  fontWeight="700"
                  color="#3525cd"
                  onPress={() => console.log('Forgot password')}
                >
                  Forgot Password?
                </Text>
              </XStack>

              <Input
                height={52}
                borderRadius={12}
                backgroundColor="#eff4ff"
                borderColor="#c7c4d8"
                color="#0b1c30"
                placeholder="••••••••"
                placeholderTextColor={'#777587' as any}
                secureTextEntry
                fontSize={16}
                focusStyle={{
                  borderColor: '#3525cd',
                  borderWidth: 2,
                }}
                value={password}
                onChangeText={setPassword}
              />
            </YStack>

            <Button
              height={56}
              borderRadius={12}
              backgroundColor="#3525cd"
              pressStyle={{
                scale: 0.98,
                backgroundColor: '#4f46e5',
              }}
              onPress={() => handleLogin()}
            >
              <Text color="#ffffff" fontSize={14} fontWeight="600">
                Sign In
              </Text>
            </Button>
          </YStack>

          <XStack alignItems="center" gap="$3" marginVertical="$6">
            <Separator flex={1} borderColor="#c7c4d8" />
            <Text fontSize={12} fontWeight="700" color="#777587">
              or continue with
            </Text>
            <Separator flex={1} borderColor="#c7c4d8" />
          </XStack>

          <XStack gap="$3" marginBottom="$6">
            <Button
              flex={1}
              height={48}
              borderRadius={12}
              backgroundColor="transparent"
              borderWidth={1}
              borderColor="#c7c4d8"
              pressStyle={{
                scale: 0.95,
                backgroundColor: '#dce9ff',
              }}
              icon={<FontAwesome name="google" size={18} color="#0b1c30" />}
            >
              <Text fontSize={14} fontWeight="600" color="#0b1c30">
                Google
              </Text>
            </Button>

            <Button
              flex={1}
              height={48}
              borderRadius={12}
              backgroundColor="transparent"
              borderWidth={1}
              borderColor="#c7c4d8"
              pressStyle={{
                scale: 0.95,
                backgroundColor: '#dce9ff',
              }}
              icon={<FontAwesome name="apple" size={20} color="#0b1c30" />}
            >
              <Text fontSize={14} fontWeight="600" color="#0b1c30">
                Apple
              </Text>
            </Button>
          </XStack>

          <XStack justifyContent="center" gap="$1">
            <Text fontSize={16} color="#464555">
              Don&apos;t have an account?
            </Text>

            <Text
              fontSize={14}
              fontWeight="600"
              color="#3525cd"
              onPress={() => router.push('/signIn')
              }
            >
              Sign Up
            </Text>
          </XStack>
        </Card>

        <XStack marginTop="$5" alignItems="center" gap="$2" opacity={0.55}>
          <YStack
            width={32}
            height={40}
            borderRadius={8}
            backgroundColor="rgba(53, 37, 205, 0.2)"
            borderWidth={1}
            borderColor="rgba(53, 37, 205, 0.3)"
            alignItems="center"
            justifyContent="center"
          >
            <Feather name="star" size={14} color="#4f46e5" />
          </YStack>

          <Text
            fontSize={12}
            fontWeight="700"
            color="#ffffff"
            letterSpacing={2}
            textTransform="uppercase"
          >
            Verified Community Trades
          </Text>
        </XStack>
      </YStack>
    </SafeAreaView>
  )
}

