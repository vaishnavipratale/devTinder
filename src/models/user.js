const mongoose = require("mongoose");
const userSchema =new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:50,
    },
    lastName:{
        type:String,
        
    },
    email:{
        type:String,
        required: true,
        unique : true,
        lowercase: true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        min: 18,
    },
    gender:{
        type:String,
        validate(value){
            if(!["male", "female","other"].includes(value)){
               throw new Error("Gender data is not valid");
            }
        },
    },
    photoUrl:{
        type:String,
        default : "https://geographyandyou.com/images/user-profile.png",
    },
    about:{
        type : String,
        default : "This is a default about of the user",
    },
    Skills:{
        type : [String],
    },
},
{
    timestamps: true,
}
);
module.exports = mongoose.model('User', userSchema);