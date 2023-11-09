import { getRequest } from "@/axios/verbs";

interface IGetLocations {
  LocationID: number;
  LocationGroup: string;
  LocationName: string;
}

export const fetchGetLocations = async (): Promise<IGetLocations[]> => {
  try {
    const res = await getRequest("/description/locations");
    return res?.data;
  } catch (error) {
    console.log("[ERROR] fetchGetLocations", error);
    return [];
  }
};
