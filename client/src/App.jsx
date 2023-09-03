import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header";
import { auth } from "../../server/src/config/fireBase.config";
import CreateUser from "./pages/CreateUser";
import SignIn from "./pages/SignIn";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <>
        <Routes>
          <Route path="/signup" element={<CreateUser />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
