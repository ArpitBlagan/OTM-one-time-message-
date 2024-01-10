import {useEffect,useState} from 'react'
import {useLocation} from 'react-router-dom'
import Inputt from './Inputt';
const Main = () => {
    const location=useLocation();
    const [sockett,setS]=useState<WebSocket|null>(null);
    const {number,id}=location.state;
    const conectt=async()=>{
        const socket= new WebSocket(`ws://localhost:4000?number=${number}&id=${id}`);
            //After connecting than only socket will become open
            socket.onopen=()=>{
            // const obj={
            //     name:number,
            //     message:"cool"
            // };
            // const val=JSON.stringify(obj);
            // sockett.send(val);
            };
            setS(socket);
      }
    useEffect(()=>{
        conectt();
    },[]);
    return (
        <div>
            {sockett&&<Inputt sockett={sockett} number={number}/>}
        </div>
    )
}
export default Main