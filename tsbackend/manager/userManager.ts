type obj = {
  number: string;
  socket: WebSocket;
};
interface user {
  id: string;
  socket: obj;
}
export class userManger{
  private users:user[];
  constructor(){
    this.users=[];
  }
  send = () => {
    const obj = {
      users:this.users,
    };
    const kk = JSON.stringify(obj);
    this.users.forEach((ele) => {
      ele.socket.socket.send(kk);
    });
  };
  sendd=(val:any)=>{
    const data = JSON.stringify({ message: val.message, id: val.id_F });
      this.users.forEach((ele: any) => {
        console.log(ele.id);
        if (ele.id === val.id_T) {
          console.log("sending");
          ele.socket.socket.send(data);
        }
      });
  }
  addUser = (
    id: string,
    number: string,
    ws: WebSocket
  ) => {
    const val: user = {
      id,
      socket: { number, socket: ws },
    };
    this.users.push(val);
    this.send();
  };
  delUser = (id: string, ws: WebSocket) => {
    console.log("beforr", this.users);
    this.users = this.users.filter((ele) => ele.id != id);
    console.log("after", this.users);
    this.send();
  };
}
