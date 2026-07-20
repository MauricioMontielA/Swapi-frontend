import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FlatList, Image, Pressable, RefreshControl, StyleSheet } from 'react-native'
import { Card, Spinner, Text, XStack, YStack } from 'tamagui'

import {
  getTradesPage,
  type Trade,
  type TradeStatus,
} from '@/api/tradeService'
import { useTrades } from '@/context/TradesContext'

const PAGE_SIZE = 10

const tabs: { label: string; value: TradeStatus }[] = [
  { label: 'Propuestas', value: 'OPEN' },
  { label: 'Activos', value: 'IN_PROGRESS' },
  { label: 'Historial', value: 'COMPLETED' },
]

function StickerStack({ items, side }: { items: Trade['offeredItems']; side: string }) {
  const visibleItems = items.slice(0, 3)

  return (
    <YStack flex={1} alignItems="center" gap="$2">
      <XStack height={82} width={94} justifyContent="center" alignItems="center">
        {visibleItems.map((item, index) => (
          <YStack
            key={item.id}
            position="absolute"
            left={8 + index * 14}
            zIndex={index}
            transform={[{ rotate: `${(index - 1) * 5}deg` }]}
          >
            <Image source={{ uri: item.imageUrl }} style={styles.stackImage} />
          </YStack>
        ))}
        {items.length > 3 && (
          <XStack style={styles.moreBadge}>
            <Text color="white" fontSize={11} fontWeight="800">+{items.length - 3}</Text>
          </XStack>
        )}
      </XStack>
      <Text fontSize={12} fontWeight="700" color="#0b1c30">
        {items.length} {items.length === 1 ? 'estampa' : 'estampas'}
      </Text>
      <Text fontSize={10} color="#565e74">{side}</Text>
    </YStack>
  )
}

function TradeCard({ trade }: { trade: Trade }) {
  const statusLabel = trade.status === 'OPEN'
    ? 'Nueva'
    : trade.status === 'IN_PROGRESS' ? 'En curso' : 'Completado'

  const { setSelectedTrade } = useTrades()

  const openTrade = (trade: Trade) => {
    setSelectedTrade(trade)

    router.push({
      pathname: '/(tabs)/trades/[id]',
      params: {
        id: trade.id,
      },
    })
  }

  return (
    <Card
      backgroundColor="#ffffff"
      borderRadius={18}
      padding="$4"
      borderWidth={1}
      borderColor="#e5eeff"
      pressStyle={{ scale: 0.985 }}
      //trade={trade}
      onPress={() => openTrade(trade)}
    >
      <YStack gap="$4">
        <XStack justifyContent="space-between" alignItems="center">
          <XStack gap="$3" alignItems="center" flex={1}>
            <Image source={{ uri: trade.trader.profileImageUrl }} style={styles.avatar} />
            <YStack flex={1}>
              <Text fontSize={15} fontWeight="700" color="#0b1c30">{trade.trader.name}</Text>
              <Text fontSize={12} color="#565e74">
                {trade.direction === 'incoming' ? 'Oferta recibida' : 'Oferta enviada'} · {trade.timeUom}
              </Text>
            </YStack>
          </XStack>
          <XStack backgroundColor={trade.status === 'IN_PROGRESS' ? '#e2dfff' : '#dae2fd'} paddingHorizontal="$3" paddingVertical="$1" borderRadius={99}>
            <Text fontSize={11} fontWeight="800" color="#3525cd">{statusLabel}</Text>
          </XStack>
        </XStack>

        <XStack alignItems="center" backgroundColor="#eff4ff" borderRadius={14} padding="$3">
          <StickerStack items={trade.offeredItems} side="Recibes" />
          <XStack width={38} height={38} borderRadius={99} backgroundColor="#3525cd" alignItems="center" justifyContent="center">
            <Feather name="repeat" size={18} color="white" />
          </XStack>
          <StickerStack items={trade.requestedItems} side="Entregas" />
        </XStack>

        <XStack justifyContent="space-between" alignItems="center">
          <Text fontSize={12} color="#565e74" flex={1} numberOfLines={1}>{trade.collection}</Text>
          <XStack alignItems="center" gap="$1">
            <Text fontSize={13} fontWeight="700" color="#3525cd">Ver detalle</Text>
            <Feather name="chevron-right" size={17} color="#3525cd" />
          </XStack>
        </XStack>
      </YStack>
    </Card>
  )
}

