import Header from "./includes/Header.js";
import "../styles/App.css";
import {BrowserRouter as Router} from "react-router-dom";
import RouterComponent from "./includes/RouterComponent";

function App() {
    return (
        <Router>
            <Header/>
            <RouterComponent/>
        </Router>
    );
}

export default App;
