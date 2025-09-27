# Contributing to Mausam

Mausam is a minimalist weather visualization tool built with React, TypeScript, and Mapbox. It displays weather data fetched from the Synoptic Data API directly on an interactive map.

> Note: Mausam is a pared-down alternative to the official Synoptic Data Viewer and is intended for quick lookups and simple visualization. For advanced features and more in-depth analysis, please use Synoptic's official viewer.

### Pre-requisites

- Install [Node.js](https://nodejs.org/) (version 14 or later)
- Install [bun](https://bun.sh/) (version 1.2.19 or later)
- Generate public api key from [Synoptic Data](https://customer.synopticdata.com/credentials/).

### Getting Started

- Rename `.env.example` to `.env` and add the synoptic api key.
- Run `bun run install` to install the dependencies.
- Run `bun run dev` to start the development server.

### Implementation Notes

- All the dates that are not unit timestamp follow [ISO 8601 format](https://en.wikipedia.org/wiki/ISO_8601).

### Creentials Needed

- [Synoptic Data](https://customer.synopticdata.com/credentials/)

## Dev Note

- [Use loader in tanstack/react-query to only seed cached data](https://github.com/TanStack/router/discussions/1563) 


### Test Stations

- [D7349](http://localhost:5173/station/D7349)