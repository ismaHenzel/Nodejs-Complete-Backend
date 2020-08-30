import jwt from 'jsonwebtoken';
export default{
    async verify(req, res, next){
    const {token} = req.headers; 
    console.log(token)
    if(!token) return res.json({token: false, message: "No_Token"});
    
    jwt.verify(token, process.env.SECRET_PASS, (err, decoded )=>{
        if(err) return res.status(400).send({token: false, message: "Token_Invalid"});
        res.status(200).json({token: true, message: "Token_Valid"})
        next();
    })
    }

}