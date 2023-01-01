import { getSearchResult } from 'lib/spotify'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req })

    if (session?.token.accessToken) {
        const response = await getSearchResult(session.token.accessToken)

        const responseJson = await response.json()

        return res.status(200).json(responseJson)
    }

    return res.status(200).json({}) //TODO
}

export default handler
