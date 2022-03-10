import { BrowserRouter, Route, Routes } from "react-router-dom";

const Pages: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<p>Home</p>} />
        <Route path="/deputados" element={<p>Dep</p>} />
        <Route path="/partidos" element={<p>Part</p>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Pages;
