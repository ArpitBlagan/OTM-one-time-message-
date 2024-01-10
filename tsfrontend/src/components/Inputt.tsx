import React,{useState,useEffect} from 'react';
import Online from './Online';
interface ChildProps {
    sockett: WebSocket;
    number:number
}
type obj={
    number:string,
    socket:WebSocket
}
type objj ={
    number:string,
    socket:WebSocket,
    id:string
}
type cool={
    text:string,
    me:boolean
}
export interface message{
    info:obj,
    message:cool[],
    new:boolean,
    id:string
}
interface user{
    id:string,
    socket:obj
}
const Inputt:React.FC<ChildProps>= ({sockett,number}) => {
    const [message,setM]=useState<string>("");
    const [usersMessages,setMm]=useState<message[]>([]);
    const [mine,setMi]=useState<string>("");
    const [selected,setS]=useState<objj|null>(null);
    const handleC=(event:React.ChangeEvent<HTMLInputElement>)=>{
        const message=event.target.value;
        setM(message);
    }
    useEffect(()=>{
            sockett.addEventListener('message',(event)=>{
            const val=JSON.parse(event.data);
            console.log(val);
            if(val.users){
                const ff:message[]=[];
                val.users.forEach((ele:user,)=>{
                    if(ele.socket.number==number.toString()){setMi(ele.id);}
                    ff.push({id:ele.id,info:ele.socket,message:[],new:false});
                });
                setMm(()=>{return [...ff]});
                console.log("done",ff,usersMessages);
            }
            else{
                console.log("Incoming message")
                console.log(val.message,val.id,usersMessages);
                setMm((prev)=>{
                    return prev.map((ele)=>{
                        if(ele.id==val.id){
                            return {
                                ...ele,
                                new:true
                                ,message:[...ele.message,{me:false,text:val.message}]
                            };
                        }
                        else{return ele;}
                    })
                });
            }   
            });
            return ()=>{
            }
    },[])
    const handleClick=(event:React.MouseEvent<HTMLButtonElement>)=>{
        event.preventDefault();
        console.log("notready");
        if(message&&selected){
            setMm((prev) => {
               return  prev.map((ele)=>{
                    if(ele.id==selected.id){
                        return {
                            ...ele,message:[...ele.message,{me:true,text:message}]
                        };
                    }else{return ele;}
                })
            })
            if(selected.socket!=sockett){
            const val=JSON.stringify({message,id_F:mine,id_T:selected.id});
            sockett.send(val);
            }
        }
    };
  return (
    <div style={{display:'flex',justifyContent:'space-around',gap:'30px'}}>
    <div>
        <h2>Online Users {usersMessages.length} <span className='bg-red-300 rounded-lg p-2'>ME:{number}</span></h2>
        <Online users={usersMessages} setS={setS} setMm={setMm}/>
    </div>
    <div className='flex-1 h-[70dvh]'>
    <div className='overflow-y-auto h-[65dvh] border-[2px] rounded-lg p-2 mb-2'>
        <h2 className='text-center font-semibold text-[20px] underline'>{selected?.number}</h2>
        {selected&&usersMessages.map((ele)=>{
        if(ele.info.socket==selected.socket){
            return ele.message.map((el,inde)=>{return <div key={inde}
                className="my-2 flex" 
            >
                <p className='p-2'>{el.me?"you:  ":''}</p>
                <p className='rounded-md p-2' style={{backgroundColor:(el.me)?'rgb(139 92 246)':'white'}}>{el.text}</p>
            </div>})
        }
    })}</div>
    <div  className='bottom-0 sticky flex  justify-center items-center gap-3'>
        
        <input
            className='w-full md:h-[100px] h-[50px] rounded-xl pl-3'
            value={message}
            onChange={handleC} 
            placeholder='enter text'   
        />
        <button 
            className='bg-violet-500 py-2 px-4 rounded-lg'
            disabled={sockett?false:true}
            onClick={handleClick}
            
        >Click</button>
    </div>
    </div>
    </div>
  )
}
export default Inputt