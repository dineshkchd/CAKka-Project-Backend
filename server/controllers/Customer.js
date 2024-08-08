var Customer = require("../utils/Customer");


const customerController = {
    customerRegister: async (req, res) => {
        Customer.register(req.body).then((response) => {
            res.json(response)
        })
        .catch((err)=> {
            res.json(err)
        })
    },

    verifyOTp: async(req, res,) => {
        Customer.verifyOTp(req.body).then((response) => {
            res.json(response)
        })
        .catch((err)=> {
            res.json(err)
        })
    },

    contactUs: async(req, res) => {
        Customer.contactUs(req.body).then((response) => {
            res.json(response)
        })
        .catch((err)=> {
            res.json(err)
        }) 
    }

};

module.exports = { ...customerController };
