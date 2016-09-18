# coding=utf-8

from aiohttp import web

async def handle(request):
    name = request.match_info.get('name', "Anonymous")
    text = "Hello, " + name
    return web.Response(body=text.encode('utf-8'))

app = web.Application()
app.router.add_get('/{name}', handle)

web.run_app(app)
