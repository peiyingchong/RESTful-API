const mongoose = require('mongoose')
const express = require('express')

const parcel = require('./routers/parcels')
const sender = require('./routers/senders')

const app=express()
app.listen(8080)

app.use(express.json())
app.use(express.urlencoded({extended:false}));

mongoose.connect('mongodb://localhost:27017/Week7', function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');

});

app.get('/sender/:senderName',sender.getAll);
app.post('/sender',sender.createOne);
app.delete('/sender',sender.deleteOne);
app.put('/sender',sender.updateOne);

app.put('/sender/parcel',sender.addParcel);

app.get('/parcel',parcel.getAll);
app.put('/parcel',parcel.updateOne);
// app.put('/parcel',parcel.incrementCost);
// app.put('/parcel',parcel.decrementCost);
// app.delete('/parcel/:weight',parcel.deleteWeight);
// app.delete('/parcel/:cost',parcel.deleteCost);
// app.delete('/parcel/:id',parcel.deleteId);







