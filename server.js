const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
const chores = require('./controllers/chores');
const groups = require('./controllers/groups');
//const settings = require('./controllers/settings');

/* 
EMAIL SERVER FOR CHORE APP
- uses sendgrid api to send emails
- auth with JWT
*/

// Process.env
const {
    PORT = 5000,
    NODE_ENV = 'dev',
} = process.env;

const IN_PROD = NODE_ENV === 'prod';
const app = express();

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Add Chores Email
app.post('/addchores',  (req,res) => {chores.addChores(req,res,sgMail)});

// New Group Email
app.post('/newgroup',  (req,res) => {groups.newGroup(req,res,sgMail)});

// Forgot Password Email
//app.post('/forgotpassword', (req,res) => {settings.forgotPassword(req,res,sgMail)});

// Listen 
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});