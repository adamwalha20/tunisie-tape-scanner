import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { contactService } from '../services/contactService';

export default function ContactDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [leadData, setLeadData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      contactService.getContact(id)
        .then(data => {
          setLeadData(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Load failed:", err);
          setError("Failed to load contact details.");
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-bg-main">
       <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
  
  if (!leadData) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg-main gap-4">
       <span className="material-symbols-outlined text-6xl text-danger">error</span>
       <h2 className="text-xl font-bold">Contact Not Found</h2>
       <button onClick={() => navigate('/leads')} className="text-primary font-bold">Return to Leads</button>
    </div>
  );

  return (
    <div className="bg-bg-main text-text-main min-h-screen flex flex-col pt-14 animate-fade-in">
      <header className="fixed top-0 left-0 w-full h-14 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-6 z-[60]">
        <button onClick={() => navigate(-1)} className="text-text-muted hover:text-primary transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <span className="text-sm font-black tracking-tight text-text-main uppercase">Lead Details</span>
        <button 
          onClick={() => {
            const note = leadData?.notes?.[0];
            let jobTitle = '';
            let productInterest = '';
            if (note?.note_text) {
              const jobMatch = note.note_text.match(/Job Title: (.*?)\n/);
              const prodMatch = note.note_text.match(/Product Interest: (.*)/);
              jobTitle = jobMatch ? jobMatch[1] : '';
              productInterest = prodMatch ? prodMatch[1] : '';
            }
            
            navigate('/manual', { state: {
              editId: leadData.id,
              prefill: {
                fullName: leadData.name,
                company: leadData.company,
                email: leadData.email,
                phone: leadData.phone,
                jobTitle: jobTitle,
                productInterest: productInterest,
                source: leadData.source
              },
              initialQuality: note?.priority || '',
              initialTags: leadData.tags?.map((t: any) => t.tag) || []
            }});
          }}
          className="text-primary font-bold text-sm"
        >
          Edit
        </button>
      </header>

      <main className="flex-1 flex flex-col p-6 gap-8 w-full max-w-md mx-auto">
        {/* Profile Header */}
        <section className="flex flex-col items-center gap-4 py-4">
           <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center text-primary relative">
              <span className="material-symbols-outlined text-5xl">person</span>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-secondary text-white rounded-xl flex items-center justify-center shadow-lg border-2 border-white">
                 <span className="material-symbols-outlined text-sm">verified</span>
              </div>
           </div>
           <div className="text-center">
              <h1 className="text-3xl font-black tracking-tight">{leadData.name}</h1>
              <p className="text-text-muted font-bold text-sm uppercase tracking-widest">{leadData.company || 'Private'}</p>
           </div>
        </section>

        {/* Action Grid */}
        <section className="grid grid-cols-3 gap-3">
           <a href={`tel:${leadData.phone}`} className="glass-card p-4 flex flex-col items-center gap-2 hover:bg-primary/5 transition-all">
              <span className="material-symbols-outlined text-primary">call</span>
              <span className="text-[10px] font-black uppercase tracking-widest">Call</span>
           </a>
           <a href={`mailto:${leadData.email}`} className="glass-card p-4 flex flex-col items-center gap-2 hover:bg-primary/5 transition-all">
              <span className="material-symbols-outlined text-primary">mail</span>
              <span className="text-[10px] font-black uppercase tracking-widest">Email</span>
           </a>
           <button className="glass-card p-4 flex flex-col items-center gap-2 hover:bg-primary/5 transition-all">
              <span className="material-symbols-outlined text-primary">share</span>
              <span className="text-[10px] font-black uppercase tracking-widest">Share</span>
           </button>
        </section>

        {/* Lead Info */}
        <section className="flex flex-col gap-4">
           <h2 className="text-xl font-extrabold tracking-tight">Insights</h2>
           <div className="glass-card p-5 flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                 <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-slate-400">workspace_premium</span>
                    <span className="text-sm font-bold text-text-muted">Quality</span>
                 </div>
                 <span className={`text-xs font-black px-3 py-1 rounded-full ${
                   leadData.notes?.[0]?.priority === 'Hot' ? 'bg-danger/10 text-danger' : 
                   leadData.notes?.[0]?.priority === 'Warm' ? 'bg-accent/10 text-accent' : 
                   'bg-primary/10 text-primary'
                 }`}>
                   {leadData.notes?.[0]?.priority || 'Warm'}
                 </span>
              </div>
              <div className="flex flex-col gap-2">
                 <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">Notes</span>
                 <p className="text-sm text-text-main leading-relaxed">
                    {leadData.notes?.[0]?.note_text || 'No additional notes provided.'}
                 </p>
              </div>
           </div>
        </section>

        {/* Tags */}
        <section className="flex flex-col gap-4">
           <div className="flex justify-between items-center">
              <h2 className="text-xl font-extrabold tracking-tight">Tags</h2>
              <button className="text-xs font-bold text-primary">+ Add</button>
           </div>
           <div className="flex flex-wrap gap-2">
              {leadData.tags?.length > 0 ? leadData.tags.map((t: any) => (
                <span key={t.id} className="px-3 py-1.5 glass-card text-xs font-bold border-slate-200">
                   {t.tag}
                </span>
              )) : (
                <span className="text-xs text-text-muted italic">No tags associated.</span>
              )}
           </div>
        </section>

        <div className="mt-8 flex flex-col gap-4">
          <button 
            disabled={isDeleting}
            onClick={async () => {
              if (confirm('Are you sure you want to delete this lead? This action cannot be undone.')) {
                try {
                  setIsDeleting(true);
                  setError(null);
                  await contactService.deleteContact(leadData.id);
                  navigate('/leads', { replace: true });
                } catch (err: any) {
                  console.error("Delete failed:", err);
                  setError(err.message || "Failed to delete lead.");
                  setIsDeleting(false);
                }
              }
            }}
            className={`w-full py-4 font-bold text-sm rounded-2xl transition-all ${
              isDeleting 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                : 'text-danger hover:bg-danger/5 active:bg-danger/10'
            }`}
          >
            {isDeleting ? 'Deleting...' : 'Delete Lead'}
          </button>

          {error && (
            <div className="p-4 bg-danger/10 border border-danger/20 rounded-xl">
              <p className="text-xs text-danger font-bold text-center">{error}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
