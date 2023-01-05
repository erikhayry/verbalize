declare module 'verbalize' {
    interface Track {
        name: string
    }

    interface SearchResultItem {
        searchTerm: string
        track: Track | undefined
        index: number
    }
}
