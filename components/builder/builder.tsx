import { Playlist } from '../playlist/playlist'
import { Search } from '../search/search'

export function Builder() {
    return (
        <>
            <Search />
            <Playlist />
        </>
    )
}
