import Site from "../types/site";

interface Props {
    site: Site
}

export default function SingleSite({ site }: Props) {
    return (
        <tr>
            <td>
                {site.coordinates}
            </td>
            <td>
                {site.boro}
            </td>
            <td>
                {site.lat} : {site.lng}
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
        </tr>
    )
}