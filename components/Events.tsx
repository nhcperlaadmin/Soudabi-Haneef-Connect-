
import React from 'react';
import { EVENTS } from '../constants';
import { Calendar, MapPin, Clock, Download, Share2 } from 'lucide-react';

const Events: React.FC = () => {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl font-extrabold text-gray-900">Ward Events</h2>
        <p className="text-gray-500 mt-2">Stay updated on inaugurations, meetings, and cultural programs in Bengapadavu.</p>
      </header>

      <div className="space-y-6">
        {EVENTS.map((event) => (
          <div key={event.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col md:flex-row">
            {/* Date Badge Side */}
            <div className="bg-emerald-900 text-white p-6 md:w-48 flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-black">{new Date(event.date).getDate()}</span>
              <span className="text-sm font-bold uppercase tracking-widest opacity-80">
                {new Date(event.date).toLocaleString('default', { month: 'short' })}
              </span>
              <div className="mt-4 px-3 py-1 bg-emerald-800 rounded-full text-[10px] font-bold">
                {event.type}
              </div>
            </div>

            {/* Content Side */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-6">{event.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock size={16} className="text-emerald-600" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin size={16} className="text-emerald-600" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 flex gap-4">
                <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-emerald-700 transition-colors">
                  <Download size={18} /> Invitation
                </button>
                <button className="bg-emerald-50 text-emerald-600 p-2 rounded-lg hover:bg-emerald-100 transition-colors">
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex items-start gap-4">
        <div className="p-3 bg-blue-100 rounded-xl text-blue-700">
          <Calendar size={24} />
        </div>
        <div>
          <h4 className="font-bold text-blue-900">Request a Ward Meeting</h4>
          <p className="text-blue-700 text-sm mt-1">If your neighborhood has a specific concern that needs a public discussion, you can request a local gathering.</p>
          <button className="mt-4 text-blue-700 font-bold text-sm underline hover:text-blue-900">Contact Office</button>
        </div>
      </div>
    </div>
  );
};

export default Events;
