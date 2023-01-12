import { useState } from 'react'
import { SearchResultItem } from 'verbalize'
import { Playlist } from '../playlist/playlist'
import { Search } from '../search/search'

enum View {
    LOADING = 'LOADING',
    SEARCH = 'SEARCH',
    PLAYLIST = 'PLAYLIST',
    SUCCESS = 'SUCCESS',
}

type State = {
    resultItems: SearchResultItem[]
    currentView: View
}

export function Builder() {
    const [state, setState] = useState<State>({
        resultItems: [],
        currentView: View.SEARCH,
    })

    const handleSearch = (resultItems: SearchResultItem[]) => {
        setState({
            currentView: View.PLAYLIST,
            resultItems,
        })
    }

    const handleSaveCompleted = () => {
        setState({
            currentView: View.SUCCESS,
            resultItems: [],
        })
    }

    const handleLoading = () => {
        setState((prev) => ({
            ...prev,
            currentView: View.LOADING,
        }))
    }

    return (
        <>
            {state.currentView === View.LOADING && <h1>Loading...</h1>}
            {state.currentView === View.SUCCESS && <h1>Success!</h1>}
            {state.currentView === View.SEARCH && (
                <Search
                    onSearchCompleted={handleSearch}
                    onLoading={handleLoading}
                />
            )}
            {state.currentView === View.PLAYLIST && (
                <Playlist
                    items={state.resultItems}
                    onLoading={handleLoading}
                    onSaveCompleted={handleSaveCompleted}
                />
            )}
        </>
    )
}
