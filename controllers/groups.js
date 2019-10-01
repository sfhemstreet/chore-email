const token = require('../utils/token');
const template = require('../utils/emailTemplate');

const newGroup = (req,res,sgMail) => {
    const data = token.checkToken(req);
    if(!data){
        return res.json('Token is not valid');
    }
    const {emails,groupName} = req.body;

    const emailBody = `You have been added to a new Chore Group! Chore is a way of staying up to date with chores without having to bother eachother. If you dont have an account, signup using this email and you will connected to the group, ${groupName}.`;
    const htmlVersion = template.emailTemplate('Chore!',emailBody);

    emails.forEach(e => {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: e,
            from: 'pleasedoyourchores@gmail.com',
            subject: `You have been added to a Chore Group!`,
            text: emailBody,
            html: htmlVersion
        };
        sgMail.send(msg); 
          
    });

}

module.exports = {
    newGroup
}