const token = require('../utils/token');
const template = require('../utils/emailTemplate');
require('dotenv').config()


const newGroup = async (req,res,sgMail) => {
    const data = await token.checkToken(req).catch(err => console.log(err))
    if(!data){
        return res.json('Token is not valid');
    }
    const {emails,groupName} = req.body;

    const emailBody = `You have been added to a chore group, ${groupName}! If you already have an account with us, log in and check it out. If you are new, sign up! It's free, easy, and you'll be connected to your group just by registering with this email. Chore is an easy way to manage all the things that need to get done.`;
    const emailText = `${emailBody} Check out your Chore group! ${process.env.FRONTEND_URL}`;
    // emailTemplate takes in - Title , Text , Button Text , Button Link URL , and text that goes above button -
    const htmlVersion = template.emailTemplate('Chore!',emailBody, 'Go to Chore', `${process.env.FRONTEND_URL}`,'Get started!');

    emails.forEach(e => {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: e,
            from: 'pleasedoyourchores@gmail.com',
            subject: `You have been added to a Chore Group!`,
            text: emailText,
            html: htmlVersion
        };
        sgMail.send(msg); 
    });

}

module.exports = {
    newGroup
}