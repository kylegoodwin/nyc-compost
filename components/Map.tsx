import { LatLng, LatLngExpression, LatLngTuple } from 'leaflet'
import { MapContainer, Marker, Polygon, Popup, TileLayer, GeoJSON, Circle } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import shapeData from '../assets/boro-boundries.json'
import { GeoJsonObject } from 'geojson'
import Site from '../types/site'


interface Props{
    sites: Site[]
}

export default function Map({sites} : Props) {
    const position: LatLngTuple = [40.7228048,-73.855843]

    let brooklyn = shapeData.features[1]

    return (
        <div style={{ height: "500px", width: "100%" }}>
            <MapContainer style={{height: "500px"}} center={position} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url={`https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=Bu8QSoz4tewcr8rg3Ofa`}
                />
                <GeoJSON data={brooklyn as GeoJsonObject} />
                {sites.map(_site => <Circle color='red' center={[_site.lat,_site.lng]} />)}
            </MapContainer>
        </div>
    )
}