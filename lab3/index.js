const recipientInput = document.getElementById("recipient");
const titleInput = document.getElementById("sended-title");
const textInput = document.getElementById("sended-text");
const sendMailBtn = document.getElementById("send-mail-btn");

const nodemailer = require('nodemailer');

const username = 'test.28.11.2020@gmail.com';
const password = 'qsd345jty678';

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: username, pass: password }
});

sendMailBtn.addEventListener("click", sendMail);

function sendMail() {
    transporter.sendMail({
        from: username,
        to: recipientInput.value,
        subject: titleInput.value,
        text: textInput.value
    }, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

