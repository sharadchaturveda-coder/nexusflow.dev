import { supabase } from '../supabaseClient';

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

export async function exportUsageLogs(): Promise<any[]> {
    const { data, error } = await supabase
        .from('usage_logs')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching usage logs:', error);
        throw error;
    }

    return data || [];
}