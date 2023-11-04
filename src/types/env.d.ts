/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_MAPBOX_PUBLIC_KEY: string;
    readonly VITE_SYNOPTIC_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
