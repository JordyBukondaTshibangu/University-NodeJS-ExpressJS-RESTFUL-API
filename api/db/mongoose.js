import mongoose from 'mongoose';
import '../models/lectures.js';
import '../models/students.js';
import '../models/courses.js';

const dbName = 'University-api'
const url = `mongodb://localhost:27017/${dbName}`

mongoose.connect(url, {useNewUrlParser : true})

const db = mongoose.connection

db.on('error', ()=>  console.log('An error Occured'))
db.on('open', ()=>  console.log('The Database is connected'))