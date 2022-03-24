import type { GetStaticProps, NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { XMLParser } from 'fast-xml-parser'
import Site from '../types/site';
import Sites from '../components/Sites';

import dynamic from 'next/dynamic'

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
    const returnData: Site = {
      name: each.name,
      intersection: data[0].value,
      weekdays: data[1].value,
      timeOfYear: data[2].value,
      hours: data[3].value,
      coordinates: data[4].value,
      link: data[5].value
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
        <DynamicMap />
      <Sites sites={compostSites} />
    </div>
  )
}

export default Home
