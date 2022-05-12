import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"

const UserPage = () => {
    let { id } = useParams();

    const [csrf, setCSRF] = useState("")
    const [token, setToken] = useState("")
    const [res, setRes] = useState("")

    const fetchToken = async () => {
        const instance = axios.create({
            timeout: 1000,
        })

        let credentials = {
            username: "chauhm"
        }
        try {

            const { data } = await instance.post(`/api/token`, credentials);
            setToken(data.Token)
        } catch (err) {
            console.log(err)
        }
    }
    const fetchDetails = async () => {
        const instance = axios.create({
            timeout: 1000
        })
        try {

            const { data } = await instance.post(`/api/secure/user/${id}`);
            setRes(JSON.stringify(data))
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        setCSRF(axios.defaults.headers.post['X-CSRF-Token'] )
    })
    return (
        <>
            <h1>csrf:</h1>
            <p><i>{csrf}</i></p>
            <h1>token:</h1>
            <p><i>{token}</i></p>
            <h1>response</h1>
            <p><i>{res}</i></p>

            <section>
                <button onClick={() => fetchToken()}>
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