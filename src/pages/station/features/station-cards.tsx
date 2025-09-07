import { stationLatestQueryOptions } from "@/api/query-factory";
import { GenericCard } from "@/components/weather-cards/generic.card";
import { windCardDetails } from "@/components/weather-cards/wind.card";
import { cn } from "@/lib/utils";
import { stationRoute } from "@/router/routes";
import type { SensorVariables } from "@/types/station";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo } from "react";

const CardVariableMapper = {
  altimeter: {
    id: "altimeter",
    component: () => <></>,
  },
  air_temp: {
    id: "air_temp",
    component: () => <></>,
  },
  dew_point_temperature: {
    id: "dew_point",
    component: () => <></>,
  },
  relative_humidity: {
    id: "relative_humidity",
    component: () => <></>,
  },
  wind_speed: windCardDetails,
  wind_direction: windCardDetails,
  wind_gust: windCardDetails,
  //   snow_depth: "",
  //   sea_level_pressure: "",
  //   weather_cond_code: "",
  //   cloud_layer_3_code: "",
  //   pressure_tendency: "",
  //   precip_accum_one_hour: "",
  //   precip_accum_three_hour: "",
  //   cloud_layer_1_code: "",
  //   cloud_layer_2_code: "",
  //   precip_accum_six_hour: "",
  //   precip_accum_24_hour: "",
  //   visibility: "",
  //   metar_remark: "",
  //   metar: "",
  //   air_temp_high_6_hour: "",
  //   air_temp_low_6_hour: "",
  //   peak_wind_speed: "",
  //   ceiling: "",
  //   pressure_change_code: "",
  //   air_temp_high_24_hour: "",
  //   air_temp_low_24_hour: "",
  //   peak_wind_direction: "",
  //   metar_origin: "",
  //   pressure: "",
  //   wet_bulb_temp: "",
  //   wind_cardinal_direction: "",
  //   weather_condition: "",
  //   weather_summary: "",
  //   cloud_layer_1: "",
  //   cloud_layer_2: "",
  //   cloud_layer_3: "",
  //   wind_chill: "",
  //   heat_index: "",
};

export const StationCards = () => {
  const { stationId } = stationRoute.useParams();
  const { variable: selectedVariable } = stationRoute.useSearch();

  const { data } = useSuspenseQuery(
    stationLatestQueryOptions({
      stid: stationId,
    }),
  );

  const filteredVariables = useMemo(() => {
    let isPresent: string[] = [];
    const uniqueVariables: string[] = [];
    Object.keys(data?.STATION?.[0]?.SENSOR_VARIABLES ?? {}).forEach((key) => {
      const variableIdentifier =
        CardVariableMapper[key as keyof typeof CardVariableMapper];

      if (variableIdentifier) {
        if (
          isPresent.includes(variableIdentifier.id ?? "") &&
          variableIdentifier.id !== "generic"
        )
          return;

        isPresent.push(variableIdentifier.id);
      }
      uniqueVariables.push(key);
    });

    return uniqueVariables;
  }, [data]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-2">
      {filteredVariables.map((variable) => {
        const cardInfo =
          CardVariableMapper[variable as keyof typeof CardVariableMapper];

        if (cardInfo) {
          const CardComponent = cardInfo.component;
          return (
            <CardComponent
              key={variable}
              data-selected={selectedVariable === variable}
              className={cn([
                selectedVariable === variable && "col-span-full w-full",
              ])}
              data={data}
            />
          );
        }

        return (
          <GenericCard
            key={variable}
            data-selected={selectedVariable === variable}
            className={cn([
              selectedVariable === variable &&
                "col-span-full w-full order-first",
            ])}
            variable={variable as keyof SensorVariables}
            data={data}
          />
        );
      })}
    </div>
  );
};
