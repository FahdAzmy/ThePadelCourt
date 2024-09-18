const { promise } = require("bcrypt/promises");
const {MongoClient} =require("mongodb")
//
 

class productMong {
    constructor(){
        this.mongoClient = MongoClient;
        this.url="mongodb://localhost:27017/pop"
    }
    async connectt(){
        const client =await this.mongoClient.connect(this.url );
        
        return client.db();
    }
    async insertProduct(object){
        const db =await this.connectt();
        db.collection("port").insertOne((object) ,function(err,data){
            if(err){
                console.log(err);
            }
            console.log(data);
        })
    }
}
module.exports.productMong=productMong;