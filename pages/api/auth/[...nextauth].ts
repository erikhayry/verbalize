import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'

export default NextAuth({
    theme: {
        colorScheme: 'dark', // "auto" | "dark" | "light"
        brandColor: '#222', // Hex color code
        buttonText: '#fff', // Hex color code
    },
    providers: [
        SpotifyProvider({
            authorization:
                'https://accounts.spotify.com/authorize?scope=user-read-email,playlist-modify-public',
            clientId: process.env.CLIENT_ID || '',
            clientSecret: process.env.CLIENT_SECRET || '',
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.refresh_token
            }
            return token
        },

        async session({ session, token, user }) {
            return {
                ...session,
                token,
                user,
            }
        },
    },
})
