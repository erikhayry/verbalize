const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const BASIC = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'
const USER_ENDPOINT = 'https://api.spotify.com/v1/me'
const SEARCH_ENDPOINT = 'https://api.spotify.com/v1/search?type=track'
function ADD_TO_PLAYLIST_ENDPOINT(playlistId: string): string {
    return `https://api.spotify.com/v1/playlists/${playlistId}/tracks`
}
function CREATE_PLAYLIST_ENDPOINT(userId: string): string {
    return `https://api.spotify.com/v1/users/${userId}/playlists`
}

interface HEADERS {
    headers: {
        Authorization: string
    }
}

function getHeaders(accessToken: string): HEADERS {
    return {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    }
}

async function getAccessToken(
    refreshToken: string
): Promise<{ access_token: string }> {
    const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${BASIC}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        }),
    })

    return response.json()
}

export async function getSearchResult(
    refreshToken: string,
    searchTerm: string,
    pagination: {
        offset: string
        limit: string
    }
) {
    const { access_token } = await getAccessToken(refreshToken)
    const { offset, limit } = pagination
    const url = `${SEARCH_ENDPOINT}&q=${searchTerm}&offset=${offset}&limit=${limit}`

    return fetch(url, getHeaders(access_token))
}

export async function getUserId(accessToken: string): Promise<string> {
    const response = await fetch(USER_ENDPOINT, getHeaders(accessToken))
    const user = await response.json()

    return user.id
}

export async function createPlaylist(refreshToken: string, name: string) {
    const { access_token } = await getAccessToken(refreshToken)
    const userId = await getUserId(access_token)
    const url = CREATE_PLAYLIST_ENDPOINT(userId)

    return fetch(url, {
        method: 'POST',
        ...getHeaders(access_token),
        body: JSON.stringify({
            name,
            description: 'Playlist created by the V E R B A L I Z E app',
            public: true,
        }),
    })
}

export async function addTracksToPlaylist(
    refreshToken: string,
    playlistId: string,
    tracks: string[]
) {
    const { access_token } = await getAccessToken(refreshToken)
    const url = ADD_TO_PLAYLIST_ENDPOINT(playlistId)

    return fetch(url, {
        method: 'POST',
        ...getHeaders(access_token),
        body: JSON.stringify({
            uris: tracks,
        }),
    })
}
