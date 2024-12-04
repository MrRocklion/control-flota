import GpsPage from "./pages/GpsPage";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router";
import TransactionsPage from "./pages/TransactionsPage";
import CamerasPage from "./pages/CamerasPage";
import SideBar from "./components/side-bar";
import { Stack } from "@mui/material";

function App() {
	return (
		<>
			<Stack direction="row" className="h-screen divide-x divide-slate-400/25">
				<SideBar />
				<div className="content-page h-screen w-full p-10 overflow-y-auto">
					<div>
						<Routes>
							<Route path="/" element={<HomePage />} />
							<Route path="/gps" element={<GpsPage />} />
							<Route path="/transactions" element={<TransactionsPage />} />
							<Route path="/cameras" element={<CamerasPage />} />
						</Routes>
					</div>
				</div>
			</Stack>

		</>


	);
}

export default App;
