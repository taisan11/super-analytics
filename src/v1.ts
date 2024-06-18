import { Hono } from "hono";
import { number, object, string,pipe } from 'valibot'
import { vValidator } from '@hono/valibot-validator'
//@ts-ignore
import script from './main?script'
import { acceptLanguage } from './until'
import { UserAgent } from "@std/http";

const v1 = new Hono()

const v = {
    object,
    number,
    string
}
/**
 * {
    "Browser": {
        "Name": "Netscape",
        "Version": "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
        "Language": "ja",
        "Platform": "Win32",
        "Referrer": "",
        "ScreenWidth": 1920,
        "ScreenHeight": 1080,
        "ScreenColorDepth": "24bit",
        "ViewPortWidth": 1920,
        "ViewPortHeight": 957,
        "DevicePixelRatio": 1,
        "MaxTouchPoints": 0
    },
    "Headers": {
        "UserAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
        "AcceptLanguage": "ja,en-US;q=0.9,en;q=0.8",
        "AcceptEncoding": "",
        "UserAgentClientHints": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\""
    },
    "UserAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
    "PublicIP": "202.214.95.234",
    "Host": "234.95.214.202.bf.2iij.net",
    "RealIP": "202.214.95.234",
    "IsItTor": false,
    "WebRTCInfo": "candidate:2920784294 1 udp 2113937151 5a1c7e3d-1939-4e27-bf66-bc9dec4a1d6f.local 58452 typ host generation 0 ufrag 0R8r network-cost 999"
}
 */
const analytics_post_schema = v.object({})

v1.get("/",(c) =>{
    return c.json({data:"api",version:"v1"})
})
v1.get("/analytics/:ID",(c)=>{
  c.header("Content-Type","text/javascript; charset=UTF-8")
  return c.body(script)}
)
v1.post("/aaa",(c)=>{
  return c.text("aaa")
})
v1.post(
    '/send/:ID',
    // vValidator('json', analytics_post_schema, (result, C) => {
    //   if (!result.success) {
    //     return C.text('Invalid!', 400)
    //   }
    // }),
    async (c) =>{
        // const clientdate = c.req.valid("json")
        const clientdate = await c.req.json()
        const IP = c.req.header("cf-connecting-ip")||c.req.header("x-forwarded-for")||undefined
        const lang_raw = c.req.header("accept-language")||undefined
        const lang = acceptLanguage(lang_raw)[0]||undefined
        const referer = c.req.header("referer")||undefined
        const host = c.req.header("host")||undefined
        const useragent_raw = c.req.header("user-agent")||null
        const useragent_raw_client = clientdate.Version||null
        const useragent_client = new UserAgent(useragent_raw_client)
        const useragent_server = new UserAgent(useragent_raw)
        const useragent = {...useragent_server,...useragent_client}
        console.log(await clientdate)
        return c.json({"a":"a"})
    }
  )

export default v1