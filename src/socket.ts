import * as WebSocket from 'ws'
import * as uuid from 'uuid/v1'
console.log('starting')
const wss = new WebSocket.Server({ port: 5000 })


//map socket id to its socket
const sockets = new Map<string, WebSocket>()
//map room ids to socket ids currently in specified room
const rooms = new Map<string, string[]>()

type Action = "JOIN_ROOM"|"SEND_MESSAGE"|"LEAVE_ROOM"

interface Message {
    action: Action
    roomID: string
    message?: string
}

wss.on('connection', ws => {
    console.log('socket connected')
    const socketID = uuid()
    sockets.set(socketID, ws)

    ws.on('message', message => {
        console.log('message received')
        const data = JSON.parse(message as string) as Message
        console.log(data)

        const action = data.action
        if(action === 'JOIN_ROOM') {
            const room = rooms.get(data.roomID)
            if(!room) {
                rooms.set(data.roomID, [socketID])
            } else {
                if(!room.find(id => id === socketID)) {
                    console.log(socketID, 'joined room', data.roomID)
                    room.push(socketID)
                }
            }
        }
        if(action === 'LEAVE_ROOM') {
            const room = rooms.get(data.roomID)
            if(room) {
                const i = room.findIndex(id => id === socketID)
                room.splice(i, 1)
                console.log(room)
            }
        }
        if(action === 'SEND_MESSAGE') {
            const room = rooms.get(data.roomID)
            console.log(socketID, 'sending message to room', data.roomID)
            if(room) {
                room.forEach(id => {
                    const target = sockets.get(id)
                    target.send(JSON.stringify({
                        action: 'MESSAGE',
                        roomID: data.roomID,
                        body: data.message
                    }))
                })
            }
        }
    })

    ws.on('close', () => {
        for(let room of rooms.values()) {
            const i = room.findIndex(id => id === socketID)
            room.splice(i, 1)
        }
    })
})

wss.on('error', console.log)

wss.on('listening', () => { console.log('server is listening')})