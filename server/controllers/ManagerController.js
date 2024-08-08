let Manager = require('../utils/Manager')

const ManagerController ={

    ManagerRegister : async (req,res)=>{
        Manager.ManagerRegister(req.body).then((response)=>{
            res.send(response)
        })
        .catch((err)=> {
            res.json(err)
        })
    },

    ManagerLogin: async (req, res)=>{
        Manager.ManagerLogin(req.body).then((response)=>{
            res.send(response)
        })
       .catch((err)=> {
            res.json(err)
       })
    },
    ChangePassword: async (req, res)=>{
        let requireFields = ['oldPassword','NewPassword'];
        let manager_id = req.body._id;
        if(!manager_id){
            return res.json({status: false,message:"Invalid manager Id"})
        }
        Manager.ChangePassword(req.body).then((response)=>{
            res.send(response)
        })
       .catch((err)=> {
            res.json(err)
       })

    }
}

module.exports ={...ManagerController} 