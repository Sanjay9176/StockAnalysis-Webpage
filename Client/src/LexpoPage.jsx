import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Pages/Home";
import Aboutus from "./Pages/Aboutus";
import Discovery from "./Pages/Discovery";
import Faq from "./Pages/Faq";
import LiveAnalysis from "./Pages/LiveAnalysis"
import OfflineAnalysis from "./Pages/OfflineAnalysis"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './ProtectedRoute';
export default function LexpoPage() {
  return (
    <>
      <Router >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/faq" element={<Faq />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/discovery" element={<Discovery />} />
            <Route path="/discovery/liveanalysis" element={<LiveAnalysis />} />
            <Route path="/discovery/offlineanalysis" element={<OfflineAnalysis />} />
          </Route>
        </Routes>
        <ToastContainer position="top-right" />
      </Router>
    </>
  )
}
