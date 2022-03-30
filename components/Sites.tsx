import Site from "../types/site";
import SingleSite from "./SingleSite";
import classes from '../styles/Sites.module.css'

interface Props {
    sites: Site[],
    location?: GeolocationCoordinates | null
}

export default function Sites({ location, sites }: Props) {

    return (
        <div className={classes.sitesContainer}>
            <table>
                <thead>
                    <tr>
                        <td>Intersection</td>
                        <td>Day</td>
                        <td>Hours</td>
                    </tr>
                </thead>
                <tbody>
                    {sites.sort((a,b) => {return a.boro! > b.boro! ? 1 : -1}).map((_site, _index) => <SingleSite location={location} key={_site.coordinates!} site={_site} />)}
                </tbody>
            </table>
        </div>)

}