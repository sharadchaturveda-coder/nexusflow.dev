import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabaseClient';

import { User } from '@/lib/planChecker';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const adminToken = req.headers['x-admin-token'];
    const expectedAdminToken = process.env.ADMIN_TOKEN;

    if (!adminToken || adminToken !== expectedAdminToken) {
      return res.status(401).json({ message: 'Unauthorized: Invalid Admin Token' });
    }

    const { id } = req.query;
    const { locked } = req.body;

    if (req.method !== 'PUT') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    if (typeof id !== 'string' || typeof locked !== 'boolean') {
        return res.status(400).json({ error: 'Invalid request body' });
    }

    try {
        const { data: user, error: fetchError } = await supabase
            .from('users')
            .select('*')
            .eq('id', id)
            .single();

        if (fetchError || !user) {
            console.error('Error fetching user from Supabase:', fetchError);
            return res.status(404).json({ error: 'User not found' });
        }

        const { error: updateError } = await supabase
            .from('users')
            .update({ locked: locked })
            .eq('id', id);

        if (updateError) {
            console.error('Error updating user in Supabase:', updateError);
            return res.status(500).json({ error: 'Failed to update user' });
        }

        res.status(200).json({ message: `User ${id} has been ${locked ? 'locked' : 'unlocked'}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
