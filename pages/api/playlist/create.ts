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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req })

    if (session?.token.accessToken) {
        const { tracks, name } = req.query as { tracks: string; name: string }
        const { accessToken } = session.token

        try {
            const newPlaylist = await create(accessToken, name)
            const tracksString = tracks.split(',')

            await addTracks(accessToken, newPlaylist.id, tracksString)

            const playlist: Playlist = {
                name: newPlaylist.name,
                url: newPlaylist.external_urls.spotify,
            }

            return res.status(200).json(playlist)
        } catch (e) {
            console.log(e)

            return res.status(200).json({}) //TODO
        }
    }

    return res.status(200).json({}) //TODO
}

export default handler
