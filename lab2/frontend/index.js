const hostInput = document.getElementById("host");
const portInput = document.getElementById("port");
const statusElem = document.getElementById("status");
const connectBtn = document.getElementById("connect");
const simbolsQuantityInput = document.getElementById("simbols-quantity");
const getSimbolsBtn = document.getElementById("get-simbols");
const respElem = document.getElementById("resp");

const ftp = require("basic-ftp")

const client = new ftp.Client();
client.ftp.verbose = true;

async function example() {
    try {
        await client.access({
            host: "127.0.0.1",
            port: 6970,
            user: "Dmitrii",
            password: "001"
        })
        console.log(await client.list())
        // await client.uploadFrom("README.md", "README_FTP.md")
        // await client.downloadTo("README_COPY.md", "README_FTP.md")
    }
    catch (err) {
        console.log("001", err);
    }
    // client.close();
}

example();



// connectBtn.addEventListener("click", () => {
//     if (client.readyState === "open") {
//         client.destroy();
//         statusElem.innerText = "OFF";
//         connectBtn.innerText = "Подключиться";
//     } else {
//         client.connect(portInput.value, hostInput.value, () => {
//             statusElem.innerText = "ON";
//             connectBtn.innerText = "Разорвать соединение";
//         });
//     }
// });

// getSimbolsBtn.addEventListener("click", () => {
//     if (client.readyState !== "open") return alert("В начале, подключитесь к серверу.");
//     client.write(simbolsQuantityInput.value);
// });

// client.on('data', (data) => {
//     respElem.innerText = data;
// });