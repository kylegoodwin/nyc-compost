import classes from '../styles/Header.module.css'

interface Props{
    getLocation: () => void
}

export default function Header({ getLocation}: Props){

    return (<nav className={classes.container}>
        Easy Compost NYC
        <button onClick={getLocation}> Get your location</button>
    </nav>)

}