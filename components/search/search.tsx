import { ApiResponseType } from '@/pages/api/interface/api'
import { ChangeEvent, useState } from 'react'
import { SearchResultItem } from 'verbalize'
import { View } from '../view/view'
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
        if (result.type === ApiResponseType.SUCCES) {
            onSearchCompleted(result.data)
        } else {
            console.log('error')
        }

        //TODO error
    }

    function handleInputChange(event: ChangeEvent<HTMLTextAreaElement>) {
        setSearchTerm(event.target.value)
    }

    return (
        <View
            content={
                <textarea
                    placeholder="write your sentence here"
                    className={styles.input}
                    value={searchTerm}
                    onChange={handleInputChange}
                />
            }
            nav={
                <button
                    disabled={searchTerm.length === 0}
                    onClick={() => {
                        handleSearch(searchTerm)
                    }}
                >
                    Build playlist
                </button>
            }
        ></View>
    )
}
