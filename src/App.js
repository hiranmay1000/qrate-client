import "./App.css";
import { AuthContextProvider } from "./Contexts/AuthContext";
import Routes from "./Routes/Routes";

function App() {
	return (
		<div className="App">
			<AuthContextProvider>
				<Routes />
			</AuthContextProvider>
		</div>
	);
}
export default App;
