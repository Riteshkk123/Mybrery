if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}



//import express files

const express = require('express')
const app = express()
//importing layouts
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({limit:'10mb',extended:false}))
app.use(methodOverride('_method'))

//here we are let the server.js to know that we have Index.js file in router folder
const indexRouter = require('./routes(controller)/index')
const authorRouter = require('./routes(controller)/authors')
const bookRouter = require('./routes(controller)/books')





//setting view engine 
app.set('view engine','ejs')
//directory assing to views
app.set('views',__dirname+'/views')
//Set Layout Configuration for layouts.ejs for header and footer or we can say defaults html pages
app.set('layout','layouts/layout')
//use express layouts middleware use for managing layouts files
app.use(expressLayouts)
//location of static pages in express
app.use(express.static('public'))
//app.use('/', indexRouter) mounts the indexRouter to the root route ('/'). This means that any requests coming to the root route will be handled by the indexRouter, which is defined in a separate file (./routes/index.js in this case).
app.use('/', indexRouter)
app.use('/authors', authorRouter)
app.use('/books', bookRouter)


//adding database
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to MongoDB'));
//port allocation to server
app.listen(process.env.PORT||3000)


