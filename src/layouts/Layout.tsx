import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Chatbot from '../components/Chatbot';

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-[#070C18] text-slate-100 font-sans antialiased overflow-x-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
      <Chatbot />
    </div>
  );
}
