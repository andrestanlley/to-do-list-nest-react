import Home from "@/views/Home";
import Login from "@/views/Login";
import Register from "@/views/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function AppRouter() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Login />} />
				<Route path='/home' element={<Home />} />
				<Route path='/register' element={<Register />} />
			</Routes>
		</Router>
	);
}
