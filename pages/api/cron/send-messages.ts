import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../lib/supabaseClient';

// A basic mock of a WhatsApp API client
const whatsAppApiClient = {
  sendMessage: async (to: string, body: string) => {
    console.log(`Sending WhatsApp message to ${to}: "${body}"`);
    // In a real application, this would make an HTTP request to the WhatsApp API
    // For this example, we'll just simulate a successful send.
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    return { success: true };
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end('Method Not Allowed');
  }

  // Secure the endpoint with a secret, passed in the Authorization header
  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const now = new Date().toISOString();

    // 1. Fetch pending messages
    const { data: messages, error: fetchError } = await supabase
      .from('scheduled_messages')
      .select(`
        id,
        message_content,
        leads ( id, name, email )
      `)
      .filter('sent_at', 'is', null)
      .lte('send_at', now);

    if (fetchError) {
      console.error('Error fetching scheduled messages:', fetchError);
      return res.status(500).json({ message: 'Error fetching messages', error: fetchError.message });
    }

    if (!messages) {
      return res.status(200).json({ message: 'No pending messages to send.' });
    }

    // 2. Process and send each message
    let sentCount = 0;
    const errors = [];

    for (const message of messages) {
      // @ts-ignore
      const lead = message.leads[0];
      if (!lead || !lead.email) {
        console.warn(`Skipping message ${message.id} due to missing lead data.`);
        continue;
      }

      try {
        // @ts-ignore
        const result = await whatsAppApiClient.sendMessage(lead.email, message.message_content);

        if (result.success) {
          // 3. Mark message as sent
          const { error: updateError } = await supabase
            .from('scheduled_messages')
            .update({ sent_at: new Date().toISOString() })
            .eq('id', message.id);

          if (updateError) {
            console.error(`Error updating message ${message.id}:`, updateError);
            errors.push(`Failed to update message ${message.id}`);
          } else {
            sentCount++;
          }
        } else {
          errors.push(`Failed to send message ${message.id}`);
        }
      } catch (error: any) {
        console.error(`Error processing message ${message.id}:`, error);
        errors.push(`Exception while sending message ${message.id}`);
      }
    }

    if (errors.length > 0) {
      return res.status(500).json({
        message: `Processed ${messages.length} messages. Sent: ${sentCount}. Errors: ${errors.length}`,
        errors,
      });
    }

    res.status(200).json({ message: `Successfully sent ${sentCount} of ${messages.length} pending messages.` });
  } catch (error: any) {
    console.error('Unexpected error in cron handler:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}