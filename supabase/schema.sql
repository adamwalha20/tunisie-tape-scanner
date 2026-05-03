-- ExpoLead AI Supabase Schema
-- Run this in your Supabase SQL Editor

-- 1. Contacts Table
CREATE TABLE IF NOT EXISTS public.contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    name TEXT NOT NULL,
    company TEXT,
    email TEXT,
    phone TEXT,
    source TEXT CHECK (source IN ('OCR', 'QR', 'MANUAL')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Notes Table
CREATE TABLE IF NOT EXISTS public.notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contact_id UUID REFERENCES public.contacts(id) ON DELETE CASCADE,
    note_text TEXT,
    products TEXT,
    specifications TEXT,
    priority TEXT CHECK (priority IN ('Hot', 'Warm', 'Cold', 'High', 'Medium', 'Low')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Tags Table
CREATE TABLE IF NOT EXISTS public.tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contact_id UUID REFERENCES public.contacts(id) ON DELETE CASCADE,
    tag TEXT NOT NULL
);

-- Row Level Security (RLS)
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;

-- Policies for Contacts
CREATE POLICY "Users can view their own contacts" ON public.contacts
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own contacts" ON public.contacts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own contacts" ON public.contacts
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own contacts" ON public.contacts
    FOR DELETE USING (auth.uid() = user_id);

-- Policies for Notes
CREATE POLICY "Users can view notes of their contacts" ON public.notes
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.contacts WHERE id = contact_id AND user_id = auth.uid())
    );

CREATE POLICY "Users can insert notes for their contacts" ON public.notes
    FOR INSERT WITH CHECK (
        EXISTS (SELECT 1 FROM public.contacts WHERE id = contact_id AND user_id = auth.uid())
    );

-- Policies for Tags
CREATE POLICY "Users can view tags of their contacts" ON public.tags
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.contacts WHERE id = contact_id AND user_id = auth.uid())
    );

CREATE POLICY "Users can insert tags for their contacts" ON public.tags
    FOR INSERT WITH CHECK (
        EXISTS (SELECT 1 FROM public.contacts WHERE id = contact_id AND user_id = auth.uid())
    );

-- Storage bucket for business cards
INSERT INTO storage.buckets (id, name, public) VALUES ('business_cards', 'business_cards', true) ON CONFLICT DO NOTHING;
