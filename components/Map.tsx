import { LatLngTuple } from 'leaflet'
import { MapContainer, TileLayer, Circle } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Site from '../types/site'

interface SiteDisplayProps {
    sites: Site[]
}

export default function Map({sites} : SiteDisplayProps) {
    const position: LatLngTuple = [40.7423,-73.9095]

    return (
        <div style={{ height: "500px" }}>
            <MapContainer style={{height: "500px"}} center={position} zoom={11} scrollWheelZoom>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url={`https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=Bu8QSoz4tewcr8rg3Ofa`}
                />
                {sites.map(_site => <Circle key={_site.coordinates.replace(" ", "")} color='red' center={[_site.lat,_site.lng]} />)}
            </MapContainer>
        </div>
    )
}