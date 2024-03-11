import React, { useContext, useState  } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const SingIn = () => {

    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('https://jubilant-palm-tree-wr7wj6jww4q4fg6p5-3001.app.github.dev/api/sing_in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Error:', data.error);
            } else {
                console.log('Success:', data);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
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