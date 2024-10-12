const  {ownerPost ,ownerGet,ownerPut,ownerDelete,book}  = require("../controler/controler");
const express =require("express").Router;
const owner =express();



owner.post("/ownerpage" ,ownerPost)
owner.get ("/ownerpage" ,ownerGet)
owner.patch ("/ownerpage/:id" ,ownerPut)
owner.delete ("/ownerpage/:id" ,ownerDelete)
owner.get ("/book/:id" ,book)



module.exports =owner ;