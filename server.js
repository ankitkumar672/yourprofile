const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
app.use(expressLayouts)
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({limit:'10mb', extended: false}))

const indexRouter = require('./routers/index')
const profileRouter = require('./routers/profiles')

//connect to database 
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL || "mongodb+srv://ankitkumar:ankit@1234@cluster0-yrtwf.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log("Connected to Database"))

app.use('/', indexRouter)
app.use('/profiles', profileRouter)


app.listen(8080)

