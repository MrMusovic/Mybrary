if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
} //if environment is not set to production, run the dotenv dependencies

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views') //to fix
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

const mongoose = require('mongoose') //import mongoose form library
mongoose.connect(process.env.DATABASE_URL, {
    useNewURLParser: true})
//when app deployed you want to connect to server on web

const db = mongoose.connection
db.on('error', error => console.error(error)) //if we get an error when turning on db
db.once('open', error => console.log('Connected to Mongoose')) //only running once when opening db

app.use('/', indexRouter)

app.listen(process.env.PORT || 3000) //pulls from environment variable
