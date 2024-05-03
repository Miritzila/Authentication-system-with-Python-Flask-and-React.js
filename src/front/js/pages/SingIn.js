import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const SingIn = () => {
    const BACKEND_URL = process.env.BACKEND_URL
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const [alertMessage, setAlertMessage] = useState("")

    const handleSignIn = async () => {

        try {
            const response = await fetch(`${BACKEND_URL}/api/sing_in`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const data = await response.json();
            if (data.token === undefined) {
                setAlertMessage(
                    <div className="alert alert-danger">
                        Usuario o contraseña incorrectos
                    </div>
                )
            }
            else {
                localStorage.setItem("token", data.token);
                navigate("/profile");
            }


        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSignIn();
    }

    return (
        <div className="text-center mt-5">
            <div className="container text-center">
                <div className="row">
                    <div className="col">
                    </div>
                    <div className="col-8">
                        <div className="card">
                            <br></br>
                            <h3 className="card-title">Accede a tu página personal</h3 >
                            <form onSubmit={handleSubmit}>
                                <div className="card-body">
                                    <div className="mb-3 row">
                                        <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email</label>
                                        <div className="col-sm-10">
                                            <input type="email" className="form-control" id="inputEmail" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Contraseña</label>
                                        <div className="col-sm-10">
                                            <input type="password" className="form-control" id="inputPassword" value={password} onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                    </div>
                                    {alertMessage}
                                    <button type="submit" className="btn btn-primary">
                                        Entrar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col">
                    </div>
                </div>
            </div>
        </div>
    );
};