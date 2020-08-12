/** @namespace */
import { config } from "https://deno.land/x/dotenv/mod.ts";

const { HAPIKEY } = config({ safe: true });

interface UpdateCellResponse {
  value: string;
}

/**
 * Updates a single cell in a HubDB table
 * @param {number} row row ID
 * @param {number} cell cell ID
 * @param {string | number} value yes/no, or timestamp
 * @returns {number} HubAPI HTTP response code
 */
export const updateCell = async (
  row: number,
  cell: number,
  value: string | number,
): Promise<UpdateCellResponse> => {
  const res = await fetch(
    `https://api.hubapi.com/hubdb/api/v1/tables/105070/rows/${row}/cells/${cell}?hapikey=${HAPIKEY}`,
    {
      method: "PUT",
      body: JSON.stringify({ "value": value }),
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0",
      },
    },
  );
  const body = await res.json();
  console.log(JSON.stringify(body));
  return body;
};

/**
 * Returns a Unix Timestamp in the current TZ
 * @returns {number} Timestamp
 */
export const getTimeStamp = (): number => {
  const getUTCDate: number = new Date().getTime();
  const getTimeDiff: number = new Date().getTimezoneOffset();
  const convertToMS: number = getTimeDiff * 60000;
  const getLocalTS: number = new Date(getUTCDate - convertToMS).getTime();
  return getLocalTS;
};
