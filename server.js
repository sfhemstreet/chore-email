const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');

// Process.env
const {
    PORT = 5000,
    NODE_ENV = 'dev',
    TEMP_SECRET = 'lolzlolz',
} = process.env;

const IN_PROD = NODE_ENV === 'prod';
const app = express();

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