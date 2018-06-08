import initializeDatabase from 'database'
import * as casual from 'casual'
import Room from 'models/rooms'
import Post from 'models/posts'

const db = initializeDatabase()

db.once('open', async () => {
    await Room.remove({})
    await Post.remove({})

    for(let i = 0; i < 3; i++) {
        const room = await Room.create({ name: casual.word })
        const promises = []
        for(let j = 0; j < 10; j++) {
            const post = Post.create({
                body: casual.sentences(3),
                room: room._id
            })
            promises.push(post)
        }
        await Promise.all(promises)
        console.log('Finished', room.name)
    }
    console.log('done')
    db.close()
})