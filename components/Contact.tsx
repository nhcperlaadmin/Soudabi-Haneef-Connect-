
import React from 'react';
import { WARD_MEMBER } from '../constants';
import { Phone, Mail, MessageCircle, HelpCircle } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <header>
        <h2 className="text-3xl font-extrabold text-gray-900">Contact Us</h2>
        <p className="text-gray-500 mt-2">Connect with your ward member and local administration.</p>
      </header>

      <div className="space-y-8">
        {/* Contact Information */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Ward Member Office</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-700">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Phone</p>
                    <p className="text-lg font-bold text-gray-900">{WARD_MEMBER.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-700">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">WhatsApp</p>
                    <p className="text-lg font-bold text-gray-900">{WARD_MEMBER.whatsapp}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-700">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email</p>
                    <p className="text-lg font-bold text-gray-900">{WARD_MEMBER.email}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Design element */}
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-emerald-50 rounded-tl-full opacity-50"></div>
          </div>

          <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100">
             <div className="flex items-center gap-3 mb-4">
                <HelpCircle className="text-amber-600" />
                <h4 className="font-bold text-amber-900">Office Hours</h4>
             </div>
             <p className="text-amber-800 text-sm">Mon - Sat: 10:00 AM - 05:00 PM</p>
             <p className="text-amber-800 text-sm">Sun: Closed (Emergency only)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
