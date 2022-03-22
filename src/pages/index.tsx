import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import EventoDetails from './Eventos/EventoDetails';
import EventosDashboard from './Eventos/EventosDashboard';
import PartidoDashboard from './Partidos/PartidoDashboard';
import PartidosDetails from './Partidos/PartidosDetails';
import DeputadosDashboard from './Deputados/DeputadosDashboard';
import DeputadosDetails from './Deputados/DeputadosDetails';

const Pages: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/eventos" element={<EventosDashboard />} />
        <Route path="/eventos/:id" element={<EventoDetails />} />

        <Route path="/partidos" element={<PartidoDashboard />} />
        <Route path="/partidos/:id" element={<PartidosDetails />} />

        <Route path="/deputados" element={<DeputadosDashboard />} />
        <Route path="/deputados/:id" element={<DeputadosDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Pages;
