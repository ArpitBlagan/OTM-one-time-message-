import { message } from "./Inputt"
interface child{
  users:message[],
  setS:any,
  setMm:any
}
const Online:React.FC<child> = ({users,setS,setMm}) => {
  return <div className=" overflow-y-auto my-2 bg-violet-400 rounded-lg w-[300px] flex flex-col justify-center">
      {users.map((ele,index)=>{
            return <div key={index} onClick={()=>{
                    setS({socket:ele.info.socket,number:ele.info.number,id:ele.id});
                    setMm((prev:any)=>{
                      return  prev.map((ee:message)=>{
                        if(ee.id==ele.id){
                            return {
                                ...ee,
                                new:false
                            };
                        }else{return ee;}
                    })
                    })
                }} 
                className="p-2 rounded-2xl shadow-xl text-center"
                style={{cursor:'pointer', margin:'5px'}}>
                <h1>{ele.info.number} <span className="text-[15px]">{ele.new?'*new*':''}</span></h1>
                <hr/>
            </div>
        })}
    </div>
}

export default Online