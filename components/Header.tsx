import classes from '../styles/Header.module.css'

export default function Header(){

    return (<nav className={classes.container}>
        <span>Easy Compost NYC</span>
        <div style={{flexGrow: 1}} />
    </nav>)

}