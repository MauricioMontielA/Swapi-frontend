import { router, useLocalSearchParams } from 'expo-router'
import { isAxiosError } from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { Alert, ScrollView } from 'react-native'
import { Card, Spinner, Text, YStack } from 'tamagui'

import {
  createTrade,
  getCurrentUserProfile,
  getTradeProposalItems,
  type CurrentUserProfile,
  type TradeCandidateItem,
} from '@/api/collectionService'
import TradeFooter from '@/components/trade-builder/TradeFooter'
import { type TradeItem } from '@/components/trade-builder/TradeItemCard'
import TradeItemSection from '@/components/trade-builder/TradeItemSection'

type CandidateItems = {
  desiredItems: TradeCandidateItem[]
  offeredItems: TradeCandidateItem[]
}

const emptyCandidates: CandidateItems = {
  desiredItems: [],
  offeredItems: [],
}

const toTradeItem = (item: TradeCandidateItem): TradeItem => ({
  id: item.userCollectibleId,
  name: item.collectibleItemName,
  subtitle: `#${item.collectibleItemNumber}`,
  imageUrl: item.collectibleItemImageUrl,
})

const logRequestError = (label: string, error: unknown, startedAt: number) => {
  if (isAxiosError(error)) {
    console.error(`[add-flow] ${label} failed`, {
      durationMs: Date.now() - startedAt,
      message: error.message,
      method: error.config?.method?.toUpperCase(),
      url: error.config?.url,
      status: error.response?.status,
      response: error.response?.data,
    })
    return
  }

  console.error(`[add-flow] ${label} failed`, {
    durationMs: Date.now() - startedAt,
    error,
  })
}

export default function TradeBuilderScreen() {
  const params = useLocalSearchParams<{
    targetUserId?: string
    username?: string
    collectionId?: string
    filteredIds?: string
  }>()
  const targetUserId = Number(params.targetUserId)
  const collectionId = Number(params.collectionId)

  const [candidates, setCandidates] = useState<CandidateItems>(emptyCandidates)
  const [currentUser, setCurrentUser] = useState<CurrentUserProfile | null>(null)
  const [selectedWantIds, setSelectedWantIds] = useState<number[]>([])
  const [selectedOfferIds, setSelectedOfferIds] = useState<number[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const loadProposal = async () => {
      if (!targetUserId || !collectionId) {
        Alert.alert('Unable to open trade', 'The trade information is incomplete.')
        router.back()
        return
      }

      let filteredIds: number[] = []
      try {
        filteredIds = JSON.parse(params.filteredIds || '[]')
      } catch {
        filteredIds = []
      }

      try {
        setLoading(true)
        const proposalRequest = { targetUserId, collectionId, filteredIds }
        console.log('[add-flow] Loading trade detail', proposalRequest)

        const proposalStartedAt = Date.now()
        const proposalPromise = getTradeProposalItems(proposalRequest)
          .then(proposal => {
            console.log('[add-flow] POST /trade/proposal-items succeeded', {
              durationMs: Date.now() - proposalStartedAt,
              desiredItems: proposal.desiredItems?.length ?? 0,
              offeredItems: proposal.offeredItems?.length ?? 0,
            })
            return proposal
          })
          .catch(error => {
            logRequestError('POST /trade/proposal-items', error, proposalStartedAt)
            throw error
          })

        const profileStartedAt = Date.now()
        const profilePromise = getCurrentUserProfile()
          .then(profile => {
            console.log('[add-flow] GET /user/profile/me succeeded', {
              durationMs: Date.now() - profileStartedAt,
              userId: profile.id,
            })
            return profile
          })
          .catch(error => {
            logRequestError('GET /user/profile/me', error, profileStartedAt)
            throw error
          })

        const [proposal, profile] = await Promise.all([
          proposalPromise,
          profilePromise,
        ])
        setCandidates({
          desiredItems: proposal.desiredItems ?? [],
          offeredItems: proposal.offeredItems ?? [],
        })
        setCurrentUser(profile)
      } catch (error) {
        const detail = isAxiosError(error)
          ? `HTTP ${error.response?.status ?? 'network/timeout'}: ${
              typeof error.response?.data === 'string'
                ? error.response.data
                : error.message
            }`
          : 'Unexpected error'
        Alert.alert('Unable to load proposal', detail)
      } finally {
        setLoading(false)
      }
    }

    loadProposal()
  }, [collectionId, params.filteredIds, targetUserId])

  const wantItems = useMemo(
    () => candidates.desiredItems.map(toTradeItem),
    [candidates.desiredItems],
  )
  const offerItems = useMemo(
    () => candidates.offeredItems.map(toTradeItem),
    [candidates.offeredItems],
  )

  const toggle = (
    id: number,
    setter: React.Dispatch<React.SetStateAction<number[]>>,
  ) => setter(current =>
    current.includes(id)
      ? current.filter(itemId => itemId !== id)
      : [...current, id],
  )

  const sendProposal = async () => {
    if (!currentUser || submitting) return

    const itemsToTrade = [
      ...selectedWantIds.map(userCollectible => ({
        fromUser: targetUserId,
        toUser: currentUser.id,
        userCollectible,
        quantity: 1,
      })),
      ...selectedOfferIds.map(userCollectible => ({
        fromUser: currentUser.id,
        toUser: targetUserId,
        userCollectible,
        quantity: 1,
      })),
    ]

    const startedAt = Date.now()
    try {
      setSubmitting(true)
      console.log('[add-flow] Creating trade', {
        targetUserId,
        selectedWantIds,
        selectedOfferIds,
        itemsToTrade,
      })
      await createTrade(itemsToTrade)
      console.log('[add-flow] POST /trade succeeded', {
        durationMs: Date.now() - startedAt,
      })
      Alert.alert('Proposal sent', 'Your trade proposal was created successfully.')
      router.replace('/(tabs)/trades' as any)
    } catch (error) {
      logRequestError('POST /trade', error, startedAt)
      Alert.alert('Unable to send proposal', 'Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <YStack flex={1} alignItems="center" justifyContent="center" gap="$3">
        <Spinner size="large" color="#3525cd" />
        <Text>Loading trade options...</Text>
      </YStack>
    )
  }

  return (
    <YStack flex={1} backgroundColor="#f8f9ff">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 150 }}
      >
        <YStack gap="$6">
          <Card backgroundColor="#ffffff" borderRadius={16} padding="$5">
            <Text fontSize={14} color="#565e74">Trade with</Text>
            <Text fontSize={24} fontWeight="700" color="#0b1c30">
              {params.username || 'Collector'}
            </Text>
          </Card>

          <TradeItemSection
            title="What you want"
            subtitle={`${wantItems.length} available`}
            icon="shopping-bag"
            iconBackground="#ffdad6"
            iconColor="#ba1a1a"
            items={wantItems}
            selectedIds={selectedWantIds}
            onToggle={id => toggle(id, setSelectedWantIds)}
          />

          <TradeItemSection
            title="What you offer"
            icon="archive"
            iconBackground="#dae2fd"
            iconColor="#3525cd"
            items={offerItems}
            selectedIds={selectedOfferIds}
            onToggle={id => toggle(id, setSelectedOfferIds)}
          />
        </YStack>
      </ScrollView>

      <TradeFooter
        wantCount={selectedWantIds.length}
        offerCount={selectedOfferIds.length}
        onCancel={() => router.back()}
        onSend={sendProposal}
      />
    </YStack>
  )
}
