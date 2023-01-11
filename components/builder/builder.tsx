import { useState } from 'react'
import { SearchResultItem } from 'verbalize'
import { Playlist } from '../playlist/playlist'
import { Search } from '../search/search'

export function Builder() {
    const [resultItems, setResult] = useState<SearchResultItem[] | undefined>(
        undefined
    )

    const handleSearch = (searchResultItems: SearchResultItem[]) => {
        setResult(searchResultItems)
    }

    const handleSaveCompleted = () => {
        setResult(undefined)
    }

    return (
        <>
            {!resultItems && <Search onSearchCompleted={handleSearch} />}
            {resultItems && (
                <Playlist
                    items={resultItems}
                    onSaveCompleted={handleSaveCompleted}
                />
            )}
        </>
    )
}
