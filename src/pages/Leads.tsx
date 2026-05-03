import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopAppBar from '../components/TopAppBar';
import BottomNavBar from '../components/BottomNavBar';
import { contactService, Contact } from '../services/contactService';

export default function Leads() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    contactService.getContacts()
      .then(data => {
        setContacts(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    (c.company && c.company.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="bg-bg-main text-text-main min-h-screen flex flex-col pt-14 pb-24 animate-fade-in">
      <TopAppBar />

      <main className="flex-1 flex flex-col p-6 gap-6 w-full max-w-md mx-auto">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-extrabold tracking-tight">Your Leads</h1>
          <p className="text-text-muted text-sm">Manage and follow up with your exhibition contacts.</p>
        </header>

        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">search</span>
          <input 
            type="text" 
            placeholder="Search leads..." 
            className="w-full h-12 pl-10 pr-4 glass-card border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-primary outline-none transition-all"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-3">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3 text-text-muted">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span>Loading leads...</span>
            </div>
          ) : filteredContacts.length > 0 ? (
            filteredContacts.map((contact, index) => (
              <div 
                key={contact.id} 
                onClick={() => navigate(`/contact/${contact.id}`)}
                className="glass-card p-4 flex items-center justify-between hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                    {contact.name.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold group-hover:text-primary transition-colors">{contact.name}</span>
                    <span className="text-xs text-text-muted">{contact.company || 'Private'}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-primary px-2 py-0.5 bg-primary/5 rounded-full">
                    {contact.source}
                  </span>
                  <span className="text-[10px] text-text-muted">
                    {new Date(contact.created_at || '').toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 glass-card flex flex-col items-center gap-4">
              <span className="material-symbols-outlined text-4xl text-slate-300">person_off</span>
              <p className="text-text-muted">No leads found matching your search.</p>
            </div>
          )}
        </div>
      </main>

      <BottomNavBar />
    </div>
  );
}
