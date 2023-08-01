const mongoose = require("mongoose")
mongoose.set("strictQuery", false)

mongoose.connect(process.env.MONGO_URL, {
    dbName: 'notesApp'
}).then(() => {
    console.log("Database connected successfully!")
}).catch((err) => {
    console.log(error)
})


// const connect = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URL, {
//             dbName: 'notesApp'
//         });
//         console.log("Database connected successfully!")
//     } catch (error) {
//         console.log(error)
//     }
// }

// module.exports = connect