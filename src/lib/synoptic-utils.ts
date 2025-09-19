import { MNETLabelItems, Networks } from "@/types/networks";
import { Station } from "@/types/station";
import { VariableLabelItems, Variables } from "@/types/variables";

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
  variableArr: Variables["VARIABLES"];
  networksArr: Networks["MNET"];
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
export const extractNetworkDetails = ({
  networksArr,
}: {
  networksArr: Networks["MNET"];
}) => {
  const networkLabels = new Map<string, MNETLabelItems>();

  for (const network of networksArr) {
    const [key, value] = Object.entries(network)[0];
    networkLabels.set(key, value as MNETLabelItems);
  }
  return Object.fromEntries(networkLabels);
};

export const extractVariableDetails = ({
  variableArr,
}: {
  variableArr: Variables["VARIABLES"];
}) => {
  const variableLabels = new Map<string, VariableLabelItems>();

  for (const variable of variableArr) {
    const [key, value] = Object.entries(variable)[0];
    variableLabels.set(key, value as VariableLabelItems);
  }

  return Object.fromEntries(variableLabels);
};

export const parseSensorString = (input: string) => {
  const regex = /^(.*)_(value|set)_(\d+)(d?)$/;
  const match = input.match(regex);

  if (!match) {
    throw new Error("Invalid input format");
  }

  const [, variable, , setNumber, derived] = match;

  return {
    set: parseInt(setNumber, 10),
    isDerived: derived === "d",
    variable: variable,
    originalValue: input,
  };
};
