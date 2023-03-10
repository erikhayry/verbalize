import { ApiResponse, ApiResponseType } from '@/pages/api/interface/api'
import { SearchResultItem, Track } from 'verbalize'

const SEARCH_LIMIT = 50
const MAX_NUMBER_OF_REQUESTS = 4

function toArtist({ name }: SpotifyApi.ArtistObjectSimplified): string {
    return name
}

function toTrack({
    name,
    uri,
    album: {
        images: [{ url, width = 100, height = 100 }],
    },
    artists,
}: SpotifyApi.TrackObjectFull): Track {
    return {
        name,
        id: uri,
        image: { src: url, width, height },
        artists: artists.map(toArtist),
    }
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
    offset: number
): Promise<SpotifyApi.TrackSearchResponse> {
    const url = `/api/search/${searchTerm}?limit=${50}&offset=${offset}`
    const responeJSON = await fetch(url)

    return await responeJSON.json()
}

interface TrackResponse {
    track: Track | undefined
    offset: number
}

async function searchTrack(
    searchTerm: string,
    offset: number
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
    searchTerm: string
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
    }
}

function outEmpty(searchTerm: string): boolean {
    return searchTerm !== ''
}

function getSearchTerms(searchTerm: string): string[] {
    const searchTermAlphaNumeric = searchTerm.replace(/[^a-z0-9 ]+/gi, ' ')

    return searchTermAlphaNumeric.split(' ').filter(outEmpty)
}

export async function search(
    searchTerm: string
): Promise<ApiResponse<SearchResultItem[]>> {
    try {
        const searchTerms = getSearchTerms(searchTerm)
        const searchTrackQueries = searchTerms.map(toSearchTrackQuery)
        const searchResultItems = await Promise.all(searchTrackQueries)

        return {
            type: ApiResponseType.SUCCES,
            data: searchResultItems,
        }
    } catch (e) {
        return {
            type: ApiResponseType.ERROR,
        }
    }
}
