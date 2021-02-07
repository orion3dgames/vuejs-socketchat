const Mysql = require('mysql');
const Moment = require('moment-timezone');
const fs = require('fs');

const LOCAL = true;
const DEBUG = true;
const db_users = [];
const online_users = [];
const rooms = [];

// SETTINGS
const global_settings = {
    ORG_ID: 1,
    company_id: 6,
};

var io_config = {
    port: 3008,
    pingInterval: 25000, // MS
    pingTimeout: 60000, // MS
    path: '/chat',
}

if(LOCAL){
    debugLog('[LOCAL MODE STARTED]');
    var DB = Mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'DB',
        port: 3306
    });
    var chat_server = require('http').createServer();

}else{
    debugLog('[ONLINE MODE STARTED]');
    var DB = Mysql.createPool({
        host: 'HOST',
        user: 'USER',
        password: 'PASSWORD',
        database: 'DB',
        port: 3306,
        connectionLimit : 1000,
        connectTimeout  : 60 * 60 * 1000,
        aquireTimeout   : 60 * 60 * 1000,
        timeout         : 60 * 60 * 1000
    });

    var options = {
        key: fs.readFileSync('XXXXX'),
        cert: fs.readFileSync('XXXXX')
    };

    var chat_server = require('https').createServer(options);
}

// START IO SERVER
var io = require('socket.io')({
    path: io_config.path,
    serveClient: false,
});

// ATTACH SERVER
io.attach(chat_server, {
    pingInterval: io_config.pingInterval,
    pingTimeout: io_config.pingTimeout,
    cookie: false
});

// CHAT INITIALIZATION
chat_server.listen(io_config.port, function () {
    console.log('Server started on port '+io_config.port+' and bound to '+io_config.path);
});

// SOCKET EVENTS
io.on('connection', (socket) => {

    debugLog('[IO] New Connection', socket.id);
    socket.emit('connected');

    socket.on('message', (data) => {
        debugLog('Message Received & Sent Back To Room', data);
        debugLog('socket', io.sockets.adapter.rooms);
        socket.emit('message', data);
    });

    socket.on('broadcast', (data) => {
        debugLog('Broadcast Sent', data);
        socket.broadcast.emit('broadcast', data);
    });

    socket.on('logout', function (reason) {
        debugLog('[logout] Socket logout', reason);
        disconnect();
    });

    socket.on('disconnect', function (reason) {
        debugLog('[disconnect] Socket disconnected', reason);
        disconnect();
    });

    // remove a connected user from the list of online users
    var disconnect = () => {

        debugLog('Attempting to disconnect: ' + socket.id + '.');

        DB.query("DELETE FROM users_active_pages WHERE socket_id=? ", [socket.id], function () {
        });

        for (let x in online_users) {
            if (online_users[x].socketId == socket.id) {

                socket.broadcast.emit('offline', online_users[x]);

                debugLog('User Disconnected: ', online_users[x].username);

                setDbUserOnlineStatus(online_users[x].id, false);

                online_users.splice(x, 1);

                return true;
            }
        }

        debugLog(socket.id + ' could not be fully disconnected.');
    };

});

//////////////////////////////////////////////////////////
///////////////////// FUNCTIONS

let getMktime = () => {
    var tmpTime = Moment().tz('Australia/Sydney').unix();
    return tmpTime;
}

let checkDbUser = (user_id) => {
    for (let i in db_users) {
        if (user_id == db_users[i].id) {
            return db_users[i];
        }
    }
    return false;
}

// pluck the room from the room array
let checkRoom = (room_id) => {
    for (let i in rooms) {
        if (room_id == rooms[i].id) {
            return rooms[i];
        }
    }
}


// SET USER STATUS
let setDbUserOnlineStatus = (user_id, status) => {
    for (let i in db_users) {
        if (user_id == db_users[i].id) {
            db_users[i].online = status;
            return true;
        }
    }
    return false;
}

//////////////////////////////////////////////////////////
///////////////////// UTILS

function debugLog(msg, data) {
    if(DEBUG){
        console.log(msg, (data ? data : false));
    }
}
