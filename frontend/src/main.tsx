import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./main.css";
import Login from "./views/Login";
import Home from "./views/Home";
import Register from "./views/Register";
import { Toaster } from "@/components/ui/sonner";
import updateTokenFromCookies from "./services/getTokenCookie";

updateTokenFromCookies();
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Toaster />
		<Router>
			<Routes>
				<Route path='/' element={<Login />} />
				<Route path='/home' element={<Home />} />
				<Route path='/register' element={<Register />} />
			</Routes>
		</Router>
	</StrictMode>
);
