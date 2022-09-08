const mongoose = require('mongoose');

let parcelSchema = new mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId,auto:true},
    weight : {type:Number, 
        validate: {
        validator: function (aWeight) {
            return (aWeight>0);
        },
        message: 'Weight should be positive '
    }},
    address: {type:String, validate:{
        validator:
        function(add){
            return (add.length>=3)
        },
        message: 'Address should be more than 3 character'
    }},
    cost:{type:Number, 
        validate: {
        validator: function (aCost) {
            return (aCost>0);
        },
        message: 'Cost should be more than 0 '
    }},
    fragile: Boolean,
    sender: {type: mongoose.Schema.ObjectId, ref:'Sender'}
})

module.exports = mongoose.model('Parcel',parcelSchema);


//sender: a reference to the sender's document stored in the Sender collection 