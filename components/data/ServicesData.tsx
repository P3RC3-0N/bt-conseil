import { supabase } from '@/lib/supabase';

export default async function ServicesData() {
  const { data: services, error } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error) console.error(error);

  const servicesData = services?.map(service => ({
    type: 'service' as const,
    data: {
      icon: service.icon_url || '/icons/default-service.svg',
      title: service.title,
      description: service.description,
    },
    id: service.id,
  })) || [];

  return servicesData;
}
