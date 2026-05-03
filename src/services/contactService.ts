import { supabase } from '../lib/supabase';

export interface Contact {
  id?: string;
  name: string;
  company?: string;
  email?: string;
  phone?: string;
  source: 'OCR' | 'QR' | 'MANUAL';
  created_at?: string;
  user_id?: string; // from auth
}

export interface Note {
  id?: string;
  contact_id: string;
  note_text?: string;
  products?: string;
  specifications?: string;
  priority?: 'Hot' | 'Warm' | 'Cold' | 'High' | 'Medium' | 'Low';
  created_at?: string;
}

export interface Tag {
  id?: string;
  contact_id: string;
  tag: string;
}

// In-memory fallback if Supabase is not configured yet
let mockContacts: any[] = [];
let mockCounter = 1;

export const contactService = {
  async getContacts() {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*, tags(tag)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (e) {
      console.warn("Supabase fetch failed, returning mock data", e);
      return mockContacts;
    }
  },

  async getContact(id: string) {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*, tags(*), notes(*)')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (e) {
      console.warn("Supabase fetch failed, returning mock data", e);
      return mockContacts.find(c => c.id === id) || null;
    }
  },

  async createContact(contact: Contact, tagNames: string[], noteContext?: Partial<Note>) {
    try {
      let userId = undefined;
      const { data: { user } } = await supabase.auth.getUser();
      if (user) userId = user.id;

      const { data: newContact, error } = await supabase
        .from('contacts')
        .insert([{ ...contact, user_id: userId }])
        .select()
        .single();

      if (error) throw error;

      if (tagNames.length > 0) {
        await supabase.from('tags').insert(
          tagNames.map(tag => ({ contact_id: newContact.id, tag }))
        );
      }

      if (noteContext) {
        await supabase.from('notes').insert([{
          ...noteContext,
          contact_id: newContact.id
        }]);
      }

      return newContact;
    } catch (e) {
      console.warn("Supabase insert failed, saving to mock data", e);
      const newId = `mock-${mockCounter++}`;
      const newContact = { 
        ...contact, 
        id: newId, 
        created_at: new Date().toISOString(),
        tags: tagNames.map(t => ({ id: `tag-${Date.now()}`, contact_id: newId, tag: t })),
        notes: noteContext ? [{ ...noteContext, id: `note-${Date.now()}`, contact_id: newId }] : []
      };
      mockContacts = [newContact, ...mockContacts];
      return newContact;
    }
  },

  // other functions as needed
};
