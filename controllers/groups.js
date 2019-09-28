const token = require('../utils/token');

const newGroup = (req,res,sgMail) => {
    const isValid = token.checkToken(req);
    if(!isValid){
        return res.json('Token is not valid');
    }
    const {emails,groupName} = req.body;

    const emailBody = `You have been added to a new Chore Group! Chore is a way of staying up to date with chores without having to bother eachother. If you dont have an account, signup using this email and you will connected to the group, ${groupName}.`;

    emails.forEach(e => {
        //sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: e,
            from: 'pleasedoyourchores@gmail.com',
            subject: `You have been added to a Chore Group!`,
            text: emailBody,
            html: null
        };
        //sgMail.send(msg); 
        console.log('new group msg', msg);   
    });

}

module.exports = {
    newGroup
}