import { assert, assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { updateCell } from "./server.ts";

Deno.test("Test assertEquals", () => {
  assert(1);
  assert("Hello" === "Hello");
});

Deno.test("Test API Connection", () => {
  const test = updateCell(4483664102, 4, "yes");
  console.log(test);
  // assertEquals(200, test);
  // await assertEquals(200, test);
  // assertEquals(200, updateCell(4483664102, 4, "yes"));
});

// Deno.test("fetching TODOs", async () => {
//     const response = await fetch(
//         `https://api.hubapi.com/hubdb/api/v1/tables/105070/rows/4483664102/cells/4?hapikey=${HAPIKEY}`,
//         {
//           method: "PUT",
//           body: JSON.stringify({ "value": "yes" }),
//           headers: {
//             "Content-Type": "application/json",
//             "User-Agent": "Mozilla/5.0",
//           },
//         });
//     await response.arrayBuffer();
//     assertEquals(200, response.status)
// });
