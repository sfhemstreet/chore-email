const token = require('../utils/token');

const addChores = (req,res,sgMail) => {
    const isValid = token.checkToken(req);
    if(!isValid){
        return res.json('Token is not valid');
    }
    const {emails,groupName,chores} = req.body;

    const emailBody = `${groupName} has new chores! Get em done. Or else.`;

    emails.forEach(e => {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: e,
            from: 'pleasedoyourchores@gmail.com',
            subject: `New Chores for ${groupName}`,
            text: emailBody,
            html: null
        };
        sgMail.send(msg);    
    });
    
    return res.json('Success')
    
}

module.exports = {
    addChores
}







