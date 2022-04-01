import { LatLngExpression, LatLngTuple, polygon, PolylineOptions } from 'leaflet'
import { MapContainer, TileLayer, Circle, GeoJSON, Polygon } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Site from '../types/site'
import useWindowSize from '../hooks/useWindowSize'
import communityDistrictShapes from '../assets/community-districts-curbside.json'
import { GeoJsonObject } from 'geojson'
import nycShape from '../assets/nyc-shape.json'

interface SiteDisplayProps {
    sites: Site[]
}

export default function Map({sites} : SiteDisplayProps) {
    const position: LatLngTuple = [40.7423,-73.9095]

    const coords = [[[90, -180],
    [90, 180],
    [-90, 180],
    [-90, -180]], nycShape.geometries[0].coordinates] as LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][]

    const testShape = polygon(coords)

    const {height} = useWindowSize();

    return (
        <div style={{ height: height }}>
            {height! > 0 && <MapContainer style={{height: height}} center={position} minZoom={10} zoom={11} scrollWheelZoom>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url={`https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=Bu8QSoz4tewcr8rg3Ofa`}
                />
                {sites.map(_site => <Circle key={_site.coordinates.replace(" ", "")} color='red' center={[_site.lat,_site.lng]} />)}
                {communityDistrictShapes.features.map( (_cd, index) => <GeoJSON
                 key={`cd-${index}`} 
                 data={_cd as GeoJsonObject}  
                 style={{stroke: false, color: "#ff8100"}}
                 />)}

            </MapContainer>}
        </div>
    )
}