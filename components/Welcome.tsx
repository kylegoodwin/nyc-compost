import Image from 'next/image'
import styles from '../styles/Welcome.module.css'
import skyline from '../public/images/manhattan.jpg'


export default function Welcome() {

    return (
        <section className={styles.container}>
            <div>
                <h1>lets keep new york city green</h1>
                <div className={styles.image}>
                    <div className={styles.actions}>
                        <div>
                            <button>Use my location</button>
                        </div>
                    </div>
                    <Image src={skyline} />
                </div>
            </div>
        </section>
    )
}