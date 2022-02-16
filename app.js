const express = require('express');
const { Mongoose } = require('mongoose');
const Member = require("./models/member");
const app = express();
const mongoose = require('mongoose')
const DB = 'mongodb+srv://admin:admin123@cluster0.s1fj8.mongodb.net/membersDB?retryWrites=true&w=majority'
const port = 4000 || process.env.PORT ;

app.use(express.json());

mongoose.connect(DB,{
    useNewUrlParser:true,
    // useCreateIndex:true,
    useUnifiedTopology:true,
    // useFindAndModify:false
}).then(()=>{
    console.log("connection successful")
}).catch((e)=>{
    console.log(e);
})


app.get("/",(req,res)=>{
    res.send("Hello");
})



// Create new member
app.post("/members",async(req,res)=>{
    try{
        const member = new Member(req.body);
const createMember= await member.save();
res.status(201).send(createMember);
    }catch(e){
        res.status(400).send(e);
    }
})

//Read data of member
app.get("/members",async(req,res)=>{
    try{
      const membersData = await Member.find();  
        res.status(201).send(membersData);
    }catch(e){
        res.status(400).send(e);
    }
})

//Read individual data
app.get("/members/:id",async(req,res)=>{
    try{
        const _id=req.params.id;
        const memberData=await Member.findById(_id);
        if(!memberData){
            return res.status(404).send(); 
        }
        else{
            res.send(memberData);
        }

    }catch(e){
        res.status(500).send(e);
    }
})

// update the student by id
app.patch("/members/:id",async(req,res)=>{
    try{
        const _id=req.params.id;
        const updateMember=await Member.findByIdAndUpdate(_id,req.body,{
            new:true
        });
        res.status(201).send(updateMember); 
    }catch(e){
        res.status(404).send(e);
    }
})

//Delete member by id 
app.delete("/members/:id",async(req,res)=>{
    try{
        const deleteMember = await Member.findByIdAndDelete(req.params.id)

        if(!req.params.id){
            return res.status(400).send(); 
        }
        else{
            res.send(deleteMember)
        }
    }catch(e){
        res.status(500).send(e);
    }
})

app.listen(port,()=>{
    console.log(`Backend running`);
})

