import type { NextApiRequest, NextApiResponse } from 'next';
import { exportUsageLogs } from '@/lib/admin/logExporter';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const adminToken = req.headers['x-admin-token'];
    const expectedAdminToken = process.env.ADMIN_TOKEN;

    if (!adminToken || adminToken !== expectedAdminToken) {
      return res.status(401).json({ message: 'Unauthorized: Invalid Admin Token' });
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const csvData = await exportUsageLogs();

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="usage_logs.csv"');
        res.status(200).send(csvData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
