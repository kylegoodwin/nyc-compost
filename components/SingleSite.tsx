import Site from "../types/site"
import { point } from "@turf/helpers"
import distance from "@turf/distance"
import classes from "../styles/SingleSite.module.css"

interface SingleSiteProps {
    site: Site,
    location?: GeolocationCoordinates | null
}

export default function SingleSite({ site, location }: SingleSiteProps) {

    let distanceToSite;
    if(location){
        const p1 = point([location?.longitude,location?.latitude])
        const p2 = point([site.lng,site.lat])
        distanceToSite = (distance(p1,p2) * 0.62137).toFixed(2)
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
            </td>
        </tr>
    )
}