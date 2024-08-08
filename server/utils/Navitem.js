let NavItem = require('../model/NavItem');

const navItemsUtiles = {
    navitemAdd: async (data) => {
        try {
            console.log("data", data);
            let newObj = {
                navname: data.navname,
                subnavname: data.subnavname,
                text: data.text,
            };
            console.log("newObj", newObj);
            let NavItemRef = new NavItem(newObj);
            // Save the customer data
            let savedData = await NavItemRef.save();
            console.log("savedData", savedData);
            return { status: true, message: 'Admin Register Success', data: savedData };
        } catch (err) {
            console.log("err", err);
            return { status: false, message: 'Data not added', error: err };
        }
    },

    getNavItem: async (data) => {
        try {
            let { navname } = data;
            let query = { navname: { $eq: navname } };
            let navItemData = await NavItem.find(query);
            if (!navItemData) {
                return { status: false, message: 'NavItem not found' };
            }
            return { status: true, data: navItemData };
        } catch (error) {
            console.error(error);
            return { status: false, message: 'Error retrieving NavItem', error };
        }
    },
};

module.exports = {...navItemsUtiles};
