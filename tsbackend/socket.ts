// convert this to class
type obj = {
  number: string;
  socket: WebSocket;
};
interface user {
  id: string;
  socket: obj;
}
let user;
export let users: user[] = [];
const send = () => {
  const obj = {
    users,
  };
  const kk = JSON.stringify(obj);
  users.forEach((ele) => {
    ele.socket.socket.send(kk);
  });
};
export const sendd=(val:any)=>{
  const data = JSON.stringify({ message: val.message, id: val.id_F });
    users.forEach((ele: any) => {
      console.log(ele.id);
      if (ele.id === val.id_T) {
        console.log("sending");
        ele.socket.socket.send(data);
      }
    });
}
export const addUser = (
  id: string,
  number: string,
  ws: WebSocket
) => {
  const val: user = {
    id,
    socket: { number, socket: ws },
  };
  users.push(val);
  send();
};
export const delUser = (id: string, ws: WebSocket) => {
  console.log("beforr", users);
  users = users.filter((ele) => ele.id != id);
  console.log("after", users);
  send();
};
