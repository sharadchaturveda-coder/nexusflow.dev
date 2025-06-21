import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import path from 'path';
const usersPath = path.resolve(process.cwd(), 'data/users.json');

export interface User {
    id: string;
    planId: string;
    botPersonality?: string;
    locked?: boolean;
}

async function getUsers(): Promise<User[]> {
    try {
        const fileContent = await fs.readFile(usersPath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        return [];
    }
}

async function saveUsers(users: User[]): Promise<void> {
    await fs.writeFile(usersPath, JSON.stringify(users, null, 2), 'utf-8');
}

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
        const users = await getUsers();
        const userIndex = users.findIndex(u => u.id === id);

        if (userIndex === -1) {
            return res.status(404).json({ error: 'User not found' });
        }

        users[userIndex].locked = locked;
        await saveUsers(users);

        res.status(200).json({ message: `User ${id} has been ${locked ? 'locked' : 'unlocked'}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
