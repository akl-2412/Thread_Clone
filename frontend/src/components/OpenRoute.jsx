import {Navigate}  from "react-router-dom"
import userAtom from "../atoms/userAtom";
import { useRecoilState } from "recoil";
function OpenRoute({children}){
    const [user, setUser] = useRecoilState(userAtom);
    console.log(user);
    if(user==null){
        return children;
    }
    else{
        return <Navigate to={"/"} />
    }
}


export default OpenRoute;