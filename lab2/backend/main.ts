import * as fs from "fs";
import * as common from "./common";
import { FtpSrv } from "ftp-srv";

const HOST = '127.0.0.1';
const PORT = 6970;

const ftpServer = new FtpSrv({
    url: `ftp://${HOST}:${PORT}`,
    anonymous: true,
    greeting: ["001", "002"]
});

ftpServer.on('login', (data, resolve, reject) => {
    console.log('data: ' + data);
    console.log('resolve: ' + resolve);
    console.log('reject: ' + reject);

});

ftpServer.listen().then(() => {
    console.log('Server listening on ' + HOST + ':' + PORT);
});

function saveToLogs(text: string) {
    console.log(text);
    fs.appendFileSync("logs.txt", text + "\n");
}