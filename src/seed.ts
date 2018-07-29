import initializeDatabase from 'database'
import * as faker from 'faker'
import Room from 'models/rooms'
import Post from 'models/posts'
import Group from 'models/group'

const db = initializeDatabase()


Group.findOne({ _id: "5b4fc986339b513b5466dfd9"})
    .then(group => console.log(group))

// db.dropDatabase(async () => {
//     for(let i = 0; i < 3; i++) {
//         const group = await Group.create({
//             name: faker.random.words(2),
//             description: faker.lorem.sentences(3)
//         })

//         for(let j = 0; j < 5; j++) {
//             const room = await Room.create({
//                 name: faker.random.words(3),
//                 group: group._id
//             })

//             for(let k = 0; k < 10; k++) {
//                 const post = await Post.create({
//                     body: faker.lorem.words(10),
//                     room: room._id
//                 })
//             }
//         }

//     }
//     db.close()
// })