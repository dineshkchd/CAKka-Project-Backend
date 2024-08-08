const NavItem = require('../utils/Navitem')

const navItemController = {
    navitemAdd: async (req, res) => {
        NavItem.navitemAdd(req.body).then((response) => {
            res.json(response)
        })
        .catch((err)=> {
            res.json(err)
        })
    },
    getNavItem: async (req, res) => {
        NavItem.getNavItem(req.body).then((response) => {
            res.json(response)
        })
        .catch((err)=> {
            res.json(err)
        })
    },

}

module.exports = { ...navItemController };