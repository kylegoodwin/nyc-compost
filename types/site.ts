export default interface Site{
    name: string,
    intersection: string,
    coordinates: string,
    hours: string,
    weekdays: string,
    timeOfYear: string,
    link: string,
    boro?: string
    lat: number,
    lng: number,
    distance?: number

}