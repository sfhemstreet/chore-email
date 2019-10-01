const token = require('../utils/token');
const template = require('../utils/emailTemplate');

const addChores = async (req,res,sgMail) => {
    
    const data = await token.checkToken(req);
    if(!data){
        return res.json('Token is not valid');
    }
    const {emails,groupName,chores} = req.body;
    const group_name = groupName.group_name;

    const emailBody = `${group_name} has new chores! Get em done. Or else.`;
    const htmlVersion = template.emailTemplate('New Chores',emailBody, 'Chore!', 'http://localhost:3000/','Get em done! Knock em out!');

    emails.forEach(e => {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: e,
            from: 'pleasedoyourchores@gmail.com',
            subject: `New Chores for ${group_name}`,
            text: emailBody,
            html: htmlVersion
        };
        sgMail.send(msg); 
        console.log('add chores message',msg);   
    });
    
    return res.json('Success');
}

module.exports = {
    addChores
}







