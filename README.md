# Mausam

Mausam is a weather application that displays weather data on a map. The application uses the [Synoptic Data](https://synopticdata.com/) API to fetch weather data and [Mapbox](https://www.mapbox.com/) for the map.

## Getting Started

- Get api keys from [Mapbox](https://www.mapbox.com/) and [Synoptic Data](https://customer.synopticdata.com/credentials/).
- Rename `.env.example` to `.env` and add the api keys.
- Run `npm install` to install the dependencies.
- Run `npm run dev` to start the development server.


## Built With

- React
- Tailwind
- React-map-gl


### Implementation Notes

#### When getting a map instance, use the id attribute provided to `<Map/>` component from react-map-gl.

```tsx
// map is the "id" attribute of <Map/>
// https://visgl.github.io/react-map-gl/docs/api-reference/use-map
const { mapInstanceA, mapInstanceB } = useMap();

//...

return (
    <Map id="mapInstanceA" />
    <Map id="mapInstanceB" />
)
```

#### All the dates that are not unit timestamp follow [ISO 8601 format](https://en.wikipedia.org/wiki/ISO_8601).

### Creentials Needed

- [Mapbox](https://www.mapbox.com/)
- [Synoptic Data](https://customer.synopticdata.com/credentials/)

