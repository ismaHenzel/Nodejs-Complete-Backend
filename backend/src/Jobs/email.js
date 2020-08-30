import nodemailer from 'nodemailer';
import emailConf from "../Config/emailConf.js";

export default async function email(user){
    const transport = nodemailer.createTransport(emailConf);
    const link =await `http://localhost:3333/${user.route}/${user.id}?token=${user.token}`
    console.log(emailConf)
    await transport.sendMail({
        from: '"examplezinho" <testing@gmail.com>',
        to: ` ${user.name} , ${user.email}`,
        subject: "Testing my api",
        text: `hello ${user.name}`,
        html: `
            Olá ${user.name}, click in this link to verify your email:
            <a href=${link}>VerifyAccount</a>
              `
    });
}

