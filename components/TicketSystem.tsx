
import React, { useState, useEffect } from 'react';
import { 
  Plus, Search, CheckCircle2, Clock, AlertCircle, ChevronRight, X, 
  MessageSquare, ArrowLeft, Send, Printer, Smartphone,
  FileText
} from 'lucide-react';
import { ComplaintTicket, TicketStatus } from '../types';
import { WARD_MEMBER } from '../constants';

const TicketSystem: React.FC = () => {
  const [tickets, setTickets] = useState<ComplaintTicket[]>([]);
  const [activeView, setActiveView] = useState<'dashboard' | 'form' | 'receipt' | 'status_check' | 'detail'>('dashboard');
  const [selectedTicket, setSelectedTicket] = useState<ComplaintTicket | null>(null);
  const [lastCreatedTicket, setLastCreatedTicket] = useState<ComplaintTicket | null>(null);

  // Tracking Search States
  const [trackTicketId, setTrackTicketId] = useState('');
  const [trackPhone, setTrackPhone] = useState('');
  const [trackError, setTrackError] = useState('');

  // Form states
  const [formData, setFormData] = useState({
    residentName: '',
    phoneNumber: '',
    address: '',
    houseNumber: '',
    category: 'Street Light',
    subject: '',
    description: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem('ward17_complaints_v1');
    if (saved) {
      setTickets(JSON.parse(saved));
    } else {
      const initial: ComplaintTicket[] = [
        {
          id: 'CMP17-20240520-7721',
          residentName: 'Kishore Kumar',
          phoneNumber: '9847000111',
          address: 'Bengapadavu Jn',
          houseNumber: '17/452',
          category: 'Street Light',
          subject: 'Broken LED near Temple',
          description: 'The street light has been flickering for 3 days and is now completely out.',
          status: 'Resolved',
          priority: 'Medium',
          createdAt: '2024-05-10T10:00:00Z',
          updates: [
            { id: 'u1', date: '2024-05-10T10:00:00Z', message: 'Complaint registered successfully.', status: 'Submitted' },
            { id: 'u3', date: '2024-05-12T16:00:00Z', message: 'Issue resolved and verified.', status: 'Resolved' }
          ]
        }
      ];
      setTickets(initial);
      localStorage.setItem('ward17_complaints_v1', JSON.stringify(initial));
    }
  }, []);

  const saveTickets = (updated: ComplaintTicket[]) => {
    setTickets(updated);
    localStorage.setItem('ward17_complaints_v1', JSON.stringify(updated));
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randPart = Math.floor(1000 + Math.random() * 9000);
    const newId = `CMP17-${datePart}-${randPart}`;
    
    const newTicket: ComplaintTicket = {
      id: newId,
      ...formData,
      status: 'Submitted',
      priority: 'Medium',
      createdAt: new Date().toISOString(),
      updates: [{
        id: Math.random().toString(36),
        date: new Date().toISOString(),
        message: 'Your complaint has been registered. The ward member has been notified.',
        status: 'Submitted'
      }]
    };
    
    const updatedTickets = [newTicket, ...tickets];
    saveTickets(updatedTickets);
    setLastCreatedTicket(newTicket);
    setActiveView('receipt');
  };

  const handleTrackTicket = (e: React.FormEvent) => {
    e.preventDefault();
    setTrackError('');
    const found = tickets.find(t => 
      t.id.toLowerCase() === trackTicketId.trim().toLowerCase() && 
      t.phoneNumber === trackPhone.trim()
    );

    if (found) {
      setSelectedTicket(found);
      setActiveView('detail');
    } else {
      setTrackError('Incorrect ID or Phone Number.');
    }
  };

  const getStatusColor = (status: TicketStatus) => {
    switch (status) {
      case 'Submitted': return 'bg-blue-100 text-blue-700';
      case 'In Progress': return 'bg-amber-100 text-amber-700';
      case 'Resolved': return 'bg-emerald-100 text-emerald-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {activeView === 'dashboard' && (
        <div className="animate-fadeIn space-y-8">
          <header>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Complaint Desk</h2>
            <p className="text-gray-500 mt-2 font-medium">Easy registration and tracking for Ward 17 citizens.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button 
              onClick={() => setActiveView('form')}
              className="bg-emerald-600 p-8 rounded-[2.5rem] text-left text-white shadow-2xl shadow-emerald-900/20 hover:scale-[1.02] transition-transform"
            >
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <Plus size={32} />
              </div>
              <h3 className="text-2xl font-black">Register New</h3>
              <p className="text-emerald-100 text-sm mt-2 opacity-80">Report any issue in your locality</p>
            </button>

            <button 
              onClick={() => setActiveView('status_check')}
              className="bg-white p-8 rounded-[2.5rem] text-left border border-gray-100 shadow-xl shadow-gray-200/50 hover:scale-[1.02] transition-transform"
            >
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <Search size={32} />
              </div>
              <h3 className="text-2xl font-black text-gray-900">Track Status</h3>
              <p className="text-gray-500 text-sm mt-2 font-medium">Check progress using your ID</p>
            </button>
          </div>

          <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 flex items-start gap-4">
            <AlertCircle className="text-amber-600 mt-1 shrink-0" size={24} />
            <div className="text-sm">
              <p className="font-bold text-amber-900">Important Note</p>
              <p className="text-amber-800 leading-relaxed font-medium">Once submitted, your complaint is directly forwarded to the Ward Member. Please keep your Complaint ID safe for tracking.</p>
            </div>
          </div>
        </div>
      )}

      {/* COMPLAINT FORM */}
      {activeView === 'form' && (
        <div className="animate-fadeIn">
          <button onClick={() => setActiveView('dashboard')} className="flex items-center gap-2 text-emerald-600 font-black mb-8 px-4 py-2 hover:bg-emerald-50 rounded-xl transition-colors">
            <ArrowLeft size={20} /> Back
          </button>
          
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-gray-100">
            <div className="flex items-center gap-4 mb-10">
               <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl">
                 <FileText size={32} />
               </div>
               <h3 className="text-3xl font-black text-gray-900 tracking-tight">Registration</h3>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] px-1">Citizen Name</label>
                  <input required type="text" placeholder="Full name" className="w-full p-4 bg-gray-50 rounded-2xl border border-transparent focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold" value={formData.residentName} onChange={e => setFormData({...formData, residentName: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] px-1">Phone Number</label>
                  <input required type="tel" pattern="[0-9]{10}" placeholder="10-digit mobile" className="w-full p-4 bg-gray-50 rounded-2xl border border-transparent focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold" value={formData.phoneNumber} onChange={e => setFormData({...formData, phoneNumber: e.target.value})} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] px-1">Area / Locality</label>
                <input required type="text" placeholder="e.g. Near Primary Health Center" className="w-full p-4 bg-gray-50 rounded-2xl border border-transparent focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] px-1">Subject of Concern</label>
                <input required type="text" placeholder="What is the problem?" className="w-full p-4 bg-gray-50 rounded-2xl border border-transparent focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] px-1">Details</label>
                <textarea required rows={4} placeholder="Briefly describe the issue..." className="w-full p-4 bg-gray-50 rounded-2xl border border-transparent focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold resize-none" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
              </div>

              <button type="submit" className="w-full bg-emerald-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-emerald-200 hover:bg-emerald-700 transition-all flex items-center justify-center gap-3 text-lg">
                <Send size={24} /> Register Complaint
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TRACKING VIEW */}
      {activeView === 'status_check' && (
        <div className="animate-fadeIn">
          <button onClick={() => setActiveView('dashboard')} className="flex items-center gap-2 text-emerald-600 font-black mb-8 px-4 py-2 hover:bg-emerald-50 rounded-xl transition-colors">
            <ArrowLeft size={20} /> Back
          </button>

          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-gray-100 text-center">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
               <Search size={40} />
            </div>
            <h3 className="text-3xl font-black text-gray-900 tracking-tight mb-4">Track Status</h3>
            <p className="text-gray-500 font-bold mb-10 max-w-sm mx-auto">Enter your complaint details below to view the latest updates.</p>
            
            <form onSubmit={handleTrackTicket} className="space-y-6 max-w-md mx-auto">
              <input required type="text" placeholder="Complaint ID (CMP17-...)" className="w-full p-5 bg-gray-50 rounded-2xl border border-transparent focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-center uppercase tracking-widest font-mono" value={trackTicketId} onChange={e => setTrackTicketId(e.target.value)} />
              <input required type="tel" pattern="[0-9]{10}" placeholder="Registered Phone Number" className="w-full p-5 bg-gray-50 rounded-2xl border border-transparent focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-center" value={trackPhone} onChange={e => setTrackPhone(e.target.value)} />
              
              {trackError && <p className="text-red-600 font-bold text-sm bg-red-50 py-2 rounded-xl">{trackError}</p>}

              <button type="submit" className="w-full bg-emerald-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-emerald-200 hover:bg-emerald-700 transition-all flex items-center justify-center gap-3">
                Track Now <ChevronRight size={20} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* RECEIPT VIEW */}
      {activeView === 'receipt' && lastCreatedTicket && (
        <div className="animate-fadeIn text-center space-y-8">
           <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl border border-gray-100 max-w-xl mx-auto">
              <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 size={56} />
              </div>
              <h3 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Success!</h3>
              <p className="text-gray-500 font-bold mb-8">Your complaint has been filed.</p>
              
              <div className="bg-emerald-50 p-6 rounded-3xl border-2 border-dashed border-emerald-200 mb-8">
                 <p className="text-[10px] text-emerald-800 font-black uppercase tracking-widest mb-1">Your Complaint ID</p>
                 <p className="text-2xl font-mono font-black text-emerald-700 tracking-wider uppercase">{lastCreatedTicket.id}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-left mb-10">
                 <div>
                    <p className="text-[10px] text-gray-400 font-black uppercase mb-1">Date</p>
                    <p className="font-bold text-gray-800">{new Date().toLocaleDateString()}</p>
                 </div>
                 <div>
                    <p className="text-[10px] text-gray-400 font-black uppercase mb-1">Category</p>
                    <p className="font-bold text-gray-800">{lastCreatedTicket.category}</p>
                 </div>
              </div>

              <button onClick={() => setActiveView('dashboard')} className="w-full bg-gray-900 text-white font-black py-5 rounded-2xl hover:bg-black transition-all mb-4">
                Done
              </button>
              <button onClick={() => window.print()} className="w-full text-gray-500 font-bold py-3 flex items-center justify-center gap-2 hover:text-emerald-600 transition-colors">
                <Printer size={18} /> Print Receipt
              </button>
           </div>
        </div>
      )}

      {/* DETAIL VIEW */}
      {activeView === 'detail' && selectedTicket && (
        <div className="animate-fadeIn space-y-8">
          <button onClick={() => setActiveView('status_check')} className="flex items-center gap-2 text-emerald-600 font-black mb-4">
            <ArrowLeft size={20} /> New Search
          </button>

          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-gray-100">
             <div className="flex justify-between items-start mb-10 border-b border-gray-100 pb-8">
                <div>
                  <h3 className="text-3xl font-black text-gray-900 tracking-tight">{selectedTicket.subject}</h3>
                  <p className="text-emerald-600 font-mono font-bold mt-1 uppercase">{selectedTicket.id}</p>
                </div>
                <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${getStatusColor(selectedTicket.status)}`}>
                  {selectedTicket.status}
                </span>
             </div>

             <div className="space-y-10">
                <div className="bg-gray-50 p-6 rounded-3xl">
                   <h4 className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-3">Concern Details</h4>
                   <p className="text-gray-800 font-bold leading-relaxed">{selectedTicket.description}</p>
                </div>

                <div className="space-y-6">
                   <h4 className="text-xl font-black text-gray-900 flex items-center gap-2">
                     <Clock className="text-emerald-600" size={24} />
                     Progress Status
                   </h4>
                   <div className="space-y-6 relative before:content-[''] before:absolute before:left-4 before:top-2 before:bottom-2 before:w-1 before:bg-gray-100">
                      {selectedTicket.updates.slice().reverse().map((update, idx) => (
                        <div key={update.id} className="relative pl-12">
                           <div className={`absolute left-0 top-1 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center z-10 ${idx === 0 ? 'bg-emerald-500 shadow-lg' : 'bg-gray-200'}`}>
                             {idx === 0 && <div className="w-2 h-2 bg-white rounded-full"></div>}
                           </div>
                           <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm">
                              <div className="flex justify-between mb-1">
                                <span className="font-black text-gray-900 text-sm">{update.status}</span>
                                <span className="text-[10px] font-bold text-gray-400 uppercase">{new Date(update.date).toLocaleDateString()}</span>
                              </div>
                              <p className="text-sm text-gray-600 font-medium">{update.message}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketSystem;
