import express from "express"
import ImageKit from "imagekit";
import cors from "cors"
import mongoose from "mongoose";
import UserChats from "./models/userChats.js";
import Chat from "./models/chats.js";
import { ClerkExpressRequireAuth, ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
// backend server 
const port = process.env.PORT || 5000;
const app = express();
app.use(cors({
    origin: process.env.ClIENT_URL,
    credentials:true,
}))


app.use(express.json());


const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("connected to mongoDB")
    }
    catch (err) {
        console.log(err)

    }
}
const imagekit = new ImageKit({
    urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
    publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY
});



app.get("/api/upload", (req, res) => {
    const result = imagekit.getAuthenticationParameters();
    res.send(result);
})



// app.get("/api/test",ClerkExpressRequireAuth(),(req,res)=>{
//     res.send("Success");
// })



app.post("/api/chats", ClerkExpressWithAuth(), async (req, res) => {
    const userId=req.auth.userId
    const { text } = req.body;
    try {
        // create a new chat
        const newChat = new Chat({
            userId: userId,
            history: [{
                role: "user", parts: [{ text }]
            }

            ],
        })
        const savedChat = await newChat.save();
        //check if the userchats exist
        const userChats = await UserChats.find({ userId });
        // if doesnt exist create a new one and add the caht in the chats array
        if (!userChats.length) {
            const newUserChats = new UserChats({
                userId: userId,
                chats: [
                    {
                        _id: savedChat.id,
                        title: text.substring(0, 40)

                    }
                ]
            })
            await newUserChats.save()
        } else {
            // if exists,push the chat to the existing array
            await UserChats.updateOne({ userId: userId, 
                $push: {
                    chats: {
                        _id: savedChat._id,
                        title: text.substring(0, 40),
                    },
                },
            })
            res.status(201).send(newChat._id)
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Error creating chat");
    }
})




app.get("/api/userchats", ClerkExpressRequireAuth(),async(req,res)=>{
    const userId=req.auth.userId;
    try{
        const userChats= await UserChats.find({userId});
        res.status(200).send(userChats[0].chats);
    }
    catch(err){
        console.log(err);
        res.status(500).send("Error fetching userChats");
    }
})

app.get("/api/chats/:id", ClerkExpressRequireAuth(),async(req,res)=>{
    const userId=req.auth.userId;
    try{
        const chat = await Chat.findOne({_id:req.params.id,userId});
        res.status(200).send(chat);
    }
    catch(err){
        console.log(err);
        res.status(500).send("Error fetching chat");
    }
})
app.put("/api/chats/:id", ClerkExpressRequireAuth(),async(req,res)=>{
    const userId=req.auth.userId;
    const{question,answer,img}=req.body;
    const newItems=[
        {role:"user",parts:[{text:question}]}
    ]
    try{
        const upadatedChat=await Chat.updateOne({_id:req.params.id, userId},{
            $push:{
                history
            }
        })
        res.status(200).send(chat);
    }
    catch(err){
        console.log(err);
        res.status(500).send("Error adding conversation");
    }
})






app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(401).send('Unauthenticated!');
  });








app.listen(port, () => {
    connect()
    console.log("server is running at port 5000")
})