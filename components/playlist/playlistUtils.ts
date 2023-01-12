import { Playlist, SearchResultItem, Track } from 'verbalize'

async function addToPlaylist(
    name: string,
    tracks: string[]
): Promise<Playlist> {
    const url = `/api/playlist/create?tracks=${tracks.join(',')}&name=${name}`
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

function toName(name: string, { searchTerm }: SearchResultItem): string {
    return `${name} ${searchTerm}`
}

function getName(searchResultItems: SearchResultItem[]): string {
    const sentence = searchResultItems.slice(0, 5).reduce(toName, '')

    return `${sentence}... by V E R B A L I Z E`
}

export async function savePLaylist(
    searchResultItems: SearchResultItem[]
): Promise<Playlist> {
    const name = getName(searchResultItems)
    const ids = searchResultItems
        .map(toTrack)
        .filter(outMissingTracks)
        .map(toId)

    return addToPlaylist(name, ids)
}
