const mongoose = require('mongoose');
const uriBuilder = require('mongo-uri-builder');


//connection string
const uri = uriBuilder({
    username: "",
    password: "",
    host: "127.0.0.1",
    port: "27017",
    database: 'hackbmu',
})

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    // useFindAndModify: false,
})

mongoose.connection.on('connected', () => {
    console.log('mongoose successfully connected!')
})

mongoose.connection.on('error', () => {
    console.log('mongoose failed to connect')
})

mongoose.connection.on('disconnected', () => {
    console.log('mongoose got disconnected')
});

require('../models/patient-model')(mongoose);

module.exports = mongoose;