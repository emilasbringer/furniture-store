import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Newsbanner from "./components/Newsbanner";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Product from "./pages/Product";

function App() {
  return (
    <BrowserRouter>
      <div className="fixed z-50 w-full">
        <Newsbanner />
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog/:category" element={<Catalog />} />
        <Route path="/product/:id" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;