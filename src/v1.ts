import { Hono } from "hono";
import { number, object, string,pipe } from 'valibot'
import { vValidator } from '@hono/valibot-validator'

const v1 = new Hono()

const v = {
    object,
    number,
    string
}

const analytics_post_schema = v.object({})

v1.get("/",(c) =>{
    return c.json({data:"api",version:"v1"})
})
v1.post(
    '/analytics',
    vValidator('json', analytics_post_schema, (result, c) => {
      if (!result.success) {
        return c.text('Invalid!', 400)
      }
    }),(c) =>{
        const clientdate = c.req.valid("json")
        return c.json({"a":"a"})
    }
  )

export default v1