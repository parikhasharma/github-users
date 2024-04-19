// index.js
const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;

let server;

mongoose.connect(process.env.MONGODB_URL,{ useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('Connected to MongoDB');
  server=app.listen(PORT,()=>{
    console.log(`Listening to Port ${PORT}`)
})
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});


