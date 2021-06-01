// Wake on lan module
const wol = require('wake_on_lan');

// File system
const fs = require('fs');

// Express module
const express = require('express');
//const { json } = require('express');
const app = express();

app.use(log_response);

app.use(express.static('files')); // This automatically serves index.html in the files directory

app.get('/wake_device', (req, res) => {
    wol.wake(req.query.mac_address);
    //wol.wake('00:D8:61:5A:8F:C0');
    console.log(req.query.mac_address);
    res.write('<html>');
    res.write('<head> <title> Success! </title> </head>');
    res.write(' <body> Attempted to wake your device!!<br>');
    res.write('<form action="/"><button>Go back home</button></form>')
    res.write('</body></html>');
    res.end();
})

app.get('/add_device', process_mac, append_to_file, (req, res) => {
        res.write('<html>');
        res.write('<head> <title> Success! </title> </head>');
        res.write(' <body> New device added!<br>');
        res.write('<form action="/"><button>Go back home</button></form>')
        res.write('</body></html>');
        res.end();
})

function process_mac(req, res, next){
    if (/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})|([0-9a-fA-F]{4}\\.[0-9a-fA-F]{4}\\.[0-9a-fA-F]{4})$/.test(req.query.mac_address)) {
        next();
    }
    else {
        res.write('<html>');
        res.write('<head> <title> Not valid </title> </head>');
        res.write(' <body> Mac address not valid!<br>');
        res.write('<form action="/"><button>Go back home</button></form>')
        res.write('</body></html>');
        res.end();
    }
}

function append_to_file(req, res, next){
    fs.readFile('./files/macs.json', (err, data) => {
        if (err) throw err;
        else {
            var jsonData = JSON.parse(data);
            const newMac = {name : req.query.name, mac : req.query.mac_address};
            jsonData.push(newMac);
            fs.writeFile('./files/macs.json', JSON.stringify(jsonData, null, 2), (err) => {
                if (err) { throw err; }
                else { console.log('Data appended!'); }
            });
            next();
        }
    });
    
}

// Testing
function log_response(req, res, next){
    next();
    //console.log(res);
}

app.listen(3000);