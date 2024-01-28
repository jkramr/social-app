import {AppBskyActorDefs, AppBskyGraphGetMutes} from '@atproto/api'
import {
  useInfiniteQuery,
  InfiniteData,
  QueryClient,
  QueryKey,
} from '@tanstack/react-query'

import {getAgent} from '#/state/session'

export const RQKEY = () => ['my-muted-accounts']
type RQPageParam = string | undefined

export function useMyMutedAccountsQuery() {
  return useInfiniteQuery<
    AppBskyGraphGetMutes.OutputSchema,
    Error,
    InfiniteData<AppBskyGraphGetMutes.OutputSchema>,
    QueryKey,
    RQPageParam
  >({
    queryKey: RQKEY(),
    async queryFn({pageParam}: {pageParam: RQPageParam}) {
      const res = await getAgent().app.bsky.graph.getMutes({
        limit: 30,
        cursor: pageParam,
      })
      return res.data
    },
    initialPageParam: undefined,
    getNextPageParam: lastPage => lastPage.cursor,
  })
}

export function* findAllProfilesInQueryData(
  queryClient: QueryClient,
  did: string,
): Generator<AppBskyActorDefs.ProfileView, void> {
  const queryDatas = queryClient.getQueriesData<
    InfiniteData<AppBskyGraphGetMutes.OutputSchema>
  >({
    queryKey: ['my-muted-accounts'],
  })
  for (const [_queryKey, queryData] of queryDatas) {
    if (!queryData?.pages) {
      continue
    }
    for (const page of queryData?.pages) {
      for (const mute of page.mutes) {
        if (mute.did === did) {
          yield mute
        }
      }
    }
  }
}
