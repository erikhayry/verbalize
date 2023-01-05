import { ChangeEvent, useState } from 'react'
import { SearchResultItem } from 'verbalize'
import { savePLaylist } from './playlistUtils'
import { search } from './searchUtils'

export function Search() {
    const [result, setResult] = useState<SearchResultItem[]>([])
    const [searchTerm, setSearchTerm] = useState<string>('')

    async function handleSearch(currentSearchTerm: string) {
        const result = await search(currentSearchTerm)
        setResult(result)
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        setSearchTerm(event.target.value)
    }

    async function handleSave(searchResultItems: SearchResultItem[]) {
        await savePLaylist(searchResultItems)
    }

    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
            />
            {searchTerm && (
                <button
                    onClick={() => {
                        handleSearch(searchTerm)
                    }}
                >
                    Search
                </button>
            )}
            {result && (
                <div>
                    <>
                        {result.map(({ track, searchTerm }) => (
                            <span key={track?.id}>
                                <>
                                    {track && <i>{track.name}</i>}
                                    {!track && <b>{searchTerm}</b>}
                                </>{' '}
                            </span>
                        ))}
                    </>
                    <button
                        onClick={() => {
                            handleSave(result)
                        }}
                    >
                        Save playlist
                    </button>
                </div>
            )}
        </div>
    )
}
