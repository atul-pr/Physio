import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackendStatus from "./components/BackendStatus";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Exercises from "./pages/Exercises";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Appointment from "./pages/Appointment";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import DoctorAdmin from "./pages/DoctorAdmin";
import SliderAdmin from "./pages/SliderAdmin";
import SocialLinksAdmin from "./pages/SocialLinksAdmin";
import VideosAdmin from "./pages/VideosAdmin";
import ServiceDetail from "./pages/ServiceDetail";

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname === "/login" || location.pathname.startsWith("/admin");

  return (
    <div className="app">
      {!isAdminPage && <Navbar />}
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
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/doctor" element={<ProtectedRoute><DoctorAdmin /></ProtectedRoute>} />
            <Route path="/admin/slider" element={<ProtectedRoute><SliderAdmin /></ProtectedRoute>} />
            <Route path="/admin/social" element={<ProtectedRoute><SocialLinksAdmin /></ProtectedRoute>} />
            <Route path="/admin/videos" element={<ProtectedRoute><VideosAdmin /></ProtectedRoute>} />
          </Routes>
        </AnimatePresence>
      </main>
      {!isAdminPage && <Footer />}
      <BackendStatus />
    </div>
  );
}

export default App;
