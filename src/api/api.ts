import { useKeysStore } from "@/store/env-keys.store"
import { Networks } from "@/types/networks"
import { LatestStationResponse } from "@/types/station"
import { StationMetadata } from "@/types/station-metadata"
import { Variables } from "@/types/variables"
import ky, { Options } from "ky"
import { toast } from "sonner"
import { API } from "./constants"

type SearchParamsType = Record<string, string | number>

export const createAPI = ({
    base 
}: {
    base: string
}) =>{

    const baseUrl = base ?? API.BaseUrl

    const apiToken = useKeysStore.getState().synopticToken

    const defaultSearchParams = {
        token: apiToken
    }

    const kyOptions: Options = {
        prefixUrl: baseUrl,
        hooks: {
            beforeRequest: [
                (request) => {
                    if (!apiToken) {
                        toast.error("API token is not set")
                    }
                }
            ],
            
        }
    }

    const fetcher = ky.create(kyOptions)

    return {
        variables: {
            getAllVariables: ()=>{
                return fetcher.get("variables", {
                    searchParams: {
                       ...defaultSearchParams,
                    }
                }).json<Variables>()
            }
        },
        networks: {
            getAllNetworks: ()=>{
                return fetcher.get("networks", {
                    searchParams: {
                       ...defaultSearchParams,
                    }
                }).json<Networks>()
            }
        },
        stations: {
            getLatest: ({searchParams}: {
                searchParams: SearchParamsType
            })=>{
                return fetcher.get("stations/latest", {
                    searchParams: {
                        ...searchParams,
                       ...defaultSearchParams,
                    }
                }).json<LatestStationResponse>()
            },
            getMetadata: ({searchParams}: {
                searchParams: SearchParamsType
            })=>{
                return fetcher.get("stations/metadata", {
                    searchParams: {
                        ...searchParams,
                       ...defaultSearchParams,
                    }
                }).json<StationMetadata>()
            },
            getTimeSeries:  ({searchParams}: {
                searchParams: SearchParamsType
            })=>{
                return fetcher.get("stations/timeseries", {
                    searchParams: {
                        ...searchParams,
                       ...defaultSearchParams,
                    }
                }).json<LatestStationResponse>()
            },

            
        },

    }

}

export const api = createAPI({
    base: API.BaseUrl
})