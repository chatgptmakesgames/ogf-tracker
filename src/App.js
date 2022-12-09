import "./App.css";
import Map from "./components/Map";
import Navbar from "./components/Navbar";

function App() {
	return (
		// <div className="App">
		//   <header className="App-header">
		//     <img src={logo} className="App-logo" alt="logo" />
		//     <p>
		//       Edit <code>src/App.js</code> and save sddsto reload.
		//     </p>
		//     <a
		//       className="App-link"
		//       href="https://reactjs.org"
		//       target="_blank"
		//       rel="noopener noreferrer"
		//     >
		//       Learn Readsscts
		//     </a>

		//   </header>

		// </div>
		<>
			<Navbar />
			<Map />
		</>
	);
}

export default App;
