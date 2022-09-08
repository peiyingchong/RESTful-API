const mongoose = require("mongoose");

const Parcel = require('../models/parcel');
const Sender = require('../models/sender');

module.exports = {

    getAll: function(req,res){
        let name = req.params.senderName
        Sender.find({'name':name}).populate('parcels').exec(function(err,sender){
            if(err) return res.status(400).json(err);
            if(!sender) return res.status(404).json();
            res.json(sender)
        })
    },
    //In the argument of the populate() method we pass the
    //field we want to populate with the user data.
    //400 bad request- occur due to incorrectly typed URL
    //404- webpage you're trying to reach can't be found, cant find resource

    createOne: function(req,res){
        let sender = req.body
        let newSender = new Sender(sender);
        newSender.save(function(err){
            res.json(newSender)
        })
    },

    deleteOne: function(req,res){
        Sender.findOneAndRemove({"_id": req.body.id},function(err){
            if(err) return res.status(400).json(err);
            res.json()
        })
        
    },
    
    updateOne: function(req,res){
        Sender.findOneAndUpdate({"_id":req.body.id},{"name":req.body.name},function(err,sender){
            if(err) return res.status(400).json(err);
            if(!sender) return res.status(404).json();
            res.json(sender);
        })
    },

    addParcel: function(req,res){
        let senderId = req.body.id
        let aParcel = req.body.parcel
        aParcel.sender = senderId

        let newParcel = new Parcel(aParcel);
            newParcel.save(function(err){

        //retrieve sender document with corresponding id
        Sender.findOne({_id:senderId},function(err,sender){
            if(err) return res.status(400).json(err)
            if(!sender) return res.status(404).json();
                //retrieve parcel by sender's id

                sender.parcels.push(newParcel)
                    sender.save(function(err){
                        if(err) return res.status(500).json(err)
                        res.json(sender);
                    })
        res.json(sender);
                })
            })
       
    }


}