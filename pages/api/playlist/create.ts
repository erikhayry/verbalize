import { addTracksToPlaylist, createPlaylist } from 'lib/spotify'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

async function create(accessToken: string, name: string) {
    const response = await createPlaylist(accessToken, name)

    return await response.json()
}

async function addTracks(accessToken: string, id: string, tracks: string[]) {
    const response = await addTracksToPlaylist(accessToken, id, tracks)

    return await response.json()
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req })

    if (session?.token.accessToken) {
        const { tracks, name } = req.query

        try {
            const playlist = await create(
                session.token.accessToken,
                name as string
            )
            const playlistWithTracks = await addTracks(
                session.token.accessToken,
                playlist.id,
                (tracks as string).split(',')
            )

            return res.status(200).json(playlistWithTracks)
        } catch (e) {
            console.log(e)

            return res.status(200).json({}) //TODO
        }
    }

    return res.status(200).json({}) //TODO
}

export default handler
