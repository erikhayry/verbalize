import { SearchResultItem } from 'verbalize'
import styles from './playlist.module.css'
import { savePLaylist } from './playlistUtils'

interface IProps {
    items: SearchResultItem[]
    onSaveCompleted: () => void
}

export function Playlist({ items, onSaveCompleted }: IProps) {
    async function handleSave(searchResultItems: SearchResultItem[]) {
        await savePLaylist(searchResultItems)
        onSaveCompleted()
    }

    return (
        <div className={styles.wrapper}>
            <ul className={styles.playlist}>
                {items.map(({ track, searchTerm }) => (
                    <li
                        key={track?.id}
                        className={styles.playlistItem}
                        style={{
                            backgroundImage: `url(${track?.image.src})`,
                        }}
                    >
                        {track ? track.name : searchTerm}
                    </li>
                ))}
            </ul>
            <button
                onClick={() => {
                    handleSave(items)
                }}
                className={styles.saveButton}
            >
                Save playlist
            </button>
        </div>
    )
}
