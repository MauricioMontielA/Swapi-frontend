import CardButton from "@/components/profile/CardButton";
import GoalProgressCard from "@/components/profile/GoalProgressCard";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { Button, Card, ScrollView, Text, XStack, YStack } from "tamagui";

const goals = [
  {
    id: 1,
    title: "Vintage Baseball '92",
    percentage: 85,
    description: "2 cards left to complete the set",
    color: "#3525cd",
  },
  {
    id: 2,
    title: "Neon Skies Sticker Pack",
    percentage: 42,
    description: "Collection started last month",
    color: "#bec6e0",
  },
  {
    id: 3,
    title: "World Wonders 3D Cards",
    percentage: 68,
    description: "5 new matches found today",
    color: "#3525cd",
  },
]

export default function Profile() {


  return (
    <ScrollView>
      <YStack padding="$2.5" gap="$4">

        {/* Hero */}
        <ProfileHeader
          imageUrl="https://i.pravatar.cc/300"
          name="Alex Thorne"
          swaps="128"
          rating="4.9"
          sets="12"
        />

        <GoalProgressCard
          goals={goals}
          //onViewAll={() => router.push('/(tabs)/profile/goals')}
          onViewAll={() => console.log("goals")}

        />

        <Card
          backgroundColor="#FFFFFF"
          borderRadius={24}
          padding="$2"
          borderWidth={1}
          borderColor="#e5eeff"
        >

          {/* Menu */}
          <CardButton
            title="My Collection"
            subtitle="482 items archived"
            icon="archive"
          //onPress={() => router.push('/(tabs)/collections')}
          />

          <CardButton
            title="Trade History"
            subtitle="Review your past successes"
            icon="clock"
          //onPress={() => router.push('/history')}
          />

          <CardButton
            title="Security"
            subtitle="Protect your safe space"
            icon="shield"
          //onPress={() => router.push('/security')}
          />

          <CardButton
            title="Help & Support"
            subtitle="We're here for you 24/7"
            icon="help-circle"
          //onPress={() => router.push('/support')}
          />

        </Card>

        {/* Invite */}
        <Card
          backgroundColor="#dae2fd"
          borderRadius={24}
          padding="$5"
          borderWidth={0}
        >
          <XStack
            alignItems="center"
            justifyContent="space-between"
            gap="$4"
          >
            <YStack flex={1}>
              <Text
                fontSize={14}
                fontWeight="600"
                color="#131b2e"
              >
                Invite Friends
              </Text>

              <Text
                fontSize={13}
                color="#3f465c"
                opacity={0.8}
              >
                Both get a &apos;Rare&apos; sticker pack
              </Text>
            </YStack>

            <Button
              height={40}
              borderRadius={999}
              backgroundColor="#ffffff"
              paddingHorizontal="$4"
              pressStyle={{
                scale: 0.96,
                backgroundColor: '#f8f9ff',
              }}
              onPress={() => console.log("goals")}
            >
              <Text
                color="#3525cd"
                fontSize={12}
                fontWeight="700"
              >
                Invite
              </Text>
            </Button>
          </XStack>
        </Card>

      </YStack>
    </ScrollView>
  );
}