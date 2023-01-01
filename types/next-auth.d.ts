import 'next-auth'
import 'next-auth/jwt'
import { JWT } from 'next-auth/jwt'

interface Token extends JWT {
    accessToken?: string
}

declare module 'next-auth' {
    interface Session {
        token: Token
    }
}
