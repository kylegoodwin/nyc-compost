import type { GetStaticProps, NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { XMLParser } from 'fast-xml-parser'
import Site from '../types/site';
import Sites from '../components/Sites';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon'
import dynamic from 'next/dynamic'
import { point, Position, Polygon, MultiPolygon } from '@turf/helpers';
import shapeData from "../assets/boro-boundries.json"
import { useState } from 'react';
import Header from '../components/Header';
import Welcome from '../components/Welcome';

interface BoroShape {
  boroName: string,
  shape: Polygon | MultiPolygon
}

const DynamicMap = dynamic(
  () => import('../components/Map'),
  {
    ssr: false,
    loading: () => <p>A map is loading</p>,
  }
)

const MAP_DATA_URL = 'https://www.google.com/maps/d/u/0/kml?mid=1c2Dv882CW6Fosx5jj9u7fLQRJkg&forcekml=1'

export const getStaticProps: GetStaticProps = async () => {

  let boroShapes: BoroShape[] = []

  shapeData.features.forEach(_feature => {

    let shape: Polygon | MultiPolygon


    if (_feature.geometry.type === "Polygon") {
      shape = { type: "Polygon", coordinates: _feature.geometry.coordinates as Position[][] }
    } else {
      shape = { type: "MultiPolygon", coordinates: _feature.geometry.coordinates as Position[][][] }
    }

    boroShapes.push({ boroName: _feature.properties.boro_name, shape: shape })
  })


  const parser = new XMLParser();

  const text = await fetch(MAP_DATA_URL).then(res => res.text())
  const obj = parser.parse(text);
  const sites: Site[] = obj.kml.Document.Folder.Placemark.map((each: any) => {

    const data: any[] = each.ExtendedData.Data

    const stringAr = (data[4].value as string).replace(/\s/g, '').split(",")
    const _point = point([parseFloat(stringAr[1]), parseFloat(stringAr[0])])

    const boroName = boroShapes.find(_boro => {
      return booleanPointInPolygon(_point, _boro.shape)
    })?.boroName || "Not Found"


    const returnData: Site = {
      lat: parseFloat(stringAr[0]),
      lng: parseFloat(stringAr[1]),
      name: each.name,
      intersection: data[0].value,
      weekdays: data[1].value,
      timeOfYear: data[2].value,
      hours: data[3].value,
      coordinates: data[4].value,
      link: data[5].value,
      boro: boroName

    }

    return returnData;

  })

  return { props: { compostSites: sites, boroShapes: boroShapes } }
}

interface Props {
  compostSites: Site[],
  boroShapes: BoroShape[]
}

interface State {
  location: GeolocationCoordinates | null
  error: GeolocationPositionError | null
}

const Home: NextPage<Props> = ({ compostSites, boroShapes }: Props) => {

  const [state, setState] = useState<State>({
    location: null,
    error: null
  });

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((loc) => {
      setState({ ...state, location: loc.coords })
    });
  }

  return (
    <>
    <Header />
    <Welcome />
    <section>
      <h2>Sites and Map</h2>
    <div className={styles.container}>
      <div className={styles.mainGrid}>
        <Sites location={state.location} sites={compostSites} />
        <DynamicMap sites={compostSites} />
      </div>
    </div>
    </section>
    </>
  )
}

export default Home
