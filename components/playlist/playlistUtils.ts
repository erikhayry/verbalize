import { SearchResultItem, Track } from 'verbalize'

async function addToPlaylist(
    tracks: string[]
): Promise<SpotifyApi.TrackSearchResponse> {
    const url = `/api/playlist/create?tracks=${tracks.join(',')}`
    const responeJSON = await fetch(url)

    return await responeJSON.json()
}

function toId({ id }: Track): string {
    return id
}

function toTrack({ track }: SearchResultItem): Track | undefined {
    return track
}

function outMissingTracks(track: Track | undefined): track is Track {
    return Boolean(track)
}

export async function savePLaylist(
    searchResultItems: SearchResultItem[]
): Promise<void> {
    const ids = searchResultItems
        .map(toTrack)
        .filter(outMissingTracks)
        .map(toId)

    await addToPlaylist(ids)
}
