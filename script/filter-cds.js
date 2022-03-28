// Must download this data https://data.cityofnewyork.us/City-Government/Community-Districts/yfnk-k7r4
// Curbside available community districts are listed here https://www1.nyc.gov/assets/dsny/site/services/food-scraps-and-yard-waste-page/overview-residents-organics

const fs = require('fs')
const rawData = require('../assets/community-districts-raw.json')

const CDS_WITH_CURBSIDE = [106,107,208,301,302,306,307]

const filterFeatures = [...rawData.features].filter(_each => {
    parseInt
    return CDS_WITH_CURBSIDE.includes(parseInt(_each.properties.boro_cd));
})

const newData = JSON.stringify({
    ...rawData,
    features: filterFeatures
})

fs.writeFileSync(__dirname + '/../assets/community-districts-curbside.json', newData)



