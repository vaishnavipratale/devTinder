const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status:{
        type:String,
        required:true,
        enum:{
            values: ["ignored", "interested", "accepted", "rejected"],
            message:`{VALUE} is incorrect status type`,
        },
    },
},
{ timestamps: true }
);

//connectionRequest.find({fromUserId : 4367342546867986, toUserId :886764524242});
connectionRequestSchema.index({fromUserId : 1, toUserId : 1});

connectionRequestSchema.pre('save', function (next){
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send connection request to yourself");
    }
    next();
})
const ConnectionRequest = new mongoose.model(
    "ConnectionRequest",
    connectionRequestSchema
);

module.exports = {ConnectionRequest};
