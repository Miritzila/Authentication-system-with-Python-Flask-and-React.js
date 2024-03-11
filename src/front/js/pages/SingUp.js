import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const SingUp = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      validateForm();

      const bodyData = {
        email,
        password,
        password_confirmation: passwordConfirmation,
      };

      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      };

      const response = await fetch(
        "https://jubilant-palm-tree-wr7wj6jww4q4fg6p5-3001.app.github.dev/api/sing_up",
        options
      );

      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }

      const data = await response.json();
      handleSuccess(data); // Manejar el éxito de la solicitud
    } catch (err) {
      console.error(err);
      setErrorMessage("No hemos conseguido registrar tu cuenta");
    }
  };

  const validateForm = () => {
    if (!email || !password || !passwordConfirmation) {
      throw new Error("Por favor, complete todos los campos.");
    }

    if (password !== passwordConfirmation) {
      throw new Error("Las contraseñas no coinciden.");
    }
  };

  const handleSuccess = (data) => {
    alert("Te has registrado con éxito.");
    window.location.href = "/home";
  };

  return (
    <div className="text-center mt-5">
      <div className="container text-center">
        <div className="row">
          <div className="col"></div>
          <div className="col-8">
            <div className="card">
              <br></br>
              <h3 className="card-title">Completa el formulario de registro</h3>
              <form onSubmit={handleSubmit}>
                <div className="card-body">
                  {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                      {errorMessage}
                    </div>
                  )}
                  <div className="mb-3 row">
                    <label htmlFor="inputEmail" className="col-sm-2 col-form-label">
                      Email
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="email"
                        className="form-control"
                        id="inputEmail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
                      Contraseña
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="password"
                        className="form-control"
                        id="inputPassword"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label htmlFor="inputPasswordConfirmation" className="col-sm-2 col-form-label">
                      Confirma la contraseña
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="password"
                        className="form-control"
                        id="inputPasswordConfirmation"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Registrarse
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col"></div>
        </div>
      </div>
    </div>
  );
};
