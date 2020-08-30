import blacklist from "../cache/blacklist.js";
import jwt from "jsonwebtoken";

export default {
    async verify(req, res, next){
        const {token} = req.query
        if(!token) return res.status(401).json({token: false})
        let exists =  await blacklist.verify(token)
        if(exists) return res.json({token: "used", message: "this token has already been used"})
        
        jwt.verify(token, process.env.SECRET_EMAIL, async (err, decoded)=>{
            if(err) return res.send(false);
            const {exp} = decoded;
            next();
            const expiresIn = await Math.round(Math.abs((Date.now() / 1000) - exp));
            return {expiresIn};
        }).then(async (expiresIn)=>{
            console.log(expiresIn)
            blacklist.add(token, expiresIn);
        })  
    }
}