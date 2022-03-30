import Site from "../types/site"
import SiteDisplayProps from "../types/site-display-props"
import { point } from "@turf/helpers"
import distance from "@turf/distance"

interface SingleSiteProps {
    site: Site,
    location?: GeolocationCoordinates | null
}

export default function SingleSite({ site, location }: SingleSiteProps) {

    let distanceToSite;
    if(location){
        const p1 = point([location?.longitude,location?.latitude])
        const p2 = point([site.lng,site.lat])
        distanceToSite = distance(p1,p2)
    }

    return (
        <tr>
            <td>
                {site.boro}
            </td>
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