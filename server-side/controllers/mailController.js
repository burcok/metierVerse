import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import ENV from '../config.js';

// https://etheral.email/create
let nodeConfig = {
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: ENV.NODEMAILER_EMAIL, // generated ethereal user
      pass: ENV.NODEMAILER_PASSWORD, // generated ethereal password
    }
}

let transporter = nodemailer.createTransport(nodeConfig);
let mailGenerator = new Mailgen({
    theme: 'default',
    product: {
        name: 'Mailgen',
        link: 'https://cookbook.com'
    }
})

/** PUT: http://localhost:8080/api/registerMail
 * @params : {
  "username": "example123",
  "userEmail": "burakdereli05@gmail.com",
  "text": "Testing Mail",
  "subject": "Backend Mail Test",
}
*/
export const registerMail = async (req, res) =>{
    const { username, userEmail, text, subject } = req.body;

    let mail = {
        body : {
            name: username,
            intro: text || 'Hello there!',
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.',
        }
    }

    let mailBody = mailGenerator.generate(mail);

    let message = {
        from : ENV.NODEMAILER_EMAIL,
        to : userEmail,
        subject : subject,
        html : mailBody
    }

    transporter.sendMail(message)
        .then(()=>{
            res.status(200).send({message: 'You should receive an email from us.'})
        })
        .catch(err => res.status(500).send({message:  err ||'Something went wrong.',}))
}
