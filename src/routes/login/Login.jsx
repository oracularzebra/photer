import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import { useNavigate } from "react-router-dom";

export default function Login(){

    const [user, setUser] = useState({email: null, password: null});
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [isNewUser, setIsNewUser] = useState(null);
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    function checkCredentials(){
        //TODO: Validate inputs 
        return true;
    };
    useEffect(()=>{
        if(isNewUser == true){
            //CREATING NEW USERS
            createUserWithEmailAndPassword(auth, user.email, user.password)
            .then((userCredential)=>{
            //Signed up
            const user = userCredential.user;
            navigate('home');
            })
            .catch((error)=>{
            const eCode=error.code;
            const eMessage=error.message;
            setMessage(eMessage);
            })
        }else if(isNewUser == false){
            //SIGNING IN EXISTING USER
            signInWithEmailAndPassword(auth, user.email, user.password)
            .then((userCredential)=>{
            //Signed up
            const user = userCredential.user;
            navigate('home');
            })
            .catch((error)=>{
            const eCode=error.code;
            const eMessage=error.message;
            setMessage(eMessage);
            });
        }else{
        }
    }, [user, isNewUser]);

    return (
        <form onSubmit={(e)=>{e.preventDefault(); }}>
            <label>Email: </label>
            <input type="email" max={10} onChange={(e)=>{setEmail(e.currentTarget.value)}} required/>
            <label>Password: </label>
            <input type="password" max={10} onChange={(e)=>{setPassword(e.currentTarget.value)}} required/>
            <label htmlFor="new-user">New User</label>
            <input type="radio" name="user-type" onClick={()=>{setIsNewUser(true)}} id="old-user"/>
            <label htmlFor="old-user">Old User</label>
            <input type="radio" name="user-type" onClick={()=>setIsNewUser(false)} id="new-user"/>
            <input type="submit" value="Submit" onClick={()=>{
                if(checkCredentials()){
                    setUser({email:email, password:password});
                }
            }}/>
            {message}
        </form>
    )
}