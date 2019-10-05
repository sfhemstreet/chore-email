const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
require('dotenv').config()

const chores = require('./controllers/chores');
const groups = require('./controllers/groups');
const users = require('./controllers/users');

/* 
EMAIL SERVER FOR CHORE APP
- uses sendgrid api to send emails
- auth with JWT
*/

const app = express();

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Verify User Email 
app.post('/verifyuseremail', (req,res) => {users.verifyEmail(req,res,sgMail)})

// Add Chores Email
app.post('/addchores',  (req,res) => {chores.addChores(req,res,sgMail)});

// New Group Email
app.post('/newgroup',  (req,res) => {groups.newGroup(req,res,sgMail)});

// Forgot Password Email
app.post('/forgotpassword', (req,res) => {users.forgotPassword(req,res,sgMail)});

// Delete ACcount Email
app.post('/deleteaccount', (req,res) => {users.deleteAccount(req,res,sgMail)});

// Listen 
app.listen(process.env.PORT || 5000, () => {
    console.log(`App running on port ${process.env.PORT || 5000}`);
});

const FRONTEND_URL = 'http://localhost:3000/';
const BACKEND_URL = 'http://localhost:4000/';
const SECRET = 'temp_lol_secrettemp_lol_secrettemp_lol_secrettemp_lol_secrettemp_lol_secrettemp_lol_secret';