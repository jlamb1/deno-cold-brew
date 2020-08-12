import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std/testing/asserts.ts";
import { updateCell, getTimeStamp } from "./utils.ts";

// Check Deno's assert function is working
Deno.test("Deno Asserts", () => {
  assertEquals(1, 1);
  assertNotEquals(1, 2);
  assertEquals("yes", "yes");
  assertNotEquals("yes", "no");
});

// Ensure getTimestamp() returns a number
Deno.test("Timestamp", () => {
  const test = getTimeStamp();
  assertEquals(typeof test, "number");
  assertEquals(typeof new Date(test), "object");
});

// Ensure the API can PUT to HubDB
Deno.test("HubDB API", async () => {
  const test = await updateCell(32890990706, 4, "yes");
  assertEquals(test.value, "yes");
  assertNotEquals(test.value, "no" || null);
});
