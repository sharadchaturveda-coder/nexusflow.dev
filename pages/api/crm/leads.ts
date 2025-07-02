import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../api/auth/[...nextauth]';
import { supabase } from '../../../lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  switch (req.method) {
    case 'GET':
      try {
        const { data, error } = await supabase.from('leads').select('*');

        if (error) {
          console.error('Error fetching leads:', error);
          return res.status(500).json({ message: 'Error fetching leads', error: error.message });
        }

        res.status(200).json(data);
      } catch (error: any) {
        console.error('Unexpected error:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
      }
      break;

    case 'POST':
      try {
        const { name, email, source } = req.body;

        if (!name || !email || !source) {
          return res.status(400).json({ message: 'Missing required fields' });
        }

        const { data, error } = await supabase
          .from('leads')
          .insert([{ name, email, source }])
          .select();

        if (error) {
          console.error('Error creating lead:', error);
          return res.status(500).json({ message: 'Error creating lead', error: error.message });
        }

        if (data && data.length > 0) {
          const newLead = data[0];

          // Check for an active campaign
          const { data: campaignData, error: campaignError } = await supabase
            .from('campaigns')
            .select('*')
            .eq('trigger', 'new_lead_added')
            .single();

          if (campaignError) {
            console.error('Error fetching campaign:', campaignError);
            // Proceed without scheduling, but log the error
          }

          if (campaignData) {
            const messagesToSchedule = [];
            const now = new Date();

            // Message 1 (instant)
            if (campaignData.message1) {
              messagesToSchedule.push({
                lead_id: newLead.id,
                message_content: campaignData.message1.replace('{{lead_name}}', newLead.name),
                send_at: now.toISOString(),
              });
            }

            // Message 2 (after 1 day)
            if (campaignData.message2) {
              const sendAt = new Date(now);
              sendAt.setDate(now.getDate() + 1);
              messagesToSchedule.push({
                lead_id: newLead.id,
                message_content: campaignData.message2.replace('{{lead_name}}', newLead.name),
                send_at: sendAt.toISOString(),
              });
            }

            // Message 3 (after 3 days)
            if (campaignData.message3) {
              const sendAt = new Date(now);
              sendAt.setDate(now.getDate() + 3);
              messagesToSchedule.push({
                lead_id: newLead.id,
                message_content: campaignData.message3.replace('{{lead_name}}', newLead.name),
                send_at: sendAt.toISOString(),
              });
            }

            if (messagesToSchedule.length > 0) {
              const { error: scheduleError } = await supabase
                .from('scheduled_messages')
                .insert(messagesToSchedule);

              if (scheduleError) {
                console.error('Error scheduling messages:', scheduleError);
                // Log error but don't block the response
              }
            }
          }
        }

        res.status(201).json(data);
      } catch (error: any) {
        console.error('Unexpected error:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}