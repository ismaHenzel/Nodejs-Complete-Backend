import client from "../redis/client.js";
import util from "util";
client.exists = util.promisify(client.exists);

export default{
    async add(token,params){
        if(!token) return "No token";
        client.select(1, async(err)=>{
            if(err) throw err;
            const exists = await client.exists(token);
            if(exists===1) return "This token still in list"

            return client.SETEX(token, params.expiresIn, "");
        })   
    },
    async verify(token){
            return await client.exists(token);
    }
}