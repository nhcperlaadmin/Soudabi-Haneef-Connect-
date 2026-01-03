
import React from 'react';
import { Home, ClipboardList, Calendar, Phone, MessageSquare } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { label: 'Home', icon: Home, path: '/' },
    { label: 'Complaints', icon: MessageSquare, path: '/complaints' },
    { label: 'Schemes', icon: ClipboardList, path: '/schemes' },
    { label: 'Events', icon: Calendar, path: '/events' },
    { label: 'Contact', icon: Phone, path: '/contact' },
  ];

  return (
    <div className="min-h-screen pb-24 md:pb-0 md:pl-72">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 bg-emerald-950 text-white fixed h-full left-0 top-0 shadow-2xl z-40">
        <div className="p-8 border-b border-white/10">
          <h1 className="text-2xl font-black tracking-tight text-emerald-400">BENGAPADAVU</h1>
          <p className="text-emerald-100/50 text-xs font-bold uppercase tracking-[0.2em] mt-1">Ward 17 • Enmakaje</p>
        </div>
        
        <nav className="flex-1 p-6 space-y-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50 translate-x-1' 
                    : 'hover:bg-white/5 text-emerald-100/70 hover:text-white'
                }`}
              >
                <Icon size={22} />
                <span className="font-bold">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-8">
          <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
            <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest mb-2">Help Desk</p>
            <p className="text-sm font-bold text-white mb-3">Enquiries? Contact the office.</p>
            <Link to="/contact" className="text-xs bg-emerald-600 py-2 px-4 rounded-lg font-bold block text-center">Contact Now</Link>
          </div>
        </div>
      </aside>

      {/* Mobile Top App Bar */}
      <header className="md:hidden bg-emerald-950 text-white p-6 sticky top-0 z-50 shadow-xl flex justify-between items-center border-b border-white/5">
        <div>
          <h1 className="text-xl font-black tracking-tight">Bengapadavu</h1>
          <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest">Ward 17 Portal</p>
        </div>
        <Link to="/contact" className="bg-emerald-800 p-2.5 rounded-xl shadow-inner">
            <Phone size={20} className="text-emerald-400" />
        </Link>
      </header>

      {/* Main Content Area */}
      <main className="p-6 md:p-12 max-w-7xl mx-auto min-h-screen">
        {children}
      </main>

      {/* Bottom Navigation for Mobile */}
      <nav className="md:hidden fixed bottom-6 left-6 right-6 bg-white/90 backdrop-blur-xl border border-gray-200 flex justify-around p-3 z-50 rounded-[2rem] shadow-2xl">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center p-2 transition-all duration-300 ${
                isActive ? 'text-emerald-700 scale-110' : 'text-gray-400'
              }`}
            >
              <div className={`p-2 rounded-xl ${isActive ? 'bg-emerald-50' : ''}`}>
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[9px] mt-1 font-black uppercase tracking-tighter ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Layout;
