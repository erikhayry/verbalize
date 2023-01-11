declare module 'verbalize' {
    interface Image {
        width: number
        height: number
        src: string
    }

    interface Track {
        id: string
        name: string
        image: Image
    }

    interface SearchResultItem {
        searchTerm: string
        track: Track | undefined
    }
}
