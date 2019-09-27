const token = require('../utils/token');

const forgotPassword = (req,res,sgMail) => {
    const isValid = token.checkToken(req);
    if(!isValid){
        return res.json('Token is not valid');
    }
    const {email} = req.body;

    const emailBody = '';
    
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: e,
        from: 'pleasedoyourchores@gmail.com',
        subject: `So you forgot your password huh`,
        text: emailBody,
        html: null
    };
    sgMail.send(msg);    
  

}

module.exports = {
    forgotPassword
}