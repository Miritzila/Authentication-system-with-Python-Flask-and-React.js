import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Profile = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<br></br>
			<div class="row featurette">
				<div class="col-md-7">
					<h2 class="featurette-heading fw-normal lh-1">Bienvenido a tu página personal <span class="text-body-secondary">¡Lo has conseguido!</span></h2>
					<p class="lead">Un gaticornio te espera para celebrarlo</p>
				</div>
				<div class="col-md-5">
					<img src="https://i.pinimg.com/564x/bb/07/0a/bb070a10ad3ec246671413ba31f31427.jpg" alt="Unicornio" width="500" height="500" />
				</div>
			</div>
		</div>
	);
};
