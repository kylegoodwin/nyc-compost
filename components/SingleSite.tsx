import Site from "../types/site";

interface Props {
    site: Site
}

export default function SingleSite({ site }: Props) {
    return (
    <tr>
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