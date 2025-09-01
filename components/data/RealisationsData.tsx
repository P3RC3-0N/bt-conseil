import { supabase } from '@/lib/supabase';

export default async function RealisationsData() {
  const { data: realisations, error } = await supabase
    .from('realisations')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error) console.error(error);

  const realisationsData = realisations?.map(item => ({
    type: 'realisation' as const,
    data: {
      photo: item.photo_url || '/images/default-realisation.jpg',
      title: item.title,
      description: item.description,
      year: item.year,
      location: item.location,
    },
    id: item.id,
  })) || [];

  return realisationsData;
}
