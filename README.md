## Work In Progress
Link: [NYC Compost](https://nyc-compost.netlify.app/)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

ToDo:

UI:
- [ ] Click to reveal a listing on the map
- [ ] Think through user senarios, and a UI that fits the needs 
- [ ] Make table beautiful 
- [ ] Button to gray out sites that are not open today
- [ ] Options for site sorting
- [ ] Add filters to table

Functionality:
- [ ] About page
- [ ] Quickstart page
- [ ] Convert distances to miles 
- [ ] Tell the user if they are within the curbside composting areas
- [ ] Setup testing for data manipulation and UI elements

Deployment:
- [ ] Github actions for CI/CD
- [ ] Add deploy to subdomain on personal site
- [ ] Add privacy protecting analytics to track use [Goat Counter](https://www.goatcounter.com/)

Completed: 
- [x] Header bar
- [x] Display table of data on homepage
- [x] Calculate distance to each site
- [x] Display map of sites
- [x] Get user location
- [x] Use borough GeoJson to assign a borough to each site on the list
- [x] Get GeoJson for community districts with curbside composting
- [x] Setup site on Netlify
- [x] Chunk sites by burough
