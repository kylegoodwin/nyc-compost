import Site from "../types/site";
import SingleSite from "./SingleSite";
import classes from '../styles/Sites.module.css'

interface Props {
    sites: Site[],
    location?: GeolocationCoordinates | null
}

export default function Sites({ location, sites }: Props) {

    const sortedSites = sites.sort((a, b) => { return a.boro! > b.boro! ? 1 : -1 });
    let currentBoro: string | undefined;

    return (
        <div className={classes.sitesContainer}>
            <table>
                <thead>
                    <tr>
                        <td>Intersection</td>
                        <td>Day</td>
                        <td>Hours</td>
                        <td>Distance</td>
                    </tr>
                </thead>
                <tbody>
                    {sortedSites.map((_site, _index) => {
                        let showBoro = false;
                        if (currentBoro != _site.boro) {
                            showBoro = true;
                            currentBoro = _site.boro
                        }
                        return <>
                            {showBoro && <tr><td className={classes.seperator}>{currentBoro}</td></tr> }
                            <SingleSite location={location} key={_site.coordinates!} site={_site} />
                        </>
                    })}
                </tbody>
            </table>
        </div>)

}