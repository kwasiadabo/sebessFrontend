import './App.css';
import GeneralSMS from './pages/GeneralSMS';
import LandingPage from './pages/LandingPage';
import ResultsSMS from './pages/ResultsSMS';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route exact path="/" element={<LandingPage />} />
					<Route path="/generalsms" element={<GeneralSMS />} />
					<Route path="/resultssms" element={<ResultsSMS />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
