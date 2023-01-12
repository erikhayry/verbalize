import { Playlist } from 'verbalize'
import { View } from '../view/view'

interface IProps {
    playlist: Playlist
    onRedo: () => void
}

export function Success({ playlist, onRedo }: IProps) {
    return (
        <View
            content={
                <>
                    <h1>Success!</h1>
                    <a href={playlist.url}>
                        View the playlist [{playlist.name}] here
                    </a>
                </>
            }
            nav={<button onClick={onRedo}>Build another one</button>}
        />
    )
}
