// src/models/Schedule.js
const moment =require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const NavItemSchema = new mongoose.Schema({
    navname:{
        type:String,
        default: ''
    },
    subnavname:{
        type:String,
        default: ''
    },
    text:{
        type:String,
        default:''
    },
    url:{
        type:String,
        default:''
    },
    create_on:{
        type:Number,
        default:moment().unix()
    }
});

const Schedule = mongoose.model('NavItem', NavItemSchema);

module.exports = Schedule;
