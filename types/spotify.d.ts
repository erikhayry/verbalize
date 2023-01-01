declare module 'spotify' {
    type Item = {
        email: string
        id: string
        name: string
        images: { url: string }[]
    }
}
