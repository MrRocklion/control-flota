import GpsPage from "./pages/GpsPage";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router";
import TransactionsPage from "./pages/TransactionsPage";
import CamerasPage from "./pages/CamerasPage";
import { Layout } from "./layout/layout";
import DespachosPage from "./pages/operaciones/DespachosPage";
import IntinerariosPage from "./pages/operaciones/IntinerariosPage";
import RutasPage from "./pages/operaciones/RutasPage";
import VehiculosPage from "./pages/administracion/VehiculosPage";
import PersonalPage from "./pages/administracion/PersonalPage";
import VehiculosAdminPage from "./pages/administracion/VehiculoAdminPage";
function App() {
	return (
		<>
			<Layout>
						<Routes>
							<Route path="/" element={<HomePage />} />
							<Route path="/gps" element={<GpsPage />} />
							<Route path="/transactions" element={<TransactionsPage />} />
							<Route path="/cameras" element={<CamerasPage />} />
							<Route path="/operations/despachos" element={<DespachosPage />} />
							<Route path="/operations/intinerarios" element={<IntinerariosPage />} />
							<Route path="/operations/rutas" element={<RutasPage />} />
							<Route path="/administracion/vehiculos" element={<VehiculosPage />} />
							<Route path="/administracion/vehiculos/:id" element={<VehiculosAdminPage />} />
							<Route path="/administracion/socios" element={<PersonalPage />} />
						</Routes>
			</Layout>
					

		</>


	);
}

export default App;
