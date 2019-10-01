const token = require('../utils/token');
const template = require('../utils/emailTemplate');

// VERIFY EMAIL
const verifyEmail = async (req,res,sgMail) => {
    const data = await token.checkToken(req);
    if(!data){
        return res.json('Token is not valid');
    }
    const {user_name,email,verifyStr} = req.body;
    const emailText = `${user_name}, thank you for joining Chore! You are very close to having a clean home you can relax in.`;
    const emailBody = `${emailText} Please click the link or copy and paste it into your browser to verify your Chore account. http://localhost:4000/verify${verifyStr}`;
    const htmlVersion = template.emailTemplate('Chore - Finish Registering',emailText, 'Click Here','http://localhost:4000/verify${verifyStr}','Verify your Chore account!');

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: email,
        from: 'pleasedoyourchores@gmail.com',
        subject: `Finish Registering for Chore`,
        text: emailBody,
        html: htmlVersion
    };
    sgMail.send(msg);   
    
    return res.json('Success');
}

// FORGOT PASSWORD EMAIL
const forgotPassword = (req,res,sgMail) => {
    const isValid = token.checkToken(req);
    if(!isValid){
        return res.json('Token is not valid');
    }
    const {email,string} = req.body;

    const emailText = 'So you forgot your password huh. Well at least your doing your chores... You are doing your chores, right?';
    const emailBody = `${emailText} Please click the link or copy and paste it into your browser to reset your password. http://localhost:4000/resetforgot${string}`;
    const htmlVersion = template.emailTemplate('Chore - Forgot Password',emailText, 'Click Here','http://localhost:4000/resetforgot${string}','Lets reset your Chore password');
    
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: email,
        from: 'pleasedoyourchores@gmail.com',
        subject: `So you forgot your password huh`,
        text: emailBody,
        html: htmlVersion
    };
    sgMail.send(msg);    
  

}

module.exports = {
    verifyEmail,
    forgotPassword
}