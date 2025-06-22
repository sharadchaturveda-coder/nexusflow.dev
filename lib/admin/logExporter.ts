import fs from 'fs/promises';
import path from 'path';

const usageLogPath = path.resolve(process.cwd(), 'data/usage.json');

export function jsonToCsv(items: any[]): string {
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

export async function exportUsageLogs(): Promise<string> {
    const fileContent = await fs.readFile(usageLogPath, 'utf-8');
    const usageData = JSON.parse(fileContent);
    return jsonToCsv(usageData);
}