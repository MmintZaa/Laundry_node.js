const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/WorkshopDB', {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log('connect db success.')
}).catch((err) => {
    console.log('connect db fail.', err)
})


