import { Builder } from '@/components/builder/builder'
import styles from '@/styles/Home.module.css'
import { signIn, useSession } from 'next-auth/react'

export default function Home() {
    const { data: session } = useSession()

    return (
        <div className={styles.wrapper}>
            {!session && (
                <button className={styles.loginBtn} onClick={() => signIn()}>
                    Sign in
                </button>
            )}
            {session && <Builder />}
        </div>
    )
}
