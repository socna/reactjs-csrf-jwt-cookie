import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"
import styles from "./User.module.css" 

import { useSelector, useDispatch } from 'react-redux';
import * as authActions from "../store/auth/actions";

const UserPage = () => {
    let { id } = useParams();

    const [csrf, setCSRF] = useState("")
    const [res, setRes] = useState("")

    const dispath = useDispatch();

    const fetchToken = async () => {
        let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTQyNDA4ODQsInVpZCI6MX0.N325Uo70Fft18bqxgP7wewNI1LtYWnBy1QSK0KN7GtM";
        dispath(authActions.verifyToken(token))
        // const instance = axios.create({
        //     timeout: 1000,
        // })

        // let credentials = {
        //     token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTQyNDA4ODQsInVpZCI6MX0.N325Uo70Fft18bqxgP7wewNI1LtYWnBy1QSK0KN7GtM"
        // }
        // try {

        //     const { data } = await instance.post(`/tokensignin`, credentials);
        //     setToken(data.Token)
        // } catch (err) {
        //     console.log(err)
        // }
    }
    const fetchDetails = async () => {
        // const instance = axios.create({
        //     timeout: 1000
        // })
        // try {

        //     const { data } = await instance.post(`/sp/threads`);
        //     setRes(JSON.stringify(data))
        // } catch (err) {
        //     console.log(err)
        // }
    }

    useEffect(() => {
        setCSRF(axios.defaults.headers.post['X-CSRF-Token'] )
    })
    return (
        <>
            <h1>csrf:</h1>
            <p><i>{csrf}</i></p>
            <h1>token:</h1>
            <p><i></i></p>
            <h1>response</h1>
            <p><i>{res}</i></p>

            <section className={styles.section}>
                <button onClick={() => fetchToken()} className={styles.btn}>
                    Signin
                </button>
                <button onClick={() => fetchDetails()}>
                    Get Details
                </button>
            </section>
        </>
    )
}

export default UserPage