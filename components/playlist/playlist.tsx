import classNames from 'classnames'
import { Playlist, SearchResultItem, Track } from 'verbalize'
import { View } from '../view/view'
import styles from './playlist.module.css'
import { savePLaylist } from './playlistUtils'

interface IProps {
    items: SearchResultItem[]
    onSaveCompleted: (playlist: Playlist) => void
    onLoading: () => void
}

function getBackgroundImage(
    track?: Track
): { style: { backgroundImage: string } } | {} {
    if (!track) {
        return {}
    }

    return {
        style: {
            backgroundImage: `url(${track.image.src})`,
        },
    }
}

export function Playlist({ items, onSaveCompleted, onLoading }: IProps) {
    async function handleSave(searchResultItems: SearchResultItem[]) {
        onLoading()
        const playlist = await savePLaylist(searchResultItems)
        onSaveCompleted(playlist)
    }

    return (
        <View
            content={
                <ol className={styles.playlist}>
                    {items.map(({ track, searchTerm }) => (
                        <li
                            key={track?.id}
                            className={classNames(styles.playlistItem, [
                                {
                                    ['track-is-missing']: Boolean(track),
                                },
                            ])}
                            {...getBackgroundImage(track)}
                        >
                            {track ? track.name : searchTerm}
                            {track && (
                                <div className={styles.artistsWrapper}>
                                    by
                                    <ul className={styles.artists}>
                                        {track.artists.map((name) => (
                                            <li key={name}>{name}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </li>
                    ))}
                </ol>
            }
            nav={
                <button
                    onClick={() => {
                        handleSave(items)
                    }}
                >
                    Save playlist
                </button>
            }
        />
    )
}
