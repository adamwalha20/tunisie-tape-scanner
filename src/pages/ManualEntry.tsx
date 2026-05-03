import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { contactService, Contact, Note } from '../services/contactService';
import BottomNavBar from '../components/BottomNavBar';

export default function ManualEntry() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const prefill = location.state?.prefill || {};
  
  const [formData, setFormData] = useState({
    fullName: prefill.fullName || '',
    company: prefill.company || '',
    jobTitle: prefill.jobTitle || '',
    email: prefill.email || '',
    phone: prefill.phone || '',
    productInterest: '',
  });
  const source = prefill.source || 'MANUAL';
  
  const [quality, setQuality] = useState<'Hot' | 'Warm' | 'Cold' | ''>('');
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleTag = (tag: string) => {
    if (tags.includes(tag)) setTags(tags.filter(t => t !== tag));
    else setTags([...tags, tag]);
  };

  const handleSave = async () => {
    if (!formData.fullName) {
      alert("Name is required");
      return;
    }
    setLoading(true);
    try {
      const contact: Contact = {
        name: formData.fullName,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        source: source
      };

      const noteContext: Partial<Note> | undefined = { 
        priority: (quality as any) || 'Medium', 
        note_text: `Job Title: ${formData.jobTitle}\nProduct Interest: ${formData.productInterest}` 
      };
      
      const newContact = await contactService.createContact(contact, tags, noteContext);
      if (newContact && newContact.id) {
        navigate(`/contact/${newContact.id}`);
      } else {
        navigate('/leads');
      }
    } catch (err: any) {
      console.error(err);
      alert("Error saving contact: " + (err.message || "Unknown error"));
      setLoading(false);
    }
  };

  return (
    <div className="bg-bg-main text-text-main min-h-screen flex flex-col pt-14 pb-24 animate-fade-in">
      <header className="fixed top-0 left-0 w-full h-14 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-6 z-[60]">
        <button onClick={() => navigate(-1)} className="text-text-muted hover:text-primary transition-colors">
          <span className="material-symbols-outlined">close</span>
        </button>
        <span className="text-sm font-black tracking-tight text-text-main uppercase">Add Lead</span>
        <button 
          onClick={handleSave} 
          disabled={loading}
          className="text-primary font-bold text-sm disabled:opacity-50"
        >
          {loading ? '...' : 'Save'}
        </button>
      </header>

      <main className="flex-1 flex flex-col p-6 gap-8 w-full max-w-md mx-auto">
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-extrabold tracking-tight">Contact Info</h2>
          <div className="flex flex-col gap-3">
             <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors">person</span>
                <input 
                  type="text" 
                  placeholder="Full Name"
                  className="w-full h-14 pl-12 pr-4 glass-card border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-primary outline-none transition-all"
                  value={formData.fullName}
                  onChange={e => setFormData({...formData, fullName: e.target.value})}
                />
             </div>
             <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors">apartment</span>
                <input 
                  type="text" 
                  placeholder="Company"
                  className="w-full h-14 pl-12 pr-4 glass-card border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-primary outline-none transition-all"
                  value={formData.company}
                  onChange={e => setFormData({...formData, company: e.target.value})}
                />
             </div>
             <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors">mail</span>
                <input 
                  type="email" 
                  placeholder="Email"
                  className="w-full h-14 pl-12 pr-4 glass-card border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-primary outline-none transition-all"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
             </div>
             <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors">category</span>
                <input 
                  type="text" 
                  placeholder="Product Interested In"
                  className="w-full h-14 pl-12 pr-4 glass-card border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-primary outline-none transition-all"
                  value={formData.productInterest}
                  onChange={e => setFormData({...formData, productInterest: e.target.value})}
                />
             </div>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-extrabold tracking-tight">Lead Quality</h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'Hot', icon: 'local_fire_department', color: 'text-danger' },
              { id: 'Warm', icon: 'thermostat', color: 'text-accent' },
              { id: 'Cold', icon: 'ac_unit', color: 'text-primary' },
            ].map((q) => (
              <button 
                key={q.id}
                onClick={() => setQuality(q.id as any)}
                className={`p-4 glass-card flex flex-col items-center gap-2 border-2 transition-all ${
                  quality === q.id ? 'border-primary bg-primary/5 scale-105' : 'border-transparent'
                }`}
              >
                <span className={`material-symbols-outlined ${q.color}`}>{q.icon}</span>
                <span className="text-xs font-bold">{q.id}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-extrabold tracking-tight">Quick Tags</h2>
          <div className="flex flex-wrap gap-2">
            {['Interested', 'High Priority', 'Follow Up', 'Decision Maker'].map(tag => (
              <button 
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                  tags.includes(tag) ? 'bg-primary text-white border-primary' : 'bg-white text-text-muted border-slate-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </section>

        <button 
          onClick={handleSave} 
          disabled={loading}
          className="w-full h-14 bg-primary text-white rounded-2xl font-bold text-lg shadow-lg shadow-primary/20 premium-button mt-4"
        >
          {loading ? 'Saving Lead...' : 'Complete Entry'}
        </button>
      </main>
      
      <BottomNavBar />
    </div>
  );
}
