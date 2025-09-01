import { supabase } from '@/lib/supabase';

export default async function MessagesData() {
  const { data: messages, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return messages.map(item => ({
    type: 'message' as const,
    data: {
      senderName: item.sender_name,
      email: item.email,
      fullMessage: item.full_message,
      isRead: item.is_read,
      date: item.created_at,
    },
    id: item.id,
  }));
}
