import { ChangeEvent, useState } from 'react'
import { SearchResultItem } from 'verbalize'
import styles from './search.module.css'
import { search } from './searchUtils'

interface IProps {
    onSearchCompleted: (searchResultItems: SearchResultItem[]) => void
    onLoading: () => void
}

export function Search({ onSearchCompleted, onLoading }: IProps) {
    const [searchTerm, setSearchTerm] = useState<string>('')

    async function handleSearch(currentSearchTerm: string) {
        onLoading()
        const result = await search(currentSearchTerm)
        onSearchCompleted(result)
    }

    function handleInputChange(event: ChangeEvent<HTMLTextAreaElement>) {
        setSearchTerm(event.target.value)
    }

    return (
        <div className={styles.wrapper}>
            <textarea
                placeholder="write your sentence here"
                className={styles.input}
                value={searchTerm}
                onChange={handleInputChange}
            />
            <button
                disabled={searchTerm.length === 0}
                onClick={() => {
                    handleSearch(searchTerm)
                }}
            >
                Build playlist
            </button>
        </div>
    )
}
