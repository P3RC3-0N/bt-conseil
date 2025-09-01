import { supabase } from '@/lib/supabase';

export default async function DevisData() {
  const { data: devis, error } = await supabase
    .from('devis_requests')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return devis.map(item => ({
    type: 'devis' as const,
    data: {
      clientName: item.client_name,
      email: item.email,
      phone: item.phone,
      projectType: item.project_type,
      budget: item.budget,
      isProcessed: item.is_processed,
      date: item.created_at,
    },
    id: item.id,
  }));
}
