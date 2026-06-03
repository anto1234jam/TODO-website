import { Routes, Route } from "react-router-dom";
import Login from "./login";
import Dashboard from "./dashboard";
import Signup from "./signup";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
