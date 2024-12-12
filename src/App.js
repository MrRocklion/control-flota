import GpsPage from "./pages/GpsPage";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router";
import TransactionsPage from "./pages/TransactionsPage";
import CamerasPage from "./pages/CamerasPage";
import { Layout } from "./layout/layout";
function App() {
	return (
		<>
			<Layout>
						<Routes>
							<Route path="/" element={<HomePage />} />
							<Route path="/gps" element={<GpsPage />} />
							<Route path="/transactions" element={<TransactionsPage />} />
							<Route path="/cameras" element={<CamerasPage />} />
						</Routes>
			</Layout>
					

		</>


	);
}

export default App;
