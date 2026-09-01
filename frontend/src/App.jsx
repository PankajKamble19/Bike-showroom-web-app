import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import Home from "./pages/Home";
import BikeDetails from "./pages/BikeDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import InquiryForm from "./pages/InquiryForm";
import Accessories from "./pages/Accessories";
import RidingGear from "./pages/RidingGear";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <Cart />
          <Routes>
            <Route path="/"                element={<Home />} />
            <Route path="/bikes/:id"       element={<BikeDetails />} />
            <Route path="/login"           element={<Login />} />
            <Route path="/signup"          element={<Signup />} />
            <Route path="/dashboard"       element={<AdminDashboard />} />
            <Route path="/inquiry/:bikeId" element={<InquiryForm />} />
            <Route path="/accessories"     element={<Accessories />} />
            <Route path="/gear"            element={<RidingGear />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}