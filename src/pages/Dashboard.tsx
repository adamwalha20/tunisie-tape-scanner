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
    <div className="bg-background text-on-background font-body-md text-body-md min-h-screen flex flex-col pt-14 pb-24 selection:bg-primary-fixed selection:text-on-primary-fixed antialiased">
      <TopAppBar />

      {/* Main Canvas */}
      <main className="flex-1 flex flex-col p-edge-margin gap-lg w-full max-w-md mx-auto relative overflow-hidden">
        
        {/* Statistics Summary Card (Bento Layout) */}
        <section className="grid grid-cols-2 gap-sm">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col justify-between min-h-[100px] shadow-sm">
            <div className="flex items-center justify-between mb-sm text-on-surface-variant">
              <span className="font-status text-status uppercase tracking-wider">Leads Today</span>
              <span className="material-symbols-outlined text-[20px]">group</span>
            </div>
            <div className="font-display text-display text-on-surface">{leadsToday}</div>
          </div>
          <div className="bg-surface-container-low border border-outline-variant rounded-xl p-md flex flex-col justify-between min-h-[100px] shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-secondary-container"></div>
            <div className="flex items-center justify-between mb-sm text-on-surface-variant pl-xs">
              <span className="font-status text-status uppercase tracking-wider">Pending Sync</span>
              <span className="material-symbols-outlined text-[20px] text-tertiary-container">cloud_upload</span>
            </div>
            <div className="font-display text-display text-on-surface pl-xs">0</div>
          </div>
        </section>

        {/* Recent Leads List */}
        <section className="flex flex-col gap-sm flex-1">
          <div className="flex justify-between items-end mb-xs">
            <h2 className="font-h2 text-h2 text-on-surface">Recent Leads</h2>
            <button className="font-status text-status text-primary hover:opacity-80 transition-opacity">View All</button>
          </div>
          
          <div className="flex flex-col gap-unit">
            {loading ? (
              <div className="text-center py-4">Loading leads...</div>
            ) : contacts.slice(0, 5).map(contact => (
              <div key={contact.id} onClick={() => navigate(`/contact/${contact.id}`)} className="bg-surface-container-lowest border border-outline-variant rounded-lg p-md flex items-center justify-between min-h-touch-target-min hover:bg-surface-container transition-colors cursor-pointer group">
                <div className="flex flex-col">
                  <div className="flex items-center gap-xs">
                    <span className="font-body-lg text-body-lg font-bold text-on-surface group-hover:text-primary transition-colors">{contact.name}</span>
                    <span className="px-2 py-0.5 rounded-full bg-secondary/10 text-secondary font-label-caps text-label-caps text-[10px]">Synced</span>
                  </div>
                  <span className="font-body-md text-body-md text-on-surface-variant">{contact.company || 'No Company'}</span>
                </div>
                <div className="flex items-center gap-sm">
                  <span className="font-label-caps text-label-caps text-outline">
                    {new Date(contact.created_at || '').toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <button aria-label="Quick Action" className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-variant transition-colors">
                    <span className="material-symbols-outlined text-[20px]">more_vert</span>
                  </button>
                </div>
              </div>
            ))}
            {!loading && contacts.length === 0 && (
              <div className="text-center text-outline py-4">No leads captured yet.</div>
            )}
          </div>
        </section>

        {/* Large Bottom-Weighted Primary Action Area */}
        <section className="mt-auto flex flex-col gap-sm pt-md border-t border-outline-variant/30">
          <div className="grid grid-cols-2 gap-sm">
            <button onClick={() => navigate('/scan/card')} className="bg-primary text-on-primary h-[56px] rounded-lg flex flex-col items-center justify-center gap-xs hover:opacity-90 active:scale-95 transition-all shadow-sm">
              <span className="material-symbols-outlined text-[20px]">document_scanner</span>
              <span className="font-status text-status leading-none">Business Card</span>
            </button>
            <button onClick={() => navigate('/scan/qr')} className="bg-surface-container-highest text-on-surface h-[56px] rounded-lg border border-outline-variant flex flex-col items-center justify-center gap-xs hover:bg-surface-variant active:scale-95 transition-all">
              <span className="material-symbols-outlined text-[20px]">qr_code_scanner</span>
              <span className="font-status text-status leading-none">QR Code</span>
            </button>
          </div>
          <button onClick={() => navigate('/add-manual')} className="w-full bg-transparent text-primary h-touch-target-min rounded-lg border border-primary flex items-center justify-center gap-sm hover:bg-primary/5 active:scale-[0.98] transition-all">
            <span className="material-symbols-outlined text-[20px]">person_add</span>
            <span className="font-status text-status">Add Manual Lead</span>
          </button>
        </section>
      </main>

      <BottomNavBar />
    </div>
  );
}
