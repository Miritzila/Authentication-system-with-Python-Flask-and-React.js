import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export const Profile = () => {
    const token = localStorage.getItem("token")
    const navigate = useNavigate();

    useEffect(() => {
        if (token === null) {
			navigate("/sing_in");
		}
		console.log(token)
    }, [token, navigate]);

	return (
		<div className="container">
			<br></br>
			<div className="row featurette">
				<div className="col-md-7">
					<h2 className="featurette-heading fw-normal lh-1">Bienvenido a tu página personal <span className="text-body-secondary">¡Lo has conseguido!</span></h2>
					<p className="lead">Un gaticornio te espera para celebrarlo</p>
				</div>
				<div className="col-md-5">
					<img src="https://i.pinimg.com/564x/bb/07/0a/bb070a10ad3ec246671413ba31f31427.jpg" alt="Unicornio" width="500" height="500" />
				</div>
			</div>
		</div>
	);
};
