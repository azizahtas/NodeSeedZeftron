var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ItemSchema = new Schema({
    Name : {type : String, required : true },
    Size : {type : String, required: true },
    Rate : {type : String, required: true },
    Qty : {type : Number, required: true}

},{collection : 'Items'});

var Item = module.exports = mongoose.model('Item',ItemSchema,'Items');

module.exports.getAllItems = function(callback){
    Item.find({},callback);
};
module.exports.getItems = function(Term,callback){
    Item.find({ "Name" : {"$regex":Term, "$options":"i"} },{},{},callback);
};
module.exports.getItemById = function(Id,callback){
    Item.findById(Id,{},{},callback);
};
module.exports.deleteItemById = function(Id,callback){
    Item.findByIdAndRemove(Id,{},callback);
};

module.exports.addItem = function(itm,callback){
    var newItem = new Item(itm);
    newItem.save(callback);
};

module.exports.UpdateItem = function(Id,itm,callback){
    Item.findByIdAndUpdate(Id,itm,{},callback);
};

module.exports.updateQuantity = function(Id,qty,callback){
    Item.findById(Id,{},{},function (err, Itm) {
        if(err){ callback(err,null) }
        else{
            Itm.Qty = qty.newQuantity;
            var It = new Item(Itm);
            It.save(callback);
        }
    });
};

module.exports.checkItemByName = function (name, callback) {
  Item.findOne({Name: name},{Name :0,Size:0,Rate:0,__v:0},callback);
};

