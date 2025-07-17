import React from "react";
import { Routes , Route } from "react-router";
import Homepage from "../pages/Home/Homepage.jsx";
import CompressPage from "../pages/Compress/CompressPage.jsx";
import ResizePage from "../pages/Resize/ResizePage.jsx";
import CropPageNew from "../pages/Crop/CropPageNew.jsx";
import LoginPage from "../pages/Auth/LoginPage.jsx";
import Dashboard from "../pages/Dashboard/Dashboard.jsx";
import GalleryPage from "../pages/Gallery/GalleryPage.jsx";

export default function RouteElements() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} exact />
      <Route path="/compress" element={<CompressPage />} />
      <Route path="/resize" element={<ResizePage />} />
      <Route path="/crop" element={<CropPageNew />} />
      <Route path="/login" element={<LoginPage />} />
      {/* Protected User Routes */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/gallery/:id" element={<GalleryPage />} />
    </Routes>
  );
}
