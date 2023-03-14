const express = require("express");
const bodyParser = require("body-parser");
const request = require("postman-request");
const mailchimp = require("@mailchimp/mailchimp_marketing");

const app = express();
const port = process.env.PORT ||3000;
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname +"/signup.html")
});
                            
app.listen(port, ()=>{
 console.log('starting server at port 3000');
});
mailchimp.setConfig({
    apiKey:"a60fba2076aa790f200aa0e8ffb6bcd3-us21",
    server:"us21"
})

app.post("/",function(req,res){
    const firstName = req.body.fName;
    const secondName = req.body.lName;
    const email = req.body.email;
  
    const listId ="735a37317b";
    //Creating an object with the user data
    const subscribingUser ={
        firstName:firstName,
        lastName:secondName,
        email:email
    };
    //uploading the data to the server
   const run = async () =>{
    try{
    const response = await mailchimp.lists.addListMember(listId,{
        email_address:subscribingUser.email,
        status:"subscribed",
        merge_fields:{
            FNAME:subscribingUser.firstName,
            LNAME:subscribingUser.lastName
        }
    });
    console.log(response);
    res.sendFile(__dirname+"/success.html");
    }catch(err){
      console.log(err.status);
      res.sendFile(__dirname+"/failure.html");
    }
   };
   run();
});
app.post("/failure",function(req,res){
    res.redirect("/");
})
  


// API Key
// a60fba2076aa790f200aa0e8ffb6bcd3-us21
// Audence Id
// 735a37317b