import { Link, useNavigate } from "react-router-dom";
import { checkAuth } from "../../firebase/firebase-config";

export default function Home(){

    checkAuth;
    const navigate = useNavigate();
       
    return (    
        <>
            <Link to='/old-uploads'>Old Uploads</Link>
            <br />
            <Link to='/insert-images'>Create New Catalog</Link>
        </>
    )
}