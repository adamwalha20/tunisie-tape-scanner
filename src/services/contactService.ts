import { supabase } from '../lib/supabase';

export interface Contact {
  id?: string;
  name: string;
  company?: string;
  email?: string;
  phone?: string;
  source: 'OCR' | 'QR' | 'MANUAL';
  created_at?: string;
  user_id?: string;
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

export const contactService = {
  async getContacts() {
    const { data, error } = await supabase
      .from('contacts')
      .select('*, tags(tag)')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Supabase fetch failed", error);
      return [];
    }
    return data || [];
  },

  async getContact(id: string) {
    const { data, error } = await supabase
      .from('contacts')
      .select('*, tags(*), notes(*)')
      .eq('id', id)
      .single();

    if (error) {
      console.error("Supabase fetch failed", error);
      return null;
    }
    return data;
  },

  async createContact(contact: Contact, tagNames: string[], noteContext?: Partial<Note>) {
    let userId = undefined;
    const { data: { user } } = await supabase.auth.getUser();
    if (user) userId = user.id;

    const { data: newContact, error } = await supabase
      .from('contacts')
      .insert([{ ...contact, user_id: userId }])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert contact failed", error);
      throw error;
    }

    if (tagNames.length > 0) {
      const { error: tagError } = await supabase.from('tags').insert(
        tagNames.map(tag => ({ contact_id: newContact.id, tag }))
      );
      if (tagError) console.error("Supabase insert tags failed", tagError);
    }

    if (noteContext) {
      const { error: noteError } = await supabase.from('notes').insert([{
        ...noteContext,
        contact_id: newContact.id
      }]);
      if (noteError) console.error("Supabase insert note failed", noteError);
    }

    return newContact;
  },

  async deleteContact(id: string) {
    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  }
};
