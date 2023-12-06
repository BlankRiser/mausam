import { STATION } from "@/types/synoptic";

type VariableData = {
  sensor: string;
  dateTime: string;
  value: number | string;
};

export const getVariableData = (station: STATION, currentVariable: string) => {
  const variableData: Array<VariableData> = [];
  Object.entries(station?.SENSOR_VARIABLES ?? {}).forEach(([key, value]) => {
    if (key === currentVariable) {
      Object.entries(value).forEach(([sensor_key, _value]) => {
        // regex re remove _value and any other string after in sensor_key and also replace all _ with " "
        // const formattedSensorKey = sensor_key.includes("_value_")
        //   ? sensor_key.replace(/_value_.*/g, "").replace(/_/g, " ")
        //   : sensor_key;

        variableData.push({
          sensor: key,
          dateTime: station?.OBSERVATIONS?.[sensor_key]?.["date_time"] ?? "",
          value: station?.OBSERVATIONS?.[sensor_key]?.["value"] ?? "",
        });
      });
    }
  });
  return variableData;
};
