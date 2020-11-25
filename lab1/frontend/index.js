const hostInput = document.getElementById("host");
const portInput = document.getElementById("port");
const statusElem = document.getElementById("status");
const connectBtn = document.getElementById("connect");
const simbolsQuantityInput = document.getElementById("simbols-quantity");
const getSimbolsBtn = document.getElementById("get-simbols");
const respElem = document.getElementById("resp");

const net = require('net');
const client = new net.Socket();

connectBtn.addEventListener("click", () => {
    if (client.connecting) {
        client.destroy();
        statusElem.innerText = "OFF";
        connectBtn.innerText = "Подключиться"
    } else {
        client.connect(portInput.value, hostInput.value, () => {
            statusElem.innerText = "ON";
            connectBtn.innerText = "Разорвать соединение"
        });
    }
});

getSimbolsBtn.addEventListener("click", () => {
    if (!client.connecting) return alert("В начале, подключитесь к серверу.");
    client.write(simbolsQuantityInput.value);
});


client.on('data', (data) => {
    respElem.innerText = data;
});