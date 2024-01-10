import React,{useState, useEffect, useRef, useCallback} from 'react'

const Practice = () => {
    const kk=useRef<any|null>(null);
    const [curr,setCurr]=useState(0);
    useEffect(()=>{
        kk.current?.focus();
    },[]);

    const handleClick=useCallback((event:React.MouseEvent<HTMLButtonElement> )=>{
        event.preventDefault();
        console.log("clickedd..")
        setCurr((prev)=>{return prev+1});
    },[]);   
  return (
    <div>
        <input ref={kk}/>
        {curr}
        <Cool hand={handleClick}/>
    </div>
  )
}
interface ChildComponentProps {
    hand: (event:React.MouseEvent<HTMLButtonElement>) => void; 
  }
const Cool: React.FC<ChildComponentProps>=React.memo(({hand})=>{
    console.log("re-rendered")
    return <div>
            <button onClick={hand}>Click</button>
        </div>
})
export default Practice