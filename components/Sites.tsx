import Site from "../types/site";
import SingleSite from "./SingleSite";

interface Props {
    sites: Site[],
    location?: GeolocationCoordinates | null
}

export default function Sites({ location, sites }: Props) {

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <td>Intersection</td>
                        <td>Day</td>
                        <td>Hours</td>
                    </tr>
                </thead>
                <tbody>
                    {sites.map((_site, _index) => <SingleSite location={location} key={_site.coordinates!} site={_site} />)}
                </tbody>
            </table>
        </div>)

}