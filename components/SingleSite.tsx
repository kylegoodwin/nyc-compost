import Site from "../types/site"
import { point } from "@turf/helpers"
import distance from "@turf/distance"
import classes from "../styles/SingleSite.module.css"

interface SingleSiteProps {
    site: Site,
    location?: GeolocationCoordinates | null,
    setSelectedSite: (siteIndex : number) => void
}

export default function SingleSite({ site, location, setSelectedSite }: SingleSiteProps) {

    let distanceToSite;
    if(location){
        const p1 = point([location?.longitude,location?.latitude])
        const p2 = point([site.lng,site.lat])
        distanceToSite = (distance(p1,p2) * 0.62137).toFixed(2)
    }

    const handleRowClick = () => {
        setSelectedSite(site.index)
    }

    return (
        <tr className={classes.row}>
            <td>
                {site.intersection}
            </td>
            <td>
                {site.weekdays}
            </td>
            <td>
                {site.hours}
            </td>
            <td>
                {distanceToSite && distanceToSite }
                <button onClick={handleRowClick}>Show on map</button>
            </td>
        </tr>
    )
}