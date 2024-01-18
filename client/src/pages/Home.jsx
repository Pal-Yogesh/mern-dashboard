import "../index.css";
const Home = () => {
    return (
        <>
        <main>
            <section>
                <div className="container grid grid-two-cols">
                    <div className="hero-content">
                        <p>Hello I am</p>
                        <h1>Yogesh Pal</h1>
                        <p>A final year Computer Science Engineering student at GLA University with an interest in Coding, and Web Development. Seeking an internship to apply my experience assisting a company Cloud based/Front End Project.
                        </p>
                        <div className="btn btn-group">
                            <a href="/contact">
                                <button className="btn">Connect Now</button>
                            </a>
                            <a href="/services">
                                <button className="btn secondary-btn">Learn More</button>
                            </a>
                        </div>
                    </div>

                    {/* hero images */}

                    <div className="hero-image">
                        <img src="/images/register.jpg" alt="Coding Together" width="200" height="300" />
                    </div>

                </div>
            </section>
        </main>

        <section className="section-analytics">
            <div className="conatainer grid grid-four-cols">
                <div className="div1">
                    <h2>50+</h2>
                    <p>Registered Comapanies</p>
                </div>
                <div className="div1">
                    <h2>5100,00+</h2>
                    <p>Happy Clients</p>
                </div>
                <div className="div1">
                    <h2>500+</h2>
                    <p>Well Known Developers</p>
                </div>
                <div className="div1">
                    <h2>24/7</h2>
                    <p>Services</p>
                </div>
            </div>
        </section>


        {/* 3rd section */}

        <section>
                <div className="container grid gird-two-cols">

                    
                    {/* hero images */}

                    <div className="hero-image">
                        <img src="/images/register.jpg" alt="Coding Together" width="200" height="300" />
                    </div>


                    <div className="hero-content">
                        <p>Hello I am</p>
                        <h1>Yogesh Pal</h1>
                        <p>A final year Computer Science Engineering student at GLA University with an interest in Coding, and Web Development. Seeking an internship to apply my experience assisting a company Cloud based/Front End Project.
                        </p>
                        <div className="btn btn-group">
                            <a href="/contact">
                                <button className="btn">Connect Now</button>
                            </a>
                            <a href="/services">
                                <button className="btn secondary-btn">Learn More</button>
                            </a>
                        </div>
                    </div>


                </div>
            </section>
        </>
    );
};

export default Home;
