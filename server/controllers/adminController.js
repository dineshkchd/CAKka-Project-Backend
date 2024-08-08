let Admin = require('../utils/Admin')

const adminController ={
    register : async (req,res)=>{
        Admin.register(req.body).then((response)=>{
            res.send(response)
        })
    },

    login: async(req,res)=>{
        Admin.login(req.body).then((response) => {
            res.json(response)
        })
        .catch((err)=> {
            res.json(err)
        })
    }
}


module.exports = {...adminController};