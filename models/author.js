const mongoose = require('mongoose')
const Book = require('./book')
const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})



//this method used for preventing the author from deleting author that has bok
authorSchema.pre('deleteOne',function(next){
Book.find({author:this.id},(err,book)=>{
  if(err){
    next(err)
  }
  else if(book.length >0){
    next(new Error('Tyring to delete Author that has book assinged  '))

  }
  else{
    next()
  }
})
})
module.exports = mongoose.model('Author', authorSchema)
//here the "Author" is the table name where the data will stored