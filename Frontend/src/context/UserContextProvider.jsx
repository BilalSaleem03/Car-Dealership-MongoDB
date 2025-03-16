import { Children, useState } from "react"
import UserContext from "./UserContext"


export default function UserContextProvider(probs){

    // let [loggedInUser , setLoggedInUser] = useState("bilala");

    const [loggedInUser, setLoggedInUser] = useState(() => {
        return localStorage.getItem("loggedInUser");
    });

    const updateUser = (user) => {
        setLoggedInUser(user);
        localStorage.setItem("loggedInUser", user);
    };

    return(
        <UserContext.Provider value={{loggedInUser , updateUser}}>
            {probs.children}
        </UserContext.Provider>
    )
}