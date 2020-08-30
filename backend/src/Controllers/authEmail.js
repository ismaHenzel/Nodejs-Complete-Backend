import User from "../Model/User.js";
export default {
    async update(req, res){
        const {id} = req.params;
        try{
        const user = await User.findByIdAndUpdate(id, {authenticated: true});
        return res.json({authenticated: true});
        }catch(err){
            res.status(400).send("Error in authentication : ", err)
        }
    }
}