import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
const First = () => {
    const [number,setN]=useState<string>("");
    const navigate=useNavigate();
    const handleC=(event:React.ChangeEvent<HTMLInputElement>)=>{
        setN(event.target.value);
    }
    const handleClick=(event:React.MouseEvent<HTMLButtonElement>)=>{
        event.preventDefault();
        if(number!=""){
            const id=uuidv4();
            navigate("/home",{state:{number,id}});
        }
        else{alert("Please enter the number first");}
    }
  return (
    <div>
        <div><h3>Please Enter Your Phone Number</h3>
        <input placeholder='enter your number...' 
            type="string"
            value={number}
            onChange={handleC}
            style={{height:"50px",width:'100%'}}
        />
        <button 
            style={{backgroundColor:"lightblue", marginTop:'12px'}}
            onClick={handleClick}
        >
            Enter
        </button></div>
        <div>
            <p>This App all about One time messages.</p>
            <p>Where user can create groups chat with other online users.</p>
            <p>Good part is this that the these messages are not getting store any where 😁.</p>
        </div>
    </div>
  )
}

export default First