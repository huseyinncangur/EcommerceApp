const  mongoose = require("mongoose");

const uri = "mongodb://localhost:27017";


const connection= () => {
    mongoose.connect(uri,{
      useNewUriParser:true,
      useUnifiedTogology:true
    }).then(()=>console.log("success"))
    .catch((err)=>console.log("error"));
}

module.exports = connection;