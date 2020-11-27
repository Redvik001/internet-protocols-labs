import * as fs from "fs";
import * as common from "./common";
import { FtpSrv } from "ftp-srv";

const HOST = '127.0.0.1';
const PORT = 6970;

const ftpServer = new FtpSrv({
    url: `ftp://${HOST}:${PORT}`
});

ftpServer.on('login', (data, resolve, reject) => {
    if (data.username === "Dmitrii" && data.password === "001") {
        saveToLogs(`connection ${data.connection.id} - CONNECTED`);
        resolve({});
    }
    else reject(new Error("invalid login or password"));
});

ftpServer.on('client-error', (data) => {
    saveToLogs(`connection ${data.connection.id} - ERROR: ${data.error.stack}`);
});

ftpServer.on('disconnect', (data) => {
    saveToLogs(`connection ${data.connection.id} - CLOSED`);
});

ftpServer.listen().then(() => {
    console.log('Server listening on ' + HOST + ':' + PORT);
});

function saveToLogs(text: string) {
    console.log(text);
    fs.appendFileSync("logs.txt", text + "\n");
}