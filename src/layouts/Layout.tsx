import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Chatbot from '../components/Chatbot';

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navigation />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <Chatbot />
    </div>
  );
}
