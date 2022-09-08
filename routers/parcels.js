const mongoose = require("mongoose");

let Sender = require('../models/sender')
let Parcel = require('../models/parcel')

module.exports= {

    //http://localhost:8080/?name=Tim&age=23&address=Mel query string 
    getAll: function(req,res){
        let qAddress = req.query.address;
        Parcel.find({address:qAddress}).populate('sender',('_id','name')).exec(function(err,parcel){
            if(err) res.status(400).json(err);
            if(!parcel) res.status(404).json();
        res.json(parcel)
        })
    },

    updateOne: function(req,res){
        let id = req.body.id;
        let add = req.body.address;
        Parcel.findOneAndUpdate({_id:id},{address:add},function(err,parcel){
            if(err) res.status(400).json(err);
            if(!parcel) res.status(404).json();
            res.json(parcel);
        })
    }
}
