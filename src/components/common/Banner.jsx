import styles from './Banner.module.css'

const Banner = ({ message }) => {
    return <span className={styles.banner}>{message}</span>
}

export default Banner;