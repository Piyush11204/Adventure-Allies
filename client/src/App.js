import { Route, Routes, Navigate } from "react-router-dom";

import Signup from "./Pages/Singup";
import Login from "./Pages/Login";
import Home from "./Pages/Home/Home";
import Addlocation from "./Pages/Addlocation/Addlocation";

function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			<Route path="/Home" element={<Home />} />
			<Route path="/addlocation" element={<Addlocation />} />
			
			{user && <Route path="/" exact element={<Home />} />}
			<Route path="/Signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
		</Routes>
	);
}

export default App;
