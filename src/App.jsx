import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AppLayout from "./layouts/AppLayout";
import MainLayout from "./layouts/MainLayout";
import Home from "./Components/Home/Home";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./Components/ProtectedRoute"; // Импорт компонента защиты маршрутов
import Details from "./Components/Details/Details";
import PaymentHistory from "./Components/PaymentHistory/PaymentHistory";
import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import Orders from "./Components/Dashboard/components/Orders/Orders";
import Box from "./Components/Dashboard/components/Box/Box";
import Benefit from "./Components/Dashboard/components/Benefit/Benefit";
import OrderBox from "./Components/Dashboard/components/OrderBox/OrderBox";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<AppLayout />}>
          <Route
            element={
              // <ProtectedRoute>
                <AdminLayout />
              //  </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/order" element={<Orders/>} />
            <Route path="/benefits" element={<Benefit/>} />
            <Route path="/box" element={<Box/>} />
            <Route path="/orderbox" element={<OrderBox/>} />



          </Route>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/details" element={<Details/>} />
            <Route path="/paymenthistory" element={<PaymentHistory/>} />



          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
