const token = require('../utils/token');
const template = require('../utils/emailTemplate');


const addChores = async (req,res,sgMail) => {
    
    const data = await token.checkToken(req).catch(err => console.log(err))
    if(!data){
        return res.json('Token is not valid');
    }
    const {emails,groupName,chores} = req.body;
    const group_name = groupName.group_name;

    const emailBody = `${group_name} has new chores! Get em done. Or else.`;
    const emailText = `${emailBody} Check them out here - ${process.env.FRONTEND_URL}`;
    // emailTemplate takes in - Title , Text , Button Text , Button Link URL , and text that goes above button -
    const htmlVersion = template.emailTemplate('New Chores',emailBody, 'Chore!', `${process.env.FRONTEND_URL}`,'Get em done! Knock em out!');

    emails.forEach(e => {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: e,
            from: 'pleasedoyourchores@gmail.com',
            subject: `New Chores for ${group_name}`,
            text: emailText,
            html: htmlVersion
        };
        sgMail.send(msg);   
    });
    
    return res.json('Success');
}

module.exports = {
    addChores
}







