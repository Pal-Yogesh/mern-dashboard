import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";


// const URL = "http://localhost:5000/api/auth/login";
const Login = () => {
const [user,setUser] = useState({
    email:"",
    password:"",
});

const navigate = useNavigate();

const {storeTokenInLS} = useAuth();

const handleInput = (e) =>{
    let name = e.target.name;
    let value = e.target.value;

    setUser({
        ...user,
        [name]: value,
       
    });
};
const handleSubmit = async (e) => {
    e.preventDefault();
    // alert(user);

    try {
        const response = await fetch("http://localhost:5000/api/auth/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(user),
        });
        console.log("login form",response);

        const res_data = await response.json();
        if(response.ok){
            // alert("Login Successfull");

            //  // for getting the token or id of the user
            //  const res_data = await response.json();
            //  // this single line work for store the token in LS
            //  localStorage.setItem("token",res_data.token);
 
            
            storeTokenInLS(res_data.token);


            setUser({
                email:"",
                password:""
            });
            toast.success("Login Successful  Hurray 🥳");
            navigate("/");
        }
        else{
            toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            console.log("Invalid credentials");
        }
    } catch (error) {
        console.log("login", error);
        
    }
};

    return (
        <>
        <section>
            <main>
                <div className="section-registration">
                    <div className="container grid grid-two-cols">
                        <div className="registration-image">
                        <img src="/images/registers.png" alt="A Boy is trying to filling a Login form." 
                            width="500"
                            height="500"
                        />
                        </div>
                        <div className="registration-form">
                            <h1 className="main-heading mb-3">Login Now</h1>
                            <br />
                            <form onSubmit={handleSubmit}>
                            <div>
                                    <label htmlFor="email">email</label>
                                    <input type="email" name="email" placeholder="Enter Your Email" id="email" required autoComplete="off"
                                    value={user.email} onChange={handleInput}
                                     />
                                </div>



                                <div>
                                    <label htmlFor="password">password</label>
                                    <input type="password" name="password" placeholder="Enter Your Password" id="password" required autoComplete="off"
                                    value={user.password} onChange={handleInput}
                                    />
                                </div>
                                <br />
                                <button type="submit" className="btn btn-submit">login Now</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </section>
        </>
    );
};

export default Login;
