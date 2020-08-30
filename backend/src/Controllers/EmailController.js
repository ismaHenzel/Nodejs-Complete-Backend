import Queue from '../Queue/Queue.js';
import jwt from "jsonwebtoken";
import User from "../Model/User.js";
export default {
    async send(req, res){
        const {name, email} = req.body;  
        const {route} = req.params; 
        let {id} = req.body
        if(!id){
            console.log("<<< Please, send the ID of user instead EMAIL >>")
            const user = await User.findOne({email:email});
            id = user._id;
        }
        const token = await jwt.sign({id: id}, process.env.SECRET_EMAIL, {
            expiresIn: 18000
        })
        const user = 
            {
                name,
                email,
                token,
                id,
                route
            }   
        await Queue.newJob("SendEmail", user)   
        return res.send("Sucess")
    }
}