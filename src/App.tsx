import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './layouts/Layout';
import Landing from './pages/Landing';
import MapView from './pages/Map';
import Alerts from './pages/Alerts';
import EmergencySOS from './pages/EmergencySOS';
import EvacuationRoute from './pages/EvacuationRoute';
import Resources from './pages/Resources';
import AIPriority from './pages/AIPriority';
import Analytics from './pages/Analytics';
import Recovery from './pages/Recovery';
import './i18n';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Landing />} />
            <Route path="dashboard" element={<Landing />} />
            <Route path="map" element={<MapView />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="emergency" element={<EmergencySOS />} />
            <Route path="evacuation" element={<EvacuationRoute />} />
            <Route path="resources" element={<Resources />} />
            <Route path="ai-priority" element={<AIPriority />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="recovery" element={<Recovery />} />
            {/* Fallback */}
            <Route path="*" element={<Landing />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
