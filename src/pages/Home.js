import React  from "react";
import { Link } from "react-router-dom";

import styles from "./Home.module.css" 
const HomePage = () => {
    return(
        <div className="container">
            <h1>Home</h1>
            <p className={styles.home}>
                <Link to={"/10"}>User page</Link>
            </p>
        </div>
    )
}

export default HomePage