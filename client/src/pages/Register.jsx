import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const Register = () => {

    const [user, setUser] = useState({
        username:"",
        email:"",
        phone:"",
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
        console.log(user);
        try {
            
        const response = await fetch(`http://localhost:5000/api/auth/register`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(user),
        });

        // console.log(response);
        const res_data = await response.json();
        console.log("Response from Server", res_data.extraDetails);

        if(response.ok){

            // for getting the token or id of the user
            
            // store token in the localhost
            storeTokenInLS(res_data.token);



            setUser( 
            {username:"",
            email:"",
            phone:"",
            password:""});
        toast.success("Registration Successful");

            navigate("/");
        }
        else{
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
        }
        
    } catch (error) {
            console.log("register", error);
    }
    };



    return (
        <>
        <section>
            <main>
                <div className="section-registration">
                    <div className="container grid grid-two-cols">
                        <div className="registration-image">
                            <img src="/images/registers.png" alt="A Boy is trying to filling a Registration form." 
                            width="500"
                            height="500"
                            />
                        </div>
                        {/* Lets Tackle the registration form */}

                        <div className="registration-form">
                            <h1 className="main-heading mb-3">Registration Form</h1>
                            <br />
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="username">username</label>
                                    <input type="text" name="username" placeholder="Enter Your Username" id="username" required autoComplete="off" 
                                    value={user.username} onChange={handleInput}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email">email</label>
                                    <input type="email" name="email" placeholder="Enter Your Email" id="email" required autoComplete="off"
                                    value={user.email} onChange={handleInput}
                                     />
                                </div>

                                <div>
                                    <label htmlFor="phone">phone</label>
                                    <input type="number" name="phone" placeholder="Enter Your Phone" id="phone" required autoComplete="off" 
                                    value={user.phone} onChange={handleInput}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password">password</label>
                                    <input type="password" name="password" placeholder="Enter Your Password" id="password" required autoComplete="off"
                                    value={user.password} onChange={handleInput}
                                    />
                                </div>
                                <br />
                                <button type="submit" className="btn btn-submit">Register Now</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </section>
        </>
    );
};

export default Register;
