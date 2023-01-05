import { SearchResultItem, Track } from 'verbalize'

const SEARCH_LIMIT = 50
const MAX_NUMBER_OF_REQUESTS = 4

function toTrack({ name }: SpotifyApi.TrackObjectFull): Track {
    return { name }
}

function outInexactItems(searchTerm: string, name: string): boolean {
    return searchTerm.toLowerCase() === name.toLowerCase()
}

function getTrackFromResponse(
    searchTerm: string,
    searchResponseTracks: SpotifyApi.TrackObjectFull[]
): Track | undefined {
    const tracks = searchResponseTracks
        .map(toTrack)
        .filter(({ name }) => outInexactItems(searchTerm, name))

    return tracks?.[0]
}

async function fetchTracks(
    searchTerm: string,
    offset = 0
): Promise<SpotifyApi.TrackSearchResponse> {
    const responeJSON = await fetch(
        `/api/search/${searchTerm}?limit=${50}&offset=${offset}`
    )
    return await responeJSON.json()
}

interface TrackResponse {
    track: Track | undefined
    offset: number
}

async function searchTrack(
    searchTerm: string,
    offset?: number
): Promise<TrackResponse> {
    const {
        tracks: { items, offset: nextOffset },
    } = await fetchTracks(searchTerm, offset)

    return {
        track: getTrackFromResponse(searchTerm, items),
        offset: nextOffset + SEARCH_LIMIT,
    }
}

async function toSearchTrackQuery(
    searchTerm: string,
    index: number
): Promise<SearchResultItem> {
    let track: Track | undefined = undefined
    let i = 0
    let nextOffset = 0

    while (i < MAX_NUMBER_OF_REQUESTS && track === undefined) {
        const { offset, track: foundTrack } = await searchTrack(
            searchTerm,
            nextOffset
        )
        track = foundTrack
        nextOffset = offset
        i++
    }

    return {
        searchTerm,
        track,
        index,
    }
}

function getSearchTerms(searchTerm: string): string[] {
    return searchTerm.split(' ')
}

function byIndex(itemA: SearchResultItem, itemB: SearchResultItem) {
    return itemA.index - itemB.index
}

export async function search(searchTerm: string): Promise<SearchResultItem[]> {
    const searchTerms = getSearchTerms(searchTerm)
    const searchTrackQueries = searchTerms.map(toSearchTrackQuery)
    const searchResultItems = await Promise.all(searchTrackQueries)

    return searchResultItems.sort(byIndex)
}
