import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { Image, ScrollView, StyleSheet } from 'react-native';
import { Button, Card, Text, XStack, YStack } from 'tamagui';

import { type TradeItem } from "@/api/tradeService";
import { useTrades } from '@/context/TradesContext';

function ItemsSection({ title, items, accent }: { title: string; items: TradeItem[]; accent: string }) {
  return (
    <YStack gap="$3">
      <XStack justifyContent="space-between" alignItems="center">
        <Text fontSize={13} fontWeight="800" color="#565e74" letterSpacing={0.7}>{title}</Text>
        <XStack backgroundColor={accent} paddingHorizontal="$3" paddingVertical="$1" borderRadius={99}>
          <Text fontSize={11} fontWeight="800" color="#3525cd">{items.length} {items.length === 1 ? 'estampa' : 'estampas'}</Text>
        </XStack>
      </XStack>
      <YStack gap="$3">
        {items.map(item => (
          <Card key={item.id} backgroundColor="#ffffff" borderRadius={16} padding="$3" borderWidth={1} borderColor="#e5eeff">
            <XStack gap="$3" alignItems="center">
              <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
              <YStack flex={1} gap="$1">
                <Text fontSize={16} fontWeight="700" color="#0b1c30">{item.name}</Text>
                <Text fontSize={12} color="#565e74">Estampa {item.number}</Text>
              </YStack>
              <Feather name="check-circle" size={20} color="#4f46e5" />
            </XStack>
          </Card>
        ))}
      </YStack>
    </YStack>
  )
}

export default function TradeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { selectedTrade } = useTrades()

  if (!selectedTrade) {
    return <Text>No se encontró el intercambio</Text>
  }

  if (selectedTrade.id.toString() !== id.toString()) {
    return <Text>El intercambio seleccionado no coincide selectedTrade.id {selectedTrade.id}, id {id}</Text>
  }
  const trade = selectedTrade

  const reviewable = trade.status === 'OPEN'

  return (
    <YStack flex={1} backgroundColor="#f8f9ff">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <YStack gap="$5">
          <Card backgroundColor="#ffffff" borderRadius={18} padding="$4" borderWidth={1} borderColor="#e5eeff">
            <XStack alignItems="center" gap="$3">
              <Image source={{ uri: trade.trader.profileImageUrl }} style={styles.avatar} />
              <YStack flex={1}>
                <Text fontSize={20} fontWeight="800" color="#0b1c30">{trade.trader.name}</Text>
                <XStack alignItems="center" gap="$1">
                  <Feather name="star" size={14} color="#eab308" />
                  <Text fontSize={12} color="#565e74">{trade.trader.reputation} · {trade.trader.trades} intercambios</Text>
                </XStack>
              </YStack>
              <XStack width={38} height={38} borderRadius={19} backgroundColor="#dae2fd" alignItems="center" justifyContent="center">
                <Feather name="shield" size={18} color="#3525cd" />
              </XStack>
            </XStack>
          </Card>

          <ItemsSection title="LO QUE RECIBES" items={trade.offeredItems} accent="#dae2fd" />
          <XStack alignSelf="center" width={44} height={44} borderRadius={22} backgroundColor="#3525cd" alignItems="center" justifyContent="center">
            <Feather name="repeat" size={21} color="white" />
          </XStack>
          <ItemsSection title="LO QUE ENTREGAS" items={trade.requestedItems} accent="#e2dfff" />

          {trade.note && (
            <Card backgroundColor="#eff4ff" borderRadius={14} padding="$4" borderLeftWidth={4} borderLeftColor="#3525cd">
              <Text fontSize={12} fontWeight="800" color="#3525cd">Nota de {trade.trader.name}</Text>
              <Text marginTop="$2" fontSize={14} lineHeight={21} color="#0b1c30">“{trade.note}”</Text>
            </Card>
          )}
        </YStack>
      </ScrollView>

      {reviewable && (
        <XStack padding="$3" paddingBottom="$4" gap="$2" backgroundColor="rgba(248,249,255,0.96)" borderTopWidth={1} borderTopColor="#dce9ff">
          <Button flex={1} height={50} borderWidth={1} borderColor="#ba1a1a" backgroundColor="#ffffff" color="#ba1a1a" fontWeight="700">Rechazar</Button>
          <Button flex={1} height={50} borderWidth={1} borderColor="#3525cd" backgroundColor="#ffffff" color="#3525cd" fontWeight="700">Contraoferta</Button>
          <Button flex={1} height={50} backgroundColor="#3525cd" color="#ffffff" fontWeight="700">Aceptar</Button>
        </XStack>
      )}
    </YStack>
  )
}

const styles = StyleSheet.create({
  content: { padding: 16, paddingBottom: 40 },
  avatar: { width: 58, height: 58, borderRadius: 29, backgroundColor: '#dce9ff' },
  itemImage: { width: 72, height: 96, borderRadius: 9, backgroundColor: '#dce9ff' },
})
