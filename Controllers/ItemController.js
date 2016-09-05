var express = require('express');
var ItemRouter = express.Router();
var Item = require('../Models/Item');

ItemRouter.use('*',function (req, res, next) {
    console.log('Inside Item Controller!');
    next();
});

//All Routes with /
ItemRouter
    .get('/',function (req, res) {
        Item.getAllItems(function (err,Items) {
            if(err){console.log('Error :'+err); res.json({'status': 'Error', 'msg' : 'Error Retriving All Items!'});}
            else{res.json(Items);}
        });
    })
    .post('/',function (req, res) {
        var Itm = req.body;

        Item.addItem(Itm,function (err, Item) {
            if(err){
                console.log('Error Saving Item :'+err);
                res.json({'status': 'Error', 'msg' : 'Error Saving Item!'});
            }
            else{
            res.json({'status': 'Success', 'msg' : Item.Name + ' Saved Successfully'});}
        });
    });

//All Routes with /:id
ItemRouter
    .get('/:_id',function (req, res) {
        var id = req.params['_id'];
        Item.getItemById(id,function (err,data) {
            if(err){console.log('Error :'+err); res.json({'status': 'Error', 'msg' : 'Error Selecting Item with Id : '+id});}
            res.json(data);
        });
    })
    .delete('/:_id',function (req, res) {
        var id = req.params['_id'];
        Item.deleteItemById(id,function (err,data) {
            if(err){console.log('Error :'+err); res.json({'status': 'Error', 'msg' : 'Error Deleting Item with Id : '+id});}
            else{res.json({'status': 'Success', 'msg' : data.Name + ' Deleted Successfully'});}

        });
    })
    .put('/:_id',function (req, res) {
        var id = req.params['_id'];
        var rec_proj = req.body;
        Item.UpdateItem(id,rec_proj,function (err,Item) {
            if(err){console.log('Error :'+err); res.json({'status': 'Error', 'msg' : 'Error Editing Item with Id : '+id});}
            res.json({'status': 'Success', 'msg' : Item.Name+ ' Updated Successfully'});
        });
    });

//Misc Routes
ItemRouter
    .get('/check/:_term',function (req, res) {
            var name = req.params['_term'];
            if(name=="default"){
                res.json({_id:"default"});
            }else {
                Item.checkItemByName(name, function (err, data) {
                    if (err) {
                        console.log('Error :' + err);
                        res.json({'status': 'Error', 'msg': 'Error Checking Item with name : ' + name});
                    }
                    else {
                        res.json(data);
                    }
                });
            }
    })
    .get('/u/Search/:_term',function (req, res) {
        var term = req.params['_term'];
        Item.getItems(term, function (err, Item) {
            if (err) {
                console.log('Error :' + err);
                res.json({'status': 'Error', 'msg': 'Error Retriving Item!'});
            }
            else {
                res.json(Item);
            }
        })
    })
    .put('/u/Qty/:_Id',function (req, res) {
        var id = req.params['_Id'];
        var Qty = req.body;

        Item.updateQuantity(id,Qty,function (err,Itm) {
            if(err){console.log('Error :'+err); res.json({'status': 'Error', 'msg' : 'Error Editing Item Quantity!'});}
            else{res.json({'status': 'Success', 'msg' : Itm.Name+' Quantity Updated Successfully!'});}
        });
    });

module.exports = ItemRouter;
