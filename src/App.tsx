import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./modules/home/pages/home";
import Trade from "./modules/trade/pages/trade";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trade/:id" element={<Trade />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
