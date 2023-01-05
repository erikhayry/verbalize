declare module 'verbalize' {
    interface Track {
        id: string
        name: string
    }

    interface SearchResultItem {
        searchTerm: string
        track: Track | undefined
    }
}
