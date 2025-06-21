import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import path from 'path';
const usageLogPath = path.resolve(process.cwd(), 'data/usage.json');

function jsonToCsv(items: any[]): string {
    if (items.length === 0) {
        return '';
    }
    const header = Object.keys(items[0]);
    const headerString = header.join(',');
    const replacer = (key: any, value: any) => value ?? '';
    const rowItems = items.map(row =>
        header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(',')
    );
    return [headerString, ...rowItems].join('\r\n');
}

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
        const fileContent = await fs.readFile(usageLogPath, 'utf-8');
        const usageData = JSON.parse(fileContent);
        const csvData = jsonToCsv(usageData);

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="usage_logs.csv"');
        res.status(200).send(csvData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