export default function TradesScreen() {
  const [selectedTab, setSelectedTab] = useState<TradeStatus>('OPEN')
  const [trades, setTrades] = useState<Trade[]>([])
  const [page, setPage] = useState(0)
  const [isLastPage, setIsLastPage] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const loadingRef = useRef(false)
  const requestIdRef = useRef(0)

  const loadTrades = useCallback(async (
    pageToLoad: number,
    status: TradeStatus,
    refresh = false,
  ) => {
    if (loadingRef.current && !refresh) return

    const requestId = ++requestIdRef.current
    loadingRef.current = true

    if (refresh) setRefreshing(true)
    else if (pageToLoad === 0) setInitialLoading(true)
    else setLoadingMore(true)

    try {
      // Cambiar por getTradesPage(status, pageToLoad, PAGE_SIZE)
      // cuando el endpoint pageable esté disponible.
      const data = await getTradesPage(status, pageToLoad, PAGE_SIZE)


      if (requestId !== requestIdRef.current) return

      setTrades(current => {
        if (pageToLoad === 0) return data.content

        const existingIds = new Set(current.map(trade => trade.id))
        return [...current, ...data.content.filter(trade => !existingIds.has(trade.id))]
      })
      setPage(data.page.number)
      setIsLastPage(data.page.number + 1 >= data.page.totalPages)
    } catch (error) {
      console.error('Error loading trades', error)
    } finally {
      if (requestId === requestIdRef.current) {
        loadingRef.current = false
        setInitialLoading(false)
        setLoadingMore(false)
        setRefreshing(false)
      }
    }
  }, [])

  useEffect(() => {
    requestIdRef.current += 1
    loadingRef.current = false
    setTrades([])
    setPage(0)
    setIsLastPage(false)
    loadTrades(0, selectedTab)
  }, [loadTrades, selectedTab])

  const loadMore = () => {
    if (!loadingRef.current && !isLastPage && trades.length > 0) {
      loadTrades(page + 1, selectedTab)
    }
  }

  const refresh = () => {
    requestIdRef.current += 1
    loadingRef.current = false
    loadTrades(0, selectedTab, true)
  }

  return (
    <YStack flex={1} backgroundColor="#f8f9ff">
      <FlatList
        data={trades}
        keyExtractor={trade => trade.id}
        renderItem={({ item }) => <TradeCard trade={item} />}
        ItemSeparatorComponent={() => <YStack height="$4" />}
        ListHeaderComponent={(
          <YStack gap="$5" marginBottom="$4">
            <YStack gap="$1">
              <Text fontSize={28} fontWeight="800" color="#3525cd">Mis intercambios</Text>
              <Text fontSize={14} color="#565e74">Administra tus propuestas y entregas</Text>
            </YStack>

            <XStack backgroundColor="#eff4ff" borderRadius={14} padding={4}>
              {tabs.map(tab => (
                <Pressable
                  key={tab.value}
                  style={[styles.tab, selectedTab === tab.value && styles.activeTab]}
                  onPress={() => setSelectedTab(tab.value)}
                >
                  <Text fontSize={13} fontWeight="700" color={selectedTab === tab.value ? '#ffffff' : '#565e74'}>{tab.label}</Text>
                </Pressable>
              ))}
            </XStack>
          </YStack>
        )}
        ListEmptyComponent={initialLoading ? (
          <YStack padding="$8" alignItems="center" gap="$3">
            <Spinner size="large" color="#3525cd" />
            <Text color="#565e74">Cargando intercambios...</Text>
          </YStack>
        ) : (
          <Card alignItems="center" padding="$8" backgroundColor="#ffffff" borderRadius={18} gap="$3">
            <Feather name="inbox" size={38} color="#777587" />
            <Text fontSize={18} fontWeight="700" color="#0b1c30">No hay intercambios aquí</Text>
            <Text textAlign="center" color="#565e74">Tus intercambios aparecerán en esta sección.</Text>
          </Card>
        )}
        ListFooterComponent={loadingMore ? (
          <YStack padding="$5" alignItems="center">
            <Spinner color="#3525cd" />
          </YStack>
        ) : <YStack height="$4" />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        onEndReached={loadMore}
        onEndReachedThreshold={0.4}
        refreshControl={(
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            tintColor="#3525cd"
            colors={['#3525cd']}
          />
        )}
      />
    </YStack>
  )
}

const styles = StyleSheet.create({
  content: { padding: 16, paddingTop: 22, paddingBottom: 110, flexGrow: 1 },
  tab: { flex: 1, minHeight: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 10 },
  activeTab: { backgroundColor: '#4f46e5' },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#dce9ff' },
  stackImage: { width: 54, height: 72, borderRadius: 7, borderWidth: 2, borderColor: '#ffffff', backgroundColor: '#dce9ff' },
  moreBadge: { position: 'absolute', right: 0, bottom: 2, zIndex: 10, width: 27, height: 27, borderRadius: 14, backgroundColor: '#3525cd', alignItems: 'center', justifyContent: 'center' },
})
