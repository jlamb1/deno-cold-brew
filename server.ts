import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

const { HAPIKEY, PORT } = config({ safe: true });

/**
 * Returns a Unix Timestamp in the current TZ
 * @returns {number} Timestamp
 */
const getTimeStamp = (): number => {
  const getUTCDate: number = new Date().getTime();
  const getTimeDiff: number = new Date().getTimezoneOffset();
  const convertToMS: number = getTimeDiff * 60000;
  const getLocalTS: number = new Date(getUTCDate - convertToMS).getTime();
  return getLocalTS;
};

/**
 * Updates a single cell in a HubDB table
 * @param {number} row row ID
 * @param {number} cell cell ID
 * @param {string | number} value yes/no, or timestamp
 * @returns {number} HubAPI HTTP response code
 */
export async function updateCell(
  row: number,
  cell: number,
  value: string | number,
): Promise<number> {
  const runUpdate = await fetch(
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
  await runUpdate.json();
  console.log(runUpdate.status);
  return runUpdate.status;
}

const router = new Router();

router
  .get("/hello", (ctx) => {
    ctx.response.body = "API is running!";
  })
  .post("/tap/:tap/status/:bool", async (ctx) => {
    let row: number, value: string;
    if (ctx.params.bool === "yes") {
      value = "yes";
    } else {
      value = "no";
    }
    switch (ctx.params.tap) {
      case "1":
        row = 4483664102;
        break;
      case "2":
        row = 5104788209;
        break;
      case "3":
        row = 5105198498;
        break;
      case "4":
        row = 5105198728;
        break;
      default:
        row = 0;
        break;
    }
    await updateCell(row, 4, value);
    await updateCell(row, 9, getTimeStamp());
    ctx.response.status = 200;
    ctx.response.body = `{ message: ${ctx.response.status}}`;
  });

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: parseInt(PORT) });
