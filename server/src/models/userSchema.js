const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    uid:{
        type:String,
        required: true,
    },
    username:{
        type: String,
        required: true,
    },
    comments:[
        {
            movieID:{
                type: String,
                required: true,
            },
            Rating:{
                type: Number,
                required: true,
            },
            Reply:{
                type: String,
                required: true,
            }
        }
    ]
})

module.exports = mongoose.model("User", userSchema);