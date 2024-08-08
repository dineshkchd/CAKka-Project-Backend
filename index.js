require('dotenv').config({path:__dirname+"/.env"})
require('./server/connections')
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); 
const cors=require('cors')

const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

const corsConfig = {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  };

  
app.use(cors());
app.options('*', cors());
app.use(cors(corsConfig));


app.get('/', (req,res) => {
    res.sendFile(__dirname+'/server/views/index.html')
})


const admin = require('./server/router/admin')
app.use(process.env.api_v1+'admin',admin)


const schedule = require('./server/router/schedule')
app.use(process.env.api_v1+'schedule',schedule)

const customer = require('./server/router/customer')
app.use(process.env.api_v1+'customer',customer)

const navitem = require('./server/router/navitem')
app.use(process.env.api_v1+'navitem',navitem)

const manager = require('./server/router/manager')
app.use(process.env.api_v1+'manager',manager)


const employee = require('./server/router/employee')
app.use(process.env.api_v1+'employee',employee)

const task = require('./server/router/task')
app.use(process.env.api_v1+'task',task)





const port = process.env.port ||4000 
app.listen(port,()=>{
    console.log('server is running',+port);
})



