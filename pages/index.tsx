import { signIn, signOut, useSession } from 'next-auth/react'
import { useState } from 'react'

export default function Home() {
    const { data: session } = useSession()

    const [list, setList] = useState<
        SpotifyApi.PagingObject<SpotifyApi.TrackObjectFull> | undefined
    >(undefined)

    const search = async () => {
        const respone = await fetch('/api/search')
        const r = (await respone.json()) as SpotifyApi.SearchResponse

        setList(r.tracks)
    }

    if (session) {
        return (
            <>
                Signed in as {session.token?.email} <br />
                <button onClick={() => signOut()}>Sign out</button>
                <hr />
                <button onClick={search}>Search</button>
                {list?.items.map((item) => (
                    <div key={item.id}>
                        <h1>{item.name}</h1>
                    </div>
                ))}
            </>
        )
    }
    return (
        <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
        </>
    )
}
