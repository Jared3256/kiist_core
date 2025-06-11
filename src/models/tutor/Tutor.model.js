import mongoose from "mongoose"

const LecturerSchema = new mongoose.Schema({
    photo:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    name:{
        unique:true,
        trim:true,
        required:true,
        type:String,
    },
    department:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'department',
        min:[24,"department id cannot be  less than 24"],
        max:[24,"department id cannot be  less than 24"],
    },
    qualification:{
        type:String,
        required:true
    },
    payment:{
        type:Number,

    },
    status:{
        type:String,
        default:'inactive',
        required:true,
        enum:["active","inactive"],
    }
},{
    timestamps:true
})

const LecturerModel =  mongoose.model("lecturer", LecturerSchema);

export default LecturerModel;