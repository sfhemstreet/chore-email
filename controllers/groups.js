const token = require('../utils/token');
const template = require('../utils/emailTemplate');

const newGroup = (req,res,sgMail) => {
    const data = token.checkToken(req);
    if(!data){
        return res.json('Token is not valid');
    }
    const {emails,groupName} = req.body;

    const emailBody = `You have been added to a new chore group, ${groupName}! If you already have an account with us, log in and check it out. If you are new, sign up! It's free, easy, and you'll be connected to your group just by registering with this email. Chore is an easy way to manage all the things that need to get done.`;
    // emailTemplate takes in - Title , Text , Button Text , Button Link URL , and text that goes above button -
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
        console.log('new group email - ',msg)
    });

}

module.exports = {
    newGroup
}