import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Newsbanner from "./components/Newsbanner";
import Home from "./pages/Home"

function App() {
  return (
    <BrowserRouter>
    <div className="fixed z-50 w-full">
      <Newsbanner />
      <Navbar />
    </div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;