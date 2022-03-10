import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';

const Pages: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/deputados" element={<p>Dep</p>} />
        <Route path="/partidos" element={<p>Part</p>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Pages;
