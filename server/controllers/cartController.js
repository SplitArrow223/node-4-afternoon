const swag = require('../models/swag')

module.exports = {
    add: (req, res) => {
        let {user} = req.session
        const {id} = req.query
      
        const index = user.cart.findIndex(swag => swag.id == id )//returns -1
         if (index === -1) {
            const item = swag.find(swag => swag.id == id)
            user.cart.push(item)
            user.total += item.price
        } 
        res.status(200).send(user)         
    },
    delete: (req, res) => {
        let {user} = req.session
        const {id} = req.query
      
        const index = user.cart.findIndex(swag => swag.id == id )
        const item = swag.find(swag => swag.id == id)
        if (index !== -1){
            user.cart.splice(index, 1)
            user.total -= item.price
        }
        res.status(200).send(user) 
    },
    checkout: (req, res) => {
        const {user} = req.session;
        user.cart = [];
        user.total = 0;
        res.status(200).send(user) 

    }

}

