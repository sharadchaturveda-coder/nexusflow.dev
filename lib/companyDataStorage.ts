import { supabase } from './supabaseClient';

export async function writeCompanyDocument(userId: string, documentName: string, content: string): Promise<void> {
  const { error } = await supabase
    .from('company_documents')
    .upsert(
      { user_id: userId, document_name: documentName, content: content, uploaded_at: new Date().toISOString() },
      { onConflict: 'user_id,document_name' }
    );

  if (error) {
    console.error('Error writing company document:', error);
    throw error;
  }
}

export async function clearCompanyDataDirectory(userId: string): Promise<void> {
  const { error } = await supabase
    .from('company_documents')
    .delete()
    .eq('user_id', userId);

  if (error) {
    console.error('Error clearing company data directory:', error);
    throw error;
  }
}

export async function getCompanyDocuments(userId: string): Promise<any[]> {
  const { data, error } = await supabase
    .from('company_documents')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching company documents:', error);
    throw error;
  }

  return data || [];
}