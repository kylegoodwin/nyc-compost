import Site from "../types/site";
import SingleSite from "./SingleSite";
import classes from '../styles/Sites.module.css'

interface Props {
    sites: Site[],
    location?: GeolocationCoordinates | null,
    setSelectedSite: (siteIndex : number) => void
}

export default function Sites({ location, sites, setSelectedSite }: Props) {

    const sortedSites = sites.sort((a, b) => { return a.boro! > b.boro! ? 1 : -1 });
    let currentBoro: string | undefined;

    return (
        <div className={classes.sitesContainer}>
            <table>
                <thead className={classes.tableHead}>
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
                            <SingleSite setSelectedSite={setSelectedSite} location={location} key={_site.coordinates} site={_site} />
                        </>
                    })}
                </tbody>
            </table>
        </div>)

}