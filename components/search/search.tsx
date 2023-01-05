import { ChangeEvent, useState } from 'react'
import { Track } from 'verbalize'
import { search } from './searchUtils'

export function Search() {
    const [result, setResult] = useState<Track[]>([])
    const [searchTerm, setSearchTerm] = useState<string>('')

    async function handleSearch(currentSearchTerm: string) {
        const result = await search(currentSearchTerm)
        setResult(result)
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        setSearchTerm(event.target.value)
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
                        {result.map(({ track, searchTerm }, index) => (
                            <span key={index}>
                                <>
                                    {track && <i>{track.name}</i>}
                                    {!track && <b>{searchTerm}</b>}
                                </>{' '}
                            </span>
                        ))}
                    </>
                </div>
            )}
        </div>
    )
}
