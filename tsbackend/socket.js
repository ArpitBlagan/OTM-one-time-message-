"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delUser = exports.addUser = exports.sendd = exports.users = void 0;
let user;
exports.users = [];
const send = () => {
    const obj = {
        users: exports.users,
    };
    const kk = JSON.stringify(obj);
    exports.users.forEach((ele) => {
        ele.socket.socket.send(kk);
    });
};
const sendd = (val) => {
    const data = JSON.stringify({ message: val.message, id: val.id_F });
    exports.users.forEach((ele) => {
        console.log(ele.id);
        if (ele.id === val.id_T) {
            console.log("sending");
            ele.socket.socket.send(data);
        }
    });
};
exports.sendd = sendd;
const addUser = (id, number, ws) => {
    const val = {
        id,
        socket: { number, socket: ws },
    };
    exports.users.push(val);
    send();
};
exports.addUser = addUser;
const delUser = (id, ws) => {
    console.log("beforr", exports.users);
    exports.users = exports.users.filter((ele) => ele.id != id);
    console.log("after", exports.users);
    send();
};
exports.delUser = delUser;
