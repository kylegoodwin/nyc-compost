import Site from "../types/site";
import SingleSite from "./SingleSite";

interface Props{
    sites: Site[]
}

export default function Sites({sites} : Props){

   return (<table>
        <thead>
            <tr>
                <td>Intersection</td>
                <td>Day</td>
                <td>Hours</td>
            </tr>
        </thead>
        <tbody>
            {sites.map( (_site,_index) => <SingleSite key={_site.coordinates!} site={_site} />)}
        </tbody>
    </table>)

}