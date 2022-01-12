const express = require('express')
const app = express()
const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss()
const cors = require('cors')
const PORT = process.env.PORT || 5000
const fs = require('fs')
const path = require('path')

app.use(cors())
app.use(express.json())

app.ws('/', (ws, req) => {
    ws.on('message', (msg) => {
        console.log(msg);

        msg = JSON.parse(msg)
        switch (msg.method) {
            case "connection":
                console.log("connection")
                connectionHandler(ws, msg)
                break
            case "sync":
                broadcastConnection(ws, msg)
                break
        }

    })
})


app.listen(PORT, () => console.log(`server started on PORT ${PORT}`))

const connectionHandler = (ws, msg) => {
    ws.id = msg.id
    // broadcastConnection(ws, msg)
}

const broadcastConnection = (ws, msg) => {
    aWss.clients.forEach(client => {
        console.log(3)
        
        if (client.id !== msg.id) {
            console.log(true, client.id)
            client.send(JSON.stringify(msg))
        }
    })
}