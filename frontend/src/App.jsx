import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { AdminDashboard } from "./pages/Admin";
import { Favorites } from "./pages/Favorites";
import { Toaster } from "react-hot-toast";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        ></Route>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
}
export default App;
