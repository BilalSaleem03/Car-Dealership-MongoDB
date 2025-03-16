import { Children, useState } from "react"
import LoginContext from "./LoginContext.js"


export default function LoginContextProvider(probs){
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem("isLoggedIn");
    });
    const updateIsLoggedIn = (value) => {
        setIsLoggedIn(value);
        localStorage.setItem("isLoggedIn" , value)
    };

    return(
        <LoginContext.Provider value={{updateIsLoggedIn , isLoggedIn }}>
            {probs.children}
        </LoginContext.Provider>
    )
}