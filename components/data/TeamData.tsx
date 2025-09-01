// components/server/TeamData.tsx
import { supabase } from '@/lib/supabase';

export default async function TeamData() {
  const { data: team_members, error } = await supabase
    .from('team_members')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error) console.error(error);

  // On renvoie déjà les objets formatés pour les carousels
  const teamData = team_members?.map(member => ({
    type: 'team' as const,
    data: {
      photo: member.photo_url || '/images/default-profile.jpg',
      name: member.name,
      position: member.position,
      description: member.description,
    },
    id: member.id,
  })) || [];

  return teamData;
}
