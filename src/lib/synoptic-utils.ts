import { MNETLabelItems } from "@/types/networks";
import { Station } from "@/types/station";
import { VariableLabelItems } from "@/types/variables";

type VariableData = {
  sensor: string;
  dateTime: string;
  value: number | string;
};

export const getVariableData = (station: Station, currentVariable: string) => {
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

export const extractMetaDetails = ({
  variableArr,
  networksArr,
}: {
  variableArr: any[];
  networksArr: any[];
}) => {
  const variableLabels = new Map<string, VariableLabelItems>();
  const networkLabels = new Map<string, MNETLabelItems>();

  for (const variable of variableArr) {
    const [key, value] = Object.entries(variable)[0];
    variableLabels.set(key, value as VariableLabelItems);
  }
  for (const network of networksArr) {
    const [key, value] = Object.entries(network)[0];
    networkLabels.set(key, value as MNETLabelItems);
  }
  return { variableLabels, networkLabels };
};
