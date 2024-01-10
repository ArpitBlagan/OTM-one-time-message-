"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userManger = void 0;
class userManger {
    constructor() {
        this.send = () => {
            const obj = {
                users: this.users,
            };
            const kk = JSON.stringify(obj);
            this.users.forEach((ele) => {
                ele.socket.socket.send(kk);
            });
        };
        this.sendd = (val) => {
            const data = JSON.stringify({ message: val.message, id: val.id_F });
            this.users.forEach((ele) => {
                console.log(ele.id);
                if (ele.id === val.id_T) {
                    console.log("sending");
                    ele.socket.socket.send(data);
                }
            });
        };
        this.addUser = (id, number, ws) => {
            const val = {
                id,
                socket: { number, socket: ws },
            };
            this.users.push(val);
            this.send();
        };
        this.delUser = (id, ws) => {
            console.log("beforr", this.users);
            this.users = this.users.filter((ele) => ele.id != id);
            console.log("after", this.users);
            this.send();
        };
        this.users = [];
    }
}
exports.userManger = userManger;
