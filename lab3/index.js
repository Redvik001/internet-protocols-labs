const recipientInput = document.getElementById("recipient");
const titleInput = document.getElementById("sended-title");
const textInput = document.getElementById("sended-text");
const sendMailBtn = document.getElementById("send-mail-btn");



const nodemailer = require('nodemailer');

const username = 'test.28.11.2020@gmail.com';
const password = 'qsd345jty678';

const transporter = nodemailer.createTransport({
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
            alert("Письмо отправлено.")
        }
    });
}


const messagesListElem = document.getElementById("messages-list");
const updateMessagesBtn = document.getElementById("update-messages-btn");
const Client = require('node-poplib-gowhich').Client;
updateMessagesBtn.addEventListener("click", getMessages);

async function getMessages() {
    const client = new Client({
        hostname: 'pop.gmail.com',
        port: 995,
        tls: true,
        mailparser: true,
        username: username,
        password: password
    });

    client.connect((err) => {
        if (err) console.dir(err);
    });

    client.retrieveAll((err, messages) => {
        if (err) console.dir(err);
        messagesListElem.innerHTML = "";
        if (!messages.length) {
            messagesListElem.innerHTML = "Список сообщений пуст";
        } else {
            messages.sort((item1, item2) => item2.date - item1.date);
            for (let msg of messages) {
                if (!msg) continue;
                const msgTitleElem = document.createElement("div");
                msgTitleElem.innerText = msg.subject;
                msgTitleElem.addEventListener("click", () => {
                    window.open("message.html?data=" + encodeURIComponent(JSON.stringify(msg)), '_blank');
                });
                messagesListElem.appendChild(msgTitleElem);
            }
        }
        alert("Список обновлён.");
    });
}

