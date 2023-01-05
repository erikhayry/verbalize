const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET
const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`
const SEARCH_ENDPOINT = 'https://api.spotify.com/v1/search?type=track'

const getAccessToken = async (refreshToken: string) => {
    const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        }),
    })

    return response.json()
}

export const getSearchResult = async (
    refreshToken: string,
    searchTerm: string,
    pagination: {
        offset: string
        limit: string
    }
) => {
    const { access_token } = await getAccessToken(refreshToken)
    const { offset, limit } = pagination

    console.log(
        `${SEARCH_ENDPOINT}&q=${searchTerm}&offset=${offset}&limit=${limit}`
    )

    return fetch(
        `${SEARCH_ENDPOINT}&q=${searchTerm}&offset=${offset}&limit=${limit}`,
        {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        }
    )
}
