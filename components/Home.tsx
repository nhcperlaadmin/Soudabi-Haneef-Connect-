
import React from 'react';
import { NEWS, WARD_MEMBER } from '../constants';
import { 
  ArrowRight, 
  MessageSquare, 
  ClipboardList, 
  Calendar, 
  Phone, 
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Welcome Banner */}
      <section className="bg-emerald-900 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block px-4 py-1.5 bg-emerald-800 text-emerald-300 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            Official Ward Portal
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight tracking-tight">
            Bengapadavu <br/><span className="text-emerald-400">Ward 17</span>
          </h2>
          <p className="text-emerald-100/80 text-lg mb-8 leading-relaxed">
            Direct access to ward member services, welfare schemes, and local updates.
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href={`https://wa.me/${WARD_MEMBER.whatsapp.replace(/\s+/g, '')}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-3"
            >
              <MessageSquare size={20} fill="currentColor" /> Chat on WhatsApp
            </a>
          </div>
        </div>
        {/* Decorative background circle */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-800/30 rounded-full blur-3xl"></div>
      </section>

      {/* Quick Action Hub */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-900 px-2">Quick Services</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <Link to="/complaints" className="group bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all text-center flex flex-col items-center gap-3">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <MessageSquare size={28} />
            </div>
            <span className="font-bold text-gray-800">Register Complaint</span>
          </Link>

          <Link to="/schemes" className="group bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all text-center flex flex-col items-center gap-3">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <ClipboardList size={28} />
            </div>
            <span className="font-bold text-gray-800">Welfare Schemes</span>
          </Link>

          <Link to="/events" className="group bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all text-center flex flex-col items-center gap-3">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Calendar size={28} />
            </div>
            <span className="font-bold text-gray-800">Ward Events</span>
          </Link>

          <Link to="/contact" className="group bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all text-center flex flex-col items-center gap-3">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Phone size={28} />
            </div>
            <span className="font-bold text-gray-800">Contact Office</span>
          </Link>
        </div>
      </section>

      {/* Grid: Latest News & Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-gray-900">Ward News</h3>
            <button className="text-emerald-600 font-bold text-sm flex items-center gap-1 hover:underline">
              View All <ArrowRight size={16} />
            </button>
          </div>
          <div className="space-y-4">
            {NEWS.slice(0, 2).map((item) => (
              <div key={item.id} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-5 hover:bg-emerald-50/30 transition-colors group">
                <img src={item.image} alt="" className="w-24 h-24 rounded-2xl object-cover shrink-0" />
                <div className="flex-1">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.date}</span>
                  <h4 className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors leading-snug">{item.title}</h4>
                  <p className="text-gray-500 text-sm line-clamp-1 mt-1">{item.content}</p>
                </div>
                <ArrowRight className="text-gray-300 group-hover:text-emerald-600" size={20} />
              </div>
            ))}
          </div>
        </div>

        {/* Status Card */}
        <div className="bg-white p-8 rounded-[2rem] border border-emerald-100 shadow-lg shadow-emerald-50 self-start">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
              <CheckCircle size={24} />
            </div>
            <h4 className="font-bold text-gray-900">Ward Status</h4>
          </div>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 font-medium">Power Supply</span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wide">Normal</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 font-medium">Water Distribution</span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wide">Regular</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 font-medium">Road Maintenance</span>
              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full uppercase tracking-wide">Active</span>
            </div>
            <div className="pt-4 border-t border-gray-100">
               <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">Panchayath Link</p>
               <a href="#" className="text-emerald-600 text-sm font-bold flex items-center gap-1 hover:underline">
                 Enmakaje GP Website <ExternalLink size={14} />
               </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
