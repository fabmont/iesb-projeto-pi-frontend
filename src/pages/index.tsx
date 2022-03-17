import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EventoDetails from './Eventos/EventoDetails';
import EventosDashboard from './Eventos/EventosDashboard';
import Home from './Home';
import PartidoDashboard from './Partidos/PartidoDashboard';
import PartidosDetails from './Partidos/PartidosDetails';

const Pages: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/deputados" element={<p>Deputados</p>} />
        <Route path="/deputados/:id" element={<p>Deputado detalhes</p>} />

        <Route path="/partidos" element={<PartidoDashboard />} />
        <Route path="/partidos/:id" element={<PartidosDetails />} />

        <Route path="/eventos" element={<EventosDashboard />} />
        <Route path="/eventos/:id" element={<EventoDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Pages;
