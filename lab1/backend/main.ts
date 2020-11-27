import * as net from "net";
import * as fs from "fs";
import * as common from "./common";

const HOST = '127.0.0.1';
const PORT = 6969;

const text = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem
Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`

net.createServer((sock) => {
    saveToLogs(`${sock.remoteAddress}:${sock.remotePort} - CONNECTED`);

    sock.on('data', (data) => {
        sock.write(text.substr(0, +data));
        saveToLogs(`${sock.remoteAddress}:${sock.remotePort} - get first ${data} simbols`);
    });

    sock.on('close', () => {
        saveToLogs(`${sock.remoteAddress}:${sock.remotePort} - CLOSED`);
    });

}).listen(PORT, HOST);

console.log('Server listening on ' + HOST + ':' + PORT);

function saveToLogs(text: string) {
    console.log(text);
    fs.appendFileSync("logs.txt", text + "\n");
}