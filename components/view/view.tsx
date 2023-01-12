import styles from './view.module.css'

interface IProps {
    nav: React.ReactElement
    content: React.ReactNode
}

export function View({ nav, content }: IProps) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.view}>{content}</div>
            <div>{nav}</div>
        </div>
    )
}
