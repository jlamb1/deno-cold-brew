import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import { updateCell, getTimeStamp } from "./utils.ts";

const { PORT } = config({ safe: true });

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
