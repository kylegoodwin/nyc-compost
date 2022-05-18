import styles from '../styles/Welcome.module.css'
import skyline from '../public/images/manhattan.jpg'

interface Props{
    handleGetLocation: () => void
}

export default function Welcome({handleGetLocation}: Props) {

    return (
        <section className={styles.container}>
            <div>
                <h1>Lets keep New York City green</h1>
                <h2>Get started composting today</h2>
                <button onClick={handleGetLocation}>Use my location</button>
            </div>
        </section>
    )
}