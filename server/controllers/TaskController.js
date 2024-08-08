let Task = require('../utils/Task')


const taskController ={
    AddTask:async(req,res)=>{
        Task.AddTask(req.body).then((response)=>{
            res.send(response)
        })
        .catch((err)=> {
            res.json(err)
        })
    },
    getTasks:async(req,res)=>{
        Task.getTasks(req.body.task_id).then((response)=>{
            res.send(response)
        })
        .catch((err)=> {
            res.json(err)
        })
    },
    AllGetTasks:(req,res) =>{
        Task.AllGetTasks().then((response)=>{
            res.json({status:true, msg:"success", data:response})
        }).catch((err)=>{
            res.json(err)
        })
    },
    TaskStatusChange:(req,res) =>{
        Task.TaskStatusChange(req.body).then((response)=>{
            res.json({status:true, msg:"success", data:response})
        }).catch((err)=>{
            res.json(err)
        })
    },
    
}

module.exports ={...taskController}