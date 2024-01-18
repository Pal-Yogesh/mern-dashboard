import { NavLink } from "react-router-dom";

const Error = () =>{
    return(
        <>
        <section id="error-page">
            <div className="content">
                <h2 className="header">404</h2>
                <h4>Sorry! Page Not Found</h4>
                <p>OOPS! It seems like the page you are trying to access dose not exist.
                    If you believe there is an issue, feel free to report it,
                    and we will look into it.
                </p>
                <div className="btns">
                    <NavLink to="/">Return Home</NavLink>
                    <NavLink to="/contact">Report Problem</NavLink>

                </div>
            </div>
        </section>
        </>
    );
};

export default Error;