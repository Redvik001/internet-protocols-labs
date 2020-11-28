const msg = JSON.parse(decodeURIComponent(location.search.substr(6)));
document.title = msg.subject
document.write(msg.html || msg.text);