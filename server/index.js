const express = require('express')
const session = require('express-session')
require ('dotenv').config()

const sessionCheck = require('./middlewares/checkForSession')
const sessionCtrl = require('./controllers/swagController')
const authCtrl = require('./controllers/authController')
const cartCtrl = require('./controllers/cartController')
const searchCtrl = require('./controllers/searchController')

const { SERVER_PORT, SESSION_SECRET} = process.env
const app = express()
app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,

}))
app.use(sessionCheck)
app.use(express.static(`${__dirname}/../build`))

app.get('/api/swag', sessionCtrl.read)

app.post('/api/login', authCtrl.login)
app.post('/api/register', authCtrl.register)
app.post('/api/signout', authCtrl.signout)
app.get('/api/user', authCtrl.getUser)

app.post('/api/cart/checkout', cartCtrl.checkout)
app.post('/api/cart', cartCtrl.add)
app.delete('/api/cart', cartCtrl.delete)//query api doesnt use /:id

app.get('/api/search', searchCtrl.search)

app.listen(SERVER_PORT, () => {console.log(`listen linda on: ${SERVER_PORT}`)})