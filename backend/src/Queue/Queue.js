import Queue from 'bee-queue';
import email from '../Jobs/email.js';
export default {
    async newJob(name, user){
        const queue = await new Queue(name,{
            redis:{
                host: "127.0.0.1",
                port: 6379,
                db:0
            },
            removeOnSuccess: true,
            removeOnFailure: true
        })
        queue.createJob(user).retries(3).save();
    },

    async process(name){
        const queue = new Queue(name); // i can't using just Queue(), have an error
        queue.process(async (job)=>{
            console.log(job.data)
            if(job.queue.name != "SendEmail"){
                return console.log(`${job.name} not implemented yet`)
            }
            await email(job.data)
            return "Process complete";
        })
    }
}