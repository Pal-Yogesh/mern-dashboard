import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({children}) =>{


    const [token, setToken] =useState(localStorage.getItem("token"));

    const [user, setUser] = useState("");

    const [services, setServices] = useState("");


    const storeTokenInLS = (servertoken) =>{
        setToken(servertoken);
        return localStorage.setItem("token", servertoken);
    };


    let isLoggedIn = !!token;

    // tackling the logout functionalities
    const LogoutUser = ()=>{
        setToken("");
        return localStorage.removeItem("token");
    };



// JWT AUTHENTICATION - to get the currently loggedin user data
    
    const userAuthentication = async() => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/user",{
                method:"GET",
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            });
            if(response.ok){
                const data = await response.json();
                console.log("user data", data.userData);
                setUser(data.userData);

            }
        } catch (error) {
            console.log("Error fetching user data");
        }
    };
// to fetch the services database from the databse
    const getServices = async() =>{
        try {
            const response = await fetch("http://localhost:5000/api/data/service",{
                method:"GET",
            });
            if(response.ok){
                const data = await response.json();
                console.log(data.msg);
                setServices(data.msg);
            }
        } catch (error) {
            console.log(`services frontend error: ${error}`);
        }
    }



    useEffect(()=>{
        getServices();
        userAuthentication();
    },[]);


    return (<AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, user, services}}>
        {children}
    </AuthContext.Provider>);
};

export default AuthContext;


// we are creating a custom hook

export const useAuth = () =>{
    const authContextValue = useContext(AuthContext);
    if(!authContextValue){
        throw new Error("useAuth used outside the Provider");
    }
    return authContextValue;
}

