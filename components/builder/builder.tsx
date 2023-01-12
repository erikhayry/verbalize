import { useState } from 'react'
import { Playlist, SearchResultItem } from 'verbalize'
import { Playlist as PlaylistEl } from '../playlist/playlist'
import { Search } from '../search/search'
import { Success } from './success'

enum View {
    LOADING = 'LOADING',
    SEARCH = 'SEARCH',
    PLAYLIST = 'PLAYLIST',
    SUCCESS = 'SUCCESS',
}

type State = {
    resultItems: SearchResultItem[]
    playlist?: Playlist
    currentView: View
}

const INITIAL_STATE: State = {
    resultItems: [],
    currentView: View.SEARCH,
}

export function Builder() {
    const [state, setState] = useState<State>(INITIAL_STATE)

    const handleSearch = (resultItems: SearchResultItem[]) => {
        setState({
            currentView: View.PLAYLIST,
            resultItems,
        })
    }

    const handleSaveCompleted = (playlist: Playlist) => {
        setState({
            currentView: View.SUCCESS,
            playlist,
            resultItems: [],
        })
    }

    const handleLoading = () => {
        setState((prev) => ({
            ...prev,
            currentView: View.LOADING,
        }))
    }

    const handleRedo = () => {
        setState(INITIAL_STATE)
    }

    return (
        <>
            {state.currentView === View.LOADING && <h1>Loading</h1>}
            {state.currentView === View.SUCCESS && state.playlist && (
                <Success playlist={state.playlist} onRedo={handleRedo} />
            )}
            {state.currentView === View.SEARCH && (
                <Search
                    onSearchCompleted={handleSearch}
                    onLoading={handleLoading}
                />
            )}
            {state.currentView === View.PLAYLIST && (
                <PlaylistEl
                    items={state.resultItems}
                    onLoading={handleLoading}
                    onSaveCompleted={handleSaveCompleted}
                />
            )}
        </>
    )
}
