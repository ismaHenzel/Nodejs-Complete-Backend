import User from '../Model/User.js';
import bcrypt from 'bcrypt';
export default{
    async store(req, res){
        const { email, password, name} = await req.body;
        let emailExist = await User.findOne({email: email});
        if(emailExist) return res.status(401).send("This user still in use");
        
        let salt = await  bcrypt.genSalt(10);
        let hash = await bcrypt.hash(password, salt)

        try{
            let user = await User.create({
                email,
                name,
                password: hash
                });
            await user.save();
            return res.json(user);
        }catch(err){
            console.error("Error in save user: ", err);
            res.status(400).json({
                 status: "failed",
                 message: "Error in save user: ", err
            })
        }
    }
}
