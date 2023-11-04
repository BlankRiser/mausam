# Mausam

A data-vis solution for meteorological data.

## Built With

-   React
-   Tailwind
-   Deck.gl / React-map-gl

## Prerequisites

### Implementation Notes

-   When getting a map instance, use the id attribute provided to `<Map/>` component from react-map-gl.

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

### Creentials Needed

-   [Mapbox](https://www.mapbox.com/)
-   [Synoptic Data](https://customer.synopticdata.com/credentials/)

### Resources

-   [CartoDB/carto-react-template/](https://github.com/CartoDB/carto-react-template/tree/7c6200f9bedafba6e1230360a7e4e56e2bc9eb70)
