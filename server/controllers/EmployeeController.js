let Employee = require('../utils/Employee');



const employeeController ={
    EmployeeRegister: async (req,res)=>{
        Employee.EmployeeRegister(req.body).then((response)=>{
            res.send(response)
        })
        .catch((err)=> {
            res.json(err)
        })
    },
    EmployeeLogin: async (req,res)=>{
        Employee.EmployeeLogin(req.body).then((response)=>{
            res.send(response)
        })
        .catch((err)=> {
            res.json(err)
        })
    },
    EmployeeAllList: async (req,res)=>{
        Employee.EmployeeAllList(req.body).then((response)=>{
            res.send(response)
        })
        .catch((err)=> {
            res.json(err)
        })
    },
}

module.exports ={...employeeController}