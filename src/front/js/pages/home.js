import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Bienvenido a la pagina web de registro</h1>
			<p>Aquí podrás tanto registrarte como acceder a tu cuenta ¿Cuál elegirás hoy?</p>
			<Link to="/sing_up" className="btn btn-primary btn-home">¡Regístrate!</Link>
			<Link to="/sing_in" className="btn btn-success btn-home">Accede a tu cuenta</Link>
		</div>
	);
};
