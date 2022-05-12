import React  from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
    return(
        <div className="container">
            <h1>Home</h1>
            <p>
                <Link to={"/10"}>User page</Link>
            </p>
        </div>
    )
}

export default HomePage