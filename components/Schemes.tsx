
import React, { useState } from 'react';
import { SCHEMES } from '../constants';
import { Search, Filter, ChevronRight, Bookmark } from 'lucide-react';

const Schemes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const categories = ['All', 'Agriculture', 'Education', 'Housing', 'Social Welfare'];

  const filteredSchemes = SCHEMES.filter(scheme => {
    const matchesSearch = scheme.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'All' || scheme.category === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl font-extrabold text-gray-900">Welfare Schemes</h2>
        <p className="text-gray-500 mt-2">Find and apply for government benefits available for Ward 17 residents.</p>
      </header>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search schemes..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                activeTab === cat
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-emerald-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSchemes.length > 0 ? (
          filteredSchemes.map((scheme) => (
            <div key={scheme.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase rounded-full tracking-wider">
                  {scheme.category}
                </span>
                <button className="text-gray-300 hover:text-emerald-500 transition-colors">
                  <Bookmark size={20} />
                </button>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">{scheme.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{scheme.description}</p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Eligibility</h4>
                <p className="text-gray-700 text-sm">{scheme.eligibility}</p>
              </div>

              <button className="w-full bg-emerald-50 text-emerald-700 font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-100 transition-colors">
                View Details & Apply <ChevronRight size={18} />
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <Search size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-700">No schemes found</h3>
            <p className="text-gray-500">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Schemes;
