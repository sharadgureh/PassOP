const express= require("express")
var cors=require('cors')
const dotenv=require('dotenv')
const {MongoClient} = require('mongodb');
const app= express()


app.use(cors())
dotenv.config();
const bodyparser=require('body-parser')
const PORT = process.env.PORT || 3000
const github = process.env.GITHUB_URL
app.use(express.json())

// connection with DB 
const url='mongodb://localhost:27017/'
const client = new MongoClient(url)
// make db 
const dbname="passop"
// connect with create document (scheme)
const db=client.db(dbname)
app.listen(PORT,()=>{
        console.log(`the server is running on https://localhost:${PORT}`)
})

//   get all password 

app.get("/",(req,res)=>{
        res.send("hello form sharad server is running rigth now")
        
})
app.get("/find",async (req,res)=>{
        await client.connect();
        const collection = db.collection('passwords')
        const findresult=await collection.find({}).toArray();
        // res.send("this is home page")
        res.json(findresult)
        // res.send(findresult)
})

// save password 
app.post("/save",async (req,res)=>{
        const password= req.body
        await client.connect();
        const collection = db.collection('passwords')
        const findresult=await collection.insertOne(password);
        // res.send("this is home page")
        res.send({success:true,result:findresult})
        // console.log(password)

})

// delete password
app.delete("/delete", async (req, res) => {
        const password = req.body;
        console.log("Received delete request for:", password);
        await client.connect();
        const collection = db.collection('passwords');
        const findResult = await collection.deleteOne(password);
        console.log("Delete result:", findResult);
        res.send({ success: true, result: findResult });
    });
    
// app.get("/contact",async (req,res)=>{
//         let result = await fetch(github)
//         console.log(result)
//         res.json(result)
// })
// app.delete("/delete",async (req,res)=>{
//         const password= req.body
//         await client.connect();
//         const collection = db.collection('passwords')
//         const findresult=await collection.deleteOne(password);
//         // res.send("this is home page")
//         res.send({success:true,result:findresult})
// })