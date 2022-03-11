import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import EventoDetails from './Eventos/EventoDetails';

const Pages: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/deputados" element={<p>Deputados</p>} />
        <Route path="/deputados/:id" element={<p>Deputado detalhes</p>} />

        <Route path="/partidos" element={<p>Partidos</p>} />
        <Route path="/partidos/:id" element={<p>Partido detalhes</p>} />

        <Route path="/eventos" element={<p>Eventos</p>} />
        <Route path="/eventos/:id" element={<EventoDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Pages;
