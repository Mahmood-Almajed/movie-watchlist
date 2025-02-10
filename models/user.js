const mongoose = require('mongoose')


const moviesSchema= mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    genre:{
        type:String,
        required:true,
    },
    review:{
        type:String,
        
    },
    watchStatus:{
        type:String,
        enum:['watched','to watch','wathcing']
    },
      poster:{
        type:String
        
      }, 
   
    rating:{
        type:Number,
        min:0,
        max:10

    }
    


});








const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    movies:[moviesSchema]
}, {timestamps: true})

const User = mongoose.model('User', userSchema)

module.exports = User