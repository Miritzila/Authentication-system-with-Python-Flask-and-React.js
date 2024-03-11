import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Pagina web de registro</span>
				</Link>
				<div className="ml-auto">
					<Link to="/sing_up" className="btn btn-primary btn-home">¡Regístrate!</Link>
					<Link to="/sing_in" className="btn btn-success btn-home">Accede a tu cuenta</Link>
				</div>
			</div>
		</nav>
	);
};
