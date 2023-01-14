import { addTracksToPlaylist, createPlaylist } from 'lib/spotify'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { Playlist } from 'verbalize'

async function create(
    accessToken: string,
    name: string
): Promise<SpotifyApi.CreatePlaylistResponse> {
    const response = await createPlaylist(accessToken, name)

    return response.json()
}

async function addTracks(
    accessToken: string,
    id: string,
    tracks: string[]
): Promise<SpotifyApi.AddTracksToPlaylistResponse> {
    const response = await addTracksToPlaylist(accessToken, id, tracks)

    return response.json()
}

async function createPlayListWithTracks(
    accessToken: string,
    name: string,
    tracks: string
): Promise<Playlist> {
    const {
        id,
        external_urls: { spotify: url },
    } = await create(accessToken, name)
    await addTracks(accessToken, id, tracks.split(','))

    return {
        name,
        url,
    }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req })

    if (session?.token.accessToken) {
        const { tracks, name } = req.query as { tracks: string; name: string }
        const { accessToken } = session.token
        const playlist = await createPlayListWithTracks(
            accessToken,
            name,
            tracks
        )

        try {
            return res.status(200).json(playlist)
        } catch (e) {
            return res.status(404)
        }
    }

    return res.status(403)
}

export default handler
