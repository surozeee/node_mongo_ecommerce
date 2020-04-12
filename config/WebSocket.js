var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({ port: 40510 })

wss.on('connection', function (ws) {
    ws.on('message', function (message) {
        console.log('received: %s', message)
    })

    setInterval(
        () => ws.send(JSON.stringify({message: 'Test message hello', success:true})),
        1000
    )
})