const moment =require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
    task:{
        type:String,
        default: ''
    },
    employee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    task_status:{
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
module.exports = mongoose.model('Task',TaskSchema,'task')