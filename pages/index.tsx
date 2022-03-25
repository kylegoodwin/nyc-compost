import type { GetStaticProps, NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { XMLParser } from 'fast-xml-parser'
import Site from '../types/site';
import Sites from '../components/Sites';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon'
import dynamic from 'next/dynamic'
import { point, polygon, multiPolygon, Position, feature, Polygon, Feature} from '@turf/helpers';
import shapeData from "../assets/boro-boundries.json"

let brooklyn = polygon(shapeData.features[1].geometry.coordinates as Position[][])
// let brooklyn = polygon(featured.geometry.geometry.coordinates)
// let brooklyn = {type: 'Polygon', coordinates: shapeData.features[0].geometry.coordinates }

// let test = shapeData.features[0].geometry

const DynamicMap = dynamic(
  () => import('../components/Map'),
  { ssr: false,
    loading: () => <p>A map is loading</p>,
  }
)

const MAP_DATA_URL = 'https://www.google.com/maps/d/u/0/kml?mid=1c2Dv882CW6Fosx5jj9u7fLQRJkg&lid=PU-Dn4LjZqo&forcekml=1'

export const getStaticProps: GetStaticProps = async () => {
  const parser = new XMLParser();

  const text = await fetch(MAP_DATA_URL).then(res => res.text())
  const obj = parser.parse(text);

  const sites: Site[] = obj.kml.Document.Placemark.map((each: any) => {

    const data: any[] = each.ExtendedData.Data

    const stringAr = (data[4].value as string).replace(/\s/g, '').split(",")
    const _point = point([parseFloat(stringAr[1]), parseFloat(stringAr[0])])

    const inQueens = booleanPointInPolygon(_point,brooklyn);

    const returnData: Site = {
      lat: parseFloat(stringAr[0]),
      lng:  parseFloat(stringAr[1]),
      name: each.name,
      intersection: data[0].value,
      weekdays: data[1].value,
      timeOfYear: data[2].value,
      hours: data[3].value,
      coordinates: data[4].value,
      link: data[5].value,
      boro: inQueens ? "tru" : "false"
    }

    return returnData;

  })

  return { props: { compostSites: sites } }
}

interface Props {
  compostSites: Site[]
}

const Home: NextPage<Props> = ({ compostSites }: Props) => {

  return (
    <div className={styles.container}>
        <DynamicMap sites={compostSites} />
      <Sites sites={compostSites} />
    </div>
  )
}

export default Home
