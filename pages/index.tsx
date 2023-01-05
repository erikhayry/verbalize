import { Builder } from '@/components/builder/builder'
import { signIn, useSession } from 'next-auth/react'

export default function Home() {
    const { data: session } = useSession()

    if (session) {
        return (
            <>
                <Builder />
            </>
        )
    }

    return (
        <>
            <button onClick={() => signIn()}>Sign in</button>
        </>
    )
}
