
import { useAuth } from "../store/auth";

const About = () => {

    const { user } = useAuth();

    

    
    return (
        <>
        <p>
             {user ?  `Welcome, ${user.username}` : "" }
        </p>
        <h1>Hello this is the About page.</h1>
        </>
    );
};

export default About;
