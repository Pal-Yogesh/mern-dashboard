import { useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const defaultContactFormData = {
    username:"",
    email:"",
    message:"",
};
const Contact = () => {

    const [contact, setContact] = useState(defaultContactFormData);

// for contact
    const [userData, setUserData] = useState(true);

    const { user } = useAuth();

    if(userData && user){
        setContact({
            username:user.username,
            email:user.email,
            message:"",
        });

        setUserData(false);
    }

    
    const handleInput = (e) =>{
        let name = e.target.name;
        let value = e.target.value;

        setContact({
            ...contact,
            [name]: value,
           
        });
        // any of the method can be used 
        // setContact((prev) =>{
        //     ...contact,
        //     [name]: value,
        // });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // alert(contact);

        try {
            const response = await fetch("http://localhost:5000/api/form/contact",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(contact),
            });
            console.log("contact form",response);

            if(response.ok){
                setContact(defaultContactFormData);
                const data = await response.json();
                console.log(data);
                toast.success("Hurray 🥳 Message send successfully");
            }
        } catch (error) {
            console.log("conatact",error);
        }
    };



    return (
        <>
        <section>
            <main>
                <div className="section-registration">
                    <h1>Contact Us</h1>
                    <div className="container grid grid-two-cols">
                        <div className="registration-image">
                            <img src="/images/registers.png" alt="A Boy is trying to filling a Contact form." 
                            width="500"
                            height="500"
                            />
                        </div>
                        {/* Lets Tackle the registration form */}

                        <div className="registration-form">
                            
                            <form onSubmit={handleSubmit}>
                                
                                <div>
                                    <label htmlFor="username">username</label>
                                    <input type="text" name="username" placeholder="Enter Your Username" id="username" required autoComplete="off" 
                                    value={contact.username} onChange={handleInput}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email">email</label>
                                    <input type="email" name="email" placeholder="Enter Your Email" id="email" required autoComplete="off"
                                    value={contact.email} onChange={handleInput}
                                     />
                                </div>
                                <div>
                                    <label htmlFor="message">Message</label>
                                    <textarea name="message" id="message" cols="20" rows="5"  placeholder="Enter Your message"  required autoComplete="off"
                                    value={contact.message} onChange={handleInput} >

                                    </textarea>
                                                                      
                                </div>
                                <button type="submit" className="btn btn-submit">Contact Now</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </section>
        </>
    );
};

export default Contact;

