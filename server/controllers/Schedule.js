var Schedule = require('../utils/Schedule');


const scheduleController ={
    getBookedSlots : async(req,res)=>{
        Schedule.getBookedSlots(req.body).then((response)=>{
            res.json(response)
        })
        .catch((err)=>{
            res.json(err)
        })
    },
    bookSlot : async(req,res)=>{
        Schedule.bookSlot(req.body).then((response)=>{
            res.json(response)
        })
        .catch((err)=>{
            res.json(err)
        })
    } 




}

module.exports = {...scheduleController};