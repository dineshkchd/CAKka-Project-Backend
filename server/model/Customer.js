const moment =require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
    name:{
        type:String,
        default: ''
    },
    email:{
        type:String,
        default:''
    },
    phone:{
        type:Number,
        default:''
    },
    city:{
        type:String,
        default:''
    },
    message:{
        type:String,
        default:''
    },
    otp:{
        type:String,
        default:''
    },
    status_on:{
        type:Number,
        default:1
    },
    create_on:{
        type:Number,
        default:moment().unix()
    }

});
module.exports = mongoose.model('Customer',CustomerSchema,'customer')