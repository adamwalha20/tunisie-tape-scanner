import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { contactService, Contact, Note, Tag } from '../services/contactService';

export default function ContactDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState<any>(null); // includes notes, tags
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      contactService.getContact(id)
        .then(data => {
          setContact(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!contact) return <div className="p-8 text-center text-error">Contact not found</div>;

  return (
    <div className="bg-background text-on-background font-body-md antialiased min-h-screen pb-[80px]">
      <header className="bg-white dark:bg-slate-950 docked full-width top-0 border-b-2 border-green-500 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center w-full px-5 h-14 max-w-full sticky z-50">
        <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">signal_cellular_alt</span>
        <span className="text-blue-600 dark:text-blue-400 font-black tracking-tighter font-['Inter'] font-bold text-lg tracking-tight">LeadCapture Pro</span>
        <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">sync</span>
      </header>

      <main className="px-edge-margin py-md max-w-2xl mx-auto w-full">
        <div className="flex items-start justify-between mb-lg">
            <div className="flex flex-col gap-unit">
                <button onClick={() => navigate(-1)} className="flex items-center gap-xs text-on-surface-variant font-status text-status mb-sm touch-target-min -ml-sm px-sm rounded-lg active:bg-surface-container">
                    <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                    Back
                </button>
                <h1 className="font-display text-display text-on-surface">{contact.name}</h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant">{(contact.notes && contact.notes[0]?.note_text) ? contact.notes[0].note_text.replace('Job Title: ', '') + ' | ' : ''}{contact.company}</p>
            </div>
            <button className="flex items-center justify-center gap-xs text-primary font-status text-status bg-primary-fixed text-on-primary-fixed px-md py-sm rounded-full active:bg-primary-fixed-dim transition-colors">
                <span className="material-symbols-outlined text-[18px]">edit</span>
                Edit
            </button>
        </div>

        <div className="grid grid-cols-3 gap-md mb-xl">
            <button onClick={() => contact.phone && window.open('tel:' + contact.phone)} className="bg-surface-container rounded-xl flex flex-col items-center justify-center p-md gap-sm min-h-touch-target-min active:bg-surface-container-high transition-colors border border-outline-variant/30">
                <span className="material-symbols-outlined text-primary text-[24px]">call</span>
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Call</span>
            </button>
            <button onClick={() => contact.email && window.open('mailto:' + contact.email)} className="bg-surface-container rounded-xl flex flex-col items-center justify-center p-md gap-sm min-h-touch-target-min active:bg-surface-container-high transition-colors border border-outline-variant/30">
                <span className="material-symbols-outlined text-primary text-[24px]">mail</span>
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Email</span>
            </button>
            <button className="bg-surface-container rounded-xl flex flex-col items-center justify-center p-md gap-sm min-h-touch-target-min active:bg-surface-container-high transition-colors border border-outline-variant/30">
                <span className="material-symbols-outlined text-primary text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>person_add</span>
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">LinkedIn</span>
            </button>
        </div>

        <section className="mb-xl">
            <h2 className="font-h2 text-h2 text-on-surface mb-md">Notes &amp; Specifications</h2>
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden focus-within:border-primary transition-colors shadow-sm">
                <div className="bg-surface-container-low px-md py-sm flex items-center gap-md border-b border-outline-variant/50">
                    <button className="text-on-surface-variant hover:text-primary active:scale-95 transition-all">
                        <span className="material-symbols-outlined text-[20px]">format_list_bulleted</span>
                    </button>
                    <button className="text-on-surface-variant hover:text-primary active:scale-95 transition-all">
                        <span className="material-symbols-outlined text-[20px]">check_box</span>
                    </button>
                    <div className="w-[1px] h-[20px] bg-outline-variant/50"></div>
                    <button className="text-on-surface-variant hover:text-primary active:scale-95 transition-all">
                        <span className="material-symbols-outlined text-[20px]">attach_file</span>
                    </button>
                </div>
                {/* Note display (readonly for now based on UI) */}
                <textarea 
                  readOnly 
                  className="w-full min-h-[160px] bg-transparent border-none p-md font-body-md text-body-md text-on-surface placeholder:text-outline focus:ring-0 resize-none" 
                  placeholder="Enter specific product interests, budget constraints, or follow-up action items..."
                  defaultValue={contact.notes?.map((n: Note) => n.note_text).join('\n')}
                />
            </div>
            
            <div className="mt-md">
                <span className="font-label-caps text-label-caps text-outline uppercase tracking-wider mb-sm block">Quick Tags</span>
                <div className="flex overflow-x-auto gap-sm pb-xs hide-scrollbar">
                    {contact.tags?.map((t: Tag) => (
                      <button key={t.id} className="flex-shrink-0 bg-secondary-container text-on-secondary-container font-status text-status px-md py-sm rounded-full border border-secondary/20 hover:bg-secondary-fixed transition-colors">{t.tag}</button>
                    ))}
                    <button className="flex-shrink-0 bg-surface-container-high text-on-surface font-status text-status px-md py-sm rounded-full border border-outline-variant hover:bg-surface-container-highest transition-colors">+ Add Tag</button>
                </div>
            </div>
        </section>

        <section className="mb-xl">
            <h2 className="font-h2 text-h2 text-on-surface mb-md">Activity</h2>
            <div className="flex flex-col gap-0 relative">
                <div className="absolute left-[11px] top-[12px] bottom-[24px] w-[2px] bg-surface-variant"></div>
                <div className="flex gap-md pb-lg relative">
                    <div className="flex flex-col items-center pt-[4px]">
                        <div className="w-[24px] h-[24px] rounded-full bg-primary-container flex items-center justify-center z-10 border-2 border-surface">
                            <div className="w-[8px] h-[8px] rounded-full bg-primary"></div>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start mb-unit">
                            <h3 className="font-status text-status text-on-surface">Lead Captured</h3>
                            <span className="font-label-caps text-label-caps text-outline">
                              {new Date(contact.created_at || '').toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                        <p className="font-body-md text-body-md text-on-surface-variant">Source: {contact.source}.</p>
                    </div>
                </div>
            </div>
        </section>
      </main>

      <div className="fixed bottom-0 left-0 w-full bg-surface-variant border-t border-outline-variant/30 px-edge-margin py-md z-40 pb-[calc(16px+env(safe-area-inset-bottom))] shadow-[0_-4px_12px_rgba(0,0,0,0.02)]">
        <div className="max-w-2xl mx-auto w-full flex items-center gap-sm">
            <span className="material-symbols-outlined text-on-surface-variant opacity-80 text-[20px]">cloud_done</span>
            <span className="font-status text-status text-on-surface-variant flex-1">Synced to cloud</span>
        </div>
      </div>
    </div>
  );
}
