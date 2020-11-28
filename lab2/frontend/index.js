const hostInput = document.getElementById("host");
const portInput = document.getElementById("port");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const statusElem = document.getElementById("status");
const connectBtn = document.getElementById("connect");
const sharedSilesContainer = document.getElementById("shared-files-container");
const uploadFileInput = document.getElementById("upload-file-input");

const ftp = require("basic-ftp");
const { ipcRenderer } = require('electron');

const client = new ftp.Client();
// client.ftp.verbose = true;

connectBtn.addEventListener("click", async () => {
    if (client.closed) {
        try {
            await login();
        } catch (error) {
            client.close();
            return alert(error.message);
        }
        statusElem.innerText = "ON";
        connectBtn.innerText = "Разорвать соединение";
        updateSharedFilesList();
    } else {
        client.close();
        statusElem.innerText = "OFF";
        connectBtn.innerText = "Подключиться";
    }
});


uploadFileInput.addEventListener("change", async () => {
    if (client.closed) {
        uploadFileInput.value = null;
        return alert("В начале, подключитесь к серверу.");
    }
    const file = uploadFileInput.files[0];
    if (!file) return;
    await client.uploadFrom(file.path, file.name);
    uploadFileInput.value = null;
    alert(`Файл ${file.name} успешно загружен на ftp сервер.`);
    updateSharedFilesList();
});

function login() {
    return client.access({
        host: hostInput.value,
        port: portInput.value,
        user: usernameInput.value,
        password: passwordInput.value
    });
}

async function updateSharedFilesList() {
    sharedSilesContainer.innerHTML = "";
    for (let file of await client.list()) {
        if (file.isDirectory) return;
        const anchor = document.createElement("a");
        anchor.innerText = file.name;
        anchor.addEventListener("click", async (event) => {
            const onPathSended = async (event, data) => {
                if (data.fileName === file.name) {
                    ipcRenderer.off("sendDownloadFilePath", onPathSended);
                    if (data.filePath) await client.downloadTo(data.filePath, file.name);
                }
            }
            ipcRenderer.on("sendDownloadFilePath", onPathSended);
            ipcRenderer.send("getDownloadFilePath", { fileName: file.name });
        });
        sharedSilesContainer.appendChild(anchor);
    }
}