const token = require('../utils/token');

const addChores = async (req,res,sgMail) => {
    console.log('new add chores req');
    const data = await token.checkToken(req);
    if(!data){
        return res.json('Token is not valid');
    }
    const {emails,groupName,chores} = req.body;
    const group_name = groupName.group_name;

    const emailBody = `${group_name} has new chores! Get em done. Or else.`;

    emails.forEach(e => {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: e,
            from: 'pleasedoyourchores@gmail.com',
            subject: `New Chores for ${group_name}`,
            text: emailBody,
            //html: ''
        };
        sgMail.send(msg); 
        console.log('add chores message',msg);   
    });
    
    return res.json('Success');
}

module.exports = {
    addChores
}







