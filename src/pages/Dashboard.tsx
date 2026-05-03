import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopAppBar from '../components/TopAppBar';
import BottomNavBar from '../components/BottomNavBar';
import { contactService, Contact } from '../services/contactService';

export default function Dashboard() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    contactService.getContacts()
      .then(data => {
        setContacts(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const leadsToday = contacts.filter(c => {
    if (!c.created_at) return false;
    const today = new Date();
    const createdDate = new Date(c.created_at);
    return createdDate.getDate() === today.getDate() &&
      createdDate.getMonth() === today.getMonth() &&
      createdDate.getFullYear() === today.getFullYear();
  }).length;

  return (
    <div className="bg-bg-main text-text-main min-h-screen flex flex-col pt-14 pb-24 selection:bg-primary/20 antialiased animate-fade-in">
      <TopAppBar />

      <main className="flex-1 flex flex-col p-6 gap-8 w-full max-w-md mx-auto relative overflow-hidden">
        
        {/* Header Section */}
        <section className="flex flex-col gap-1">
          <h1 className="text-4xl font-black tracking-tight text-text-main">Hello, Scanner</h1>
          <p className="text-text-muted text-sm font-medium">Ready to capture some high-value leads?</p>
        </section>

        {/* Statistics Summary Cards */}
        <section className="grid grid-cols-2 gap-4">
          <div className="glass-card p-5 flex flex-col justify-between min-h-[120px] shadow-premium relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-full -mr-8 -mt-8" />
            <div className="flex items-center justify-between mb-2 text-primary">
              <span className="text-[10px] font-black uppercase tracking-widest">Leads Today</span>
              <span className="material-symbols-outlined text-[20px]">trending_up</span>
            </div>
            <div className="text-4xl font-extrabold text-text-main">{leadsToday}</div>
          </div>
          <div className="glass-card p-5 flex flex-col justify-between min-h-[120px] shadow-premium relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-secondary/5 rounded-full -mr-8 -mt-8" />
            <div className="flex items-center justify-between mb-2 text-secondary">
              <span className="text-[10px] font-black uppercase tracking-widest">Total Leads</span>
              <span className="material-symbols-outlined text-[20px]">groups</span>
            </div>
            <div className="text-4xl font-extrabold text-text-main">{contacts.length}</div>
          </div>
        </section>

        {/* Recent Leads List */}
        <section className="flex flex-col gap-4">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-xl font-bold tracking-tight">Recent Leads</h2>
            <button onClick={() => navigate('/leads')} className="text-xs font-bold text-primary hover:underline">View All</button>
          </div>
          
          <div className="flex flex-col gap-3">
            {loading ? (
              <div className="text-center py-8 glass-card text-text-muted flex flex-col items-center gap-2">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span>Syncing contacts...</span>
              </div>
            ) : contacts.length > 0 ? (
              contacts.slice(0, 3).map((contact, index) => (
                <div 
                  key={contact.id} 
                  onClick={() => navigate(`/contact/${contact.id}`)} 
                  className="glass-card p-4 flex items-center justify-between hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-primary">
                       <span className="material-symbols-outlined">person</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold group-hover:text-primary transition-colors">{contact.name}</span>
                      <span className="text-[11px] font-medium text-text-muted">{contact.company || 'Private Contact'}</span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-slate-300">chevron_right</span>
                </div>
              ))
            ) : (
              <div className="text-center py-10 glass-card flex flex-col items-center gap-3">
                <span className="material-symbols-outlined text-4xl text-slate-200">contact_page</span>
                <p className="text-xs text-text-muted font-medium">Your lead list is empty.</p>
              </div>
            )}
          </div>
        </section>

        {/* Primary Actions Grid */}
        <section className="mt-4 grid grid-cols-2 gap-4">
          <button onClick={() => navigate('/scan/card')} className="bg-primary text-white p-4 rounded-2xl flex flex-col items-center gap-2 shadow-lg shadow-primary/20 premium-button active:scale-95 group">
            <span className="material-symbols-outlined text-[28px] group-hover:scale-110 transition-transform">document_scanner</span>
            <span className="text-[10px] font-black uppercase tracking-widest">Business Card</span>
          </button>
          <button onClick={() => navigate('/scan/qr')} className="glass-card p-4 rounded-2xl flex flex-col items-center gap-2 premium-button active:scale-95 group">
            <span className="material-symbols-outlined text-[28px] group-hover:scale-110 transition-transform text-primary">qr_code_scanner</span>
            <span className="text-[10px] font-black uppercase tracking-widest">QR Code</span>
          </button>
        </section>
        
        <button onClick={() => navigate('/manual')} className="w-full glass-card h-14 rounded-2xl border-dashed border-2 border-slate-200 flex items-center justify-center gap-3 text-text-muted hover:border-primary hover:text-primary transition-all premium-button">
          <span className="material-symbols-outlined">add_circle</span>
          <span className="text-sm font-bold">Manual Entry</span>
        </button>
      </main>

      <BottomNavBar />
    </div>
  );
}
