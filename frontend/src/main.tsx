import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./main.css";
import Login from "./views/Login";
import Home from "./views/Home";
import { getTokenFromCookie } from "./services/getTokenCookie";
import { api } from "./services/apiService";

const token = getTokenFromCookie();
if (token) {
	api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Router>
			<Routes>
				<Route path='/' element={<Login />} />
				<Route path='/home' element={<Home />} />
			</Routes>
		</Router>
	</StrictMode>
);
