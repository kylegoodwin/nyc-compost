import { LatLngTuple, CircleMarker } from 'leaflet'
import { MapContainer, TileLayer, Circle, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Site from '../types/site'
import useWindowSize from '../hooks/useWindowSize'
import communityDistrictShapes from '../assets/community-districts-curbside.json'
import { GeoJsonObject } from 'geojson'
import { useEffect, useMemo, useRef, useState } from 'react'

interface SiteDisplayProps {
    sites: Site[],
    selectedSite: number | null
}

type EMap = {
    [key: string]: CircleMarker | null
}

export default function Map(props: SiteDisplayProps) {

    const { sites, selectedSite } = props
    const position: LatLngTuple = [40.7423, -73.9095]

    const [prevSelction, setPrevSelection] = useState<number>(-1);

    const { height } = useWindowSize();

    const [t, setT] = useState(0);

    const circleRefs = useRef<EMap>({});

    useEffect(() => {
        if (!!selectedSite && circleRefs.current) {
            circleRefs.current[`${prevSelction}`]?.setStyle({ color: "green" })
            circleRefs.current[`${selectedSite}`]?.setStyle({ color: "red" })
            setPrevSelection(selectedSite)
        }
    }, [selectedSite])

    return (
        <div style={{ height: height }}>
            {selectedSite}
            {height! > 0 && <MapContainer zoomControl={false} style={{ height: height }} center={position} minZoom={10} zoom={11} scrollWheelZoom>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url={`https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=Bu8QSoz4tewcr8rg3Ofa`}
                />
                {sites.map(_site => <Circle
                    radius={200}
                    fillOpacity={100}
                    ref={(ref) => {
                        circleRefs.current[`${_site.index}`] = ref
                    }}
                    key={_site.coordinates.replace(" ", "")} color={'green'} center={[_site.lat, _site.lng]} />)}
                {communityDistrictShapes.features.map((_cd, index) => <GeoJSON
                    key={`cd-${index}`}
                    data={_cd as GeoJsonObject}
                    style={{ stroke: true, color: "green", weight: 1 }}
                />)}

            </MapContainer>}
        </div>
    )
}

const Circles = ({ sites, selectedSite }: SiteDisplayProps) => {

    const [t, setT] = useState(0);

    useEffect(() => {
        setT(t + 1);
    }, [selectedSite])

    return <>
        {sites.map(_site => <Circle key={_site.coordinates.replace(" ", "")} color={t > 0 && _site.index === selectedSite ? 'red' : 'green'} center={[_site.lat, _site.lng]} />)}
    </>
}