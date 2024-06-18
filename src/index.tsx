import { Hono } from 'hono'
import { jsxRenderer } from "hono/jsx-renderer";
import v1 from './v1';
import { etag } from 'hono/etag'
import { cors } from 'hono/cors'
import { secureHeaders } from 'hono/secure-headers'
import { logger } from 'hono/logger'

declare module "hono" {
    interface ContextRenderer {
      (content: string | Promise<string>, props: { title?: string }): Response;
    }
  }

const app = new Hono()

// useコーナー
app.use('*', cors())
// app.use('*', csrf({ origin: 'myapp.example.com' }))
app.use('*',secureHeaders({}))
app.use('*', etag())
// app.use('*', prettyJSON())
app.use(logger())//デバッグ用
// 終り

app.get(
  "*",
  jsxRenderer(({ children, title }) => {
    return (
      <html lang="ja">
        <head>
          <meta charset="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>{title}</title>
        </head>
        <body>{children}</body>
      </html>
    );
  }),
);
app.onError(async (e,c) => {
  return c.render(
    <div style="text-align: center">
      <h1>エラーが発生しました</h1>
      <p>以下の文章を管理者に送り付けてください</p>
      <textarea readonly cols={35} rows={5} style="font-size: 130%">TITLE:{e.name}\nVELUE:{e.message}\nURL:{c.req.url}</textarea>
    </div>,{title: "エラー"}
  )
})
app.notFound(async (c) => {
  return c.render(
    <div style="text-align:  center;">
      <h1>404 Not Found</h1>
      <p>ページがないよ</p>
    </div>,{title: "ページがないよ"}
  )
})

app.get('/',(c)=>{
    return c.render(
        <>
            <center>
            <h2>Super Analytics</h2>
            <p>日本製、軽量、高性能</p>
            </center>
        </>,{title:"TOPページ"}
    )
})
app.get('kiyaku',(c)=>{
  return c.render(
    <>
    <h2>利用規約</h2>
    <p>これは、当サービスが提供するもの全てにてきようされます。</p>
    <p>これは、Analyticsを使用するサイトとも共有されます。</p>
    <h3>第一項</h3>
    <p></p>
    </>
    ,{title:"利用規約"})
})
app.get('test',(c)=>{
  return c.render(
    <>
    <h2>テストページ</h2>
    <p>これは、テストページです。</p>
    <script type="module" src="http://localhost:5173/api/v1/analytics/aaa"></script>
    </>
    ,{title:"テストページ"}
  )
})

// API
app.route("/api/v1",v1)

export default app