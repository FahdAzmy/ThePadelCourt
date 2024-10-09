const  {ownerPost ,ownerGet,ownerPut,ownerDelete}  = require("../controler/controler");
const express =require("express").Router;
const owner =express();



owner.post("/ownerpage" ,ownerPost)
owner.get ("/ownerpage" ,ownerGet)
owner.patch ("/ownerpage/:id" ,ownerPut)
owner.delete ("/ownerpage/:id" ,ownerDelete)



module.exports =owner ;