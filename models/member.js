const mongoose = require('mongoose');
const validator = require('validator');

const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email ID already present"]
        // validate(value) {
        //     if (!validator.isEmail()) {
        //         throw new Error("Invalid Email")
        //     }
        // }
    },
    phone:{
        type:Number,
        // min:10,
        // max:12,
        required:true,
        unique:true
    },
    address: {
        type:String,
        required:true
    }
})

// new collection capital and no s
const Member = new mongoose.model('Member', memberSchema);

module.exports = Member;