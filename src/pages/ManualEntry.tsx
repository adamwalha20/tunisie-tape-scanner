import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { contactService, Contact, Note } from '../services/contactService';

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

      const noteContext: Partial<Note> | undefined = quality ? { priority: quality, note_text: `Job Title: ${formData.jobTitle}` } : { note_text: `Job Title: ${formData.jobTitle}` };
      
      const newContact = await contactService.createContact(contact, tags, noteContext);
      navigate(`/contact/${newContact.id}`);
    } catch (err: any) {
      alert("Error saving contact: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="antialiased font-body-md text-body-md flex flex-col min-h-screen bg-background text-on-background">
      {/* TopAppBar */}
      <header className="bg-white dark:bg-slate-950 text-blue-600 dark:text-blue-400 font-['Inter'] font-bold text-lg tracking-tight docked full-width top-0 border-b-2 border-green-500 border-b border-slate-100 dark:border-slate-800 flat no-shadows flex justify-between items-center w-full px-5 h-14 max-w-full sticky z-50">
        <button onClick={() => navigate(-1)} aria-label="Cancel" className="text-blue-600 dark:text-blue-400 active:opacity-70 transition-all flex items-center justify-center w-touch-target-min h-touch-target-min -ml-2">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>close</span>
        </button>
        <div className="text-blue-600 dark:text-blue-400 font-black tracking-tighter truncate px-2">
            Manual Entry
        </div>
        <button onClick={handleSave} aria-label="Save" className="text-blue-600 dark:text-blue-400 active:opacity-70 transition-all flex items-center justify-center w-touch-target-min h-touch-target-min -mr-2 font-status text-status font-bold">
            {loading ? 'Saving...' : 'Save'}
        </button>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow px-edge-margin py-md pb-[100px] overflow-y-auto">
        {/* Form Section */}
        <section className="flex flex-col gap-sm mb-xl">
          {/* Full Name */}
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-sm pointer-events-none">
              <span className="material-symbols-outlined text-outline-variant text-[20px]">person</span>
            </div>
            <input 
              className="block w-full h-[56px] pl-[40px] pr-sm pt-[18px] pb-[6px] bg-surface-container-lowest border border-outline-variant rounded-DEFAULT text-on-surface focus:ring-0 focus:border-primary focus:border-l-[2px] transition-colors peer" 
              id="fullName" placeholder=" " type="text"
              value={formData.fullName}
              onChange={e => setFormData({...formData, fullName: e.target.value})}
            />
            <label className="absolute text-status font-status text-outline duration-300 transform -translate-y-[12px] scale-[0.85] top-[14px] z-10 origin-[0] left-[40px] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-[0.85] peer-focus:-translate-y-[12px] peer-focus:text-primary" htmlFor="fullName">Full Name</label>
          </div>
          
          {/* Company */}
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-sm pointer-events-none">
              <span className="material-symbols-outlined text-outline-variant text-[20px]">apartment</span>
            </div>
            <input 
              className="block w-full h-[56px] pl-[40px] pr-sm pt-[18px] pb-[6px] bg-surface-container-lowest border border-outline-variant rounded-DEFAULT text-on-surface focus:ring-0 focus:border-primary focus:border-l-[2px] transition-colors peer" 
              id="company" placeholder=" " type="text"
              value={formData.company}
              onChange={e => setFormData({...formData, company: e.target.value})}
            />
            <label className="absolute text-status font-status text-outline duration-300 transform -translate-y-[12px] scale-[0.85] top-[14px] z-10 origin-[0] left-[40px] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-[0.85] peer-focus:-translate-y-[12px] peer-focus:text-primary" htmlFor="company">Company</label>
          </div>
          
          {/* Job Title */}
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-sm pointer-events-none">
              <span className="material-symbols-outlined text-outline-variant text-[20px]">badge</span>
            </div>
            <input 
              className="block w-full h-[56px] pl-[40px] pr-sm pt-[18px] pb-[6px] bg-surface-container-lowest border border-outline-variant rounded-DEFAULT text-on-surface focus:ring-0 focus:border-primary focus:border-l-[2px] transition-colors peer" 
              id="jobTitle" placeholder=" " type="text"
              value={formData.jobTitle}
              onChange={e => setFormData({...formData, jobTitle: e.target.value})}
            />
            <label className="absolute text-status font-status text-outline duration-300 transform -translate-y-[12px] scale-[0.85] top-[14px] z-10 origin-[0] left-[40px] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-[0.85] peer-focus:-translate-y-[12px] peer-focus:text-primary" htmlFor="jobTitle">Job Title</label>
          </div>
          
          {/* Smart Suggestions */}
          <div className="flex flex-wrap gap-xs px-unit mb-unit">
            <button onClick={() => setFormData({...formData, company: 'Acme Corp'})} className="bg-surface-container-low border border-outline-variant rounded-full px-md py-xs text-status font-status text-on-surface-variant active:bg-surface-variant transition-colors h-[32px] flex items-center">Acme Corp</button>
            <button onClick={() => setFormData({...formData, company: 'Global Tech'})} className="bg-surface-container-low border border-outline-variant rounded-full px-md py-xs text-status font-status text-on-surface-variant active:bg-surface-variant transition-colors h-[32px] flex items-center">Global Tech</button>
            <button onClick={() => setFormData({...formData, jobTitle: 'Director'})} className="bg-surface-container-low border border-outline-variant rounded-full px-md py-xs text-status font-status text-on-surface-variant active:bg-surface-variant transition-colors h-[32px] flex items-center">Director</button>
          </div>
          
          {/* Email */}
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-sm pointer-events-none">
              <span className="material-symbols-outlined text-outline-variant text-[20px]">mail</span>
            </div>
            <input 
              className="block w-full h-[56px] pl-[40px] pr-sm pt-[18px] pb-[6px] bg-surface-container-lowest border border-outline-variant rounded-DEFAULT text-on-surface focus:ring-0 focus:border-primary focus:border-l-[2px] transition-colors peer" 
              id="email" placeholder=" " type="email"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
            <label className="absolute text-status font-status text-outline duration-300 transform -translate-y-[12px] scale-[0.85] top-[14px] z-10 origin-[0] left-[40px] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-[0.85] peer-focus:-translate-y-[12px] peer-focus:text-primary" htmlFor="email">Email Address</label>
          </div>
          
          {/* Phone */}
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-sm pointer-events-none">
              <span className="material-symbols-outlined text-outline-variant text-[20px]">phone</span>
            </div>
            <input 
              className="block w-full h-[56px] pl-[40px] pr-sm pt-[18px] pb-[6px] bg-surface-container-lowest border border-outline-variant rounded-DEFAULT text-on-surface focus:ring-0 focus:border-primary focus:border-l-[2px] transition-colors peer" 
              id="phone" placeholder=" " type="tel"
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
            />
            <label className="absolute text-status font-status text-outline duration-300 transform -translate-y-[12px] scale-[0.85] top-[14px] z-10 origin-[0] left-[40px] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-[0.85] peer-focus:-translate-y-[12px] peer-focus:text-primary" htmlFor="phone">Phone Number</label>
          </div>
        </section>

        {/* Lead Quality Selector */}
        <section className="mb-xl">
          <h3 className="font-h2 text-h2 text-on-surface mb-md">Lead Quality</h3>
          <div className="grid grid-cols-3 gap-sm">
            <button 
              onClick={() => setQuality('Hot')}
              className={`h-touch-target-min rounded-DEFAULT font-status text-status flex flex-col items-center justify-center transition-colors ${
                quality === 'Hot' ? 'bg-error-container border-2 border-error text-on-error-container font-bold' : 'bg-surface-container-lowest border border-outline-variant text-on-surface-variant active:bg-surface-variant'
              }`}
            >
              <span className="material-symbols-outlined text-[20px] mb-[2px]" style={{ fontVariationSettings: quality === 'Hot' ? "'FILL' 1" : "" }}>local_fire_department</span>
              Hot
            </button>
            <button 
              onClick={() => setQuality('Warm')}
              className={`h-touch-target-min rounded-DEFAULT font-status text-status flex flex-col items-center justify-center transition-colors ${
                quality === 'Warm' ? 'bg-primary-container border-2 border-primary text-on-primary-container font-bold' : 'bg-surface-container-lowest border border-outline-variant text-on-surface-variant active:bg-surface-variant'
              }`}
            >
              <span className="material-symbols-outlined text-[20px] mb-[2px]">thermostat</span>
              Warm
            </button>
            <button 
              onClick={() => setQuality('Cold')}
              className={`h-touch-target-min rounded-DEFAULT font-status text-status flex flex-col items-center justify-center transition-colors ${
                quality === 'Cold' ? 'bg-primary-container border-2 border-primary text-on-primary-container font-bold' : 'bg-surface-container-lowest border border-outline-variant text-on-surface-variant active:bg-surface-variant'
              }`}
            >
              <span className="material-symbols-outlined text-[20px] mb-[2px]">ac_unit</span>
              Cold
            </button>
          </div>
        </section>

        {/* Quick Tags */}
        <section className="mb-xl">
          <h3 className="font-h2 text-h2 text-on-surface mb-md">Quick Tags</h3>
          <div className="flex flex-wrap gap-sm">
            {['Product A', 'Follow-up', 'High Priority'].map(tag => (
              <button 
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`h-touch-target-min px-lg rounded-full font-status text-status flex items-center gap-xs transition-colors border ${
                  tags.includes(tag) ? 'bg-primary-container text-on-primary-container border-primary-container font-bold' : 'bg-surface-container-lowest text-on-surface border-outline-variant active:bg-surface-variant'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: tags.includes(tag) ? "'FILL' 1" : "" }}>
                  {tags.includes(tag) ? 'check_circle' : 'add'}
                </span>
                {tag}
              </button>
            ))}
            <button aria-label="Add custom tag" className="h-touch-target-min w-touch-target-min rounded-full bg-surface-container border border-outline border-dashed text-on-surface-variant flex items-center justify-center active:bg-surface-variant transition-colors">
              <span className="material-symbols-outlined">edit</span>
            </button>
          </div>
        </section>
      </main>

      {/* Bottom Action Area (Sticky) */}
      <div className="fixed bottom-0 left-0 w-full p-edge-margin bg-white/95 backdrop-blur-sm border-t border-slate-200 dark:border-slate-800 z-40">
        <button onClick={handleSave} disabled={loading} className="w-full h-[56px] bg-primary text-on-primary font-h2 text-h2 rounded-DEFAULT active:scale-[0.98] transition-transform flex items-center justify-center gap-sm shadow-sm">
          <span className="material-symbols-outlined">save</span>
          {loading ? 'Saving...' : 'Save Contact'}
        </button>
      </div>
    </div>
  );
}
