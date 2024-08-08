const moment =require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ManagerSchema = new Schema({
    name:{
        type:String,
        default: ''
    },
    email:{
        type:String,
        default:''
    },
    phone:{
        type:String,
        default:''
    },
    password:{
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
    },
    update_on:{
        type:Number,
        default:moment().unix()
    }

});
module.exports = mongoose.model('Manager',ManagerSchema,'manager')