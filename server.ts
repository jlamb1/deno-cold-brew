import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

const hapikey:string = config()["hapikey"];
const port:number =  parseInt(config()["PORT"]) || 8080;

async function updateCell(row:number, cell:number, value:string) {
    await fetch(`https://api.hubapi.com/hubdb/api/v1/tables/105070/rows/${row}/cells/${cell}?hapikey=${hapikey}`, {
        method: "PUT",
        body: JSON.stringify({ "value": value }),
        headers: {
            "Content-Type": "application/json",
            "User-Agent": "Mozilla/5.0"
        }
    }).then(function(response) {
        console.log(`body: ${response.body}, status: ${response.status}`)
        return response.json();
      })
}

const router = new Router();

router
    .get("/hello", (ctx) => {
        ctx.response.body = "API is running!";
    })
    .post("/:tap/:bool", (ctx) => {
        let row:number, value:string;
        let d:Date = new Date("2020-04-13T00:00:00.000-04:00");
        let timestamp:any = d.valueOf();
        if (ctx.params.bool === "yes") {
            value = "yes"
        } else {
            value = "no"
        }
        switch (ctx.params.tap) {
            case "tap1":
                row = 4483664102;
                break;
            case "tap2":
                row = 5104788209;
                break;
            case "tap3":
                row = 5105198498;
                break;
            case "tap4":
                row = 5105198728;
                break;
            default:
                row = 0
                break;
        }
        updateCell(row, 4, value);
        updateCell(row, 9, timestamp);
        ctx.response.status = 200;
        ctx.response.body = `{ message: ${ctx.response.status}}`

    })

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: port });