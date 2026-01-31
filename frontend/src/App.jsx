import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackendStatus from "./components/BackendStatus";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Exercises from "./pages/Exercises";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Appointment from "./pages/Appointment";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import DoctorAdmin from "./pages/DoctorAdmin";
import ServiceDetail from "./pages/ServiceDetail";

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/doctor" element={<DoctorAdmin />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <BackendStatus />
    </div>
  );
}

export default App;
