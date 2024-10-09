const {Schema ,model} =require("mongoose");

const schema= new Schema({
    ImgeUrl:{
        type :String,
        required:true
    },
    NameOfStadium:{
        type :String,
        required:true
    },
    Location:{
        type :String,
        required:true
    }, 
    Price:{
        type :String,
        required:true
    },
    Discription:{

        type :String,
        required:true
    },
    time:{
        type :String,
        required:true
    },
    Totime:{
        type :String,
        required:true
    }
})
const OwnerModul = model("owner" ,schema)
module.exports = OwnerModul ;