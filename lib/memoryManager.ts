// lib/memoryManager.ts (New version)
import { supabase } from './supabaseClient';

export async function getUserMemory(userId: string) {
    const { data, error } = await supabase
        .from('conversations')
        .select('conversationData')
        .eq('userId', userId)
        .single();
    if (error && error.code !== 'PGRST116') throw error; // 'PGRST116' means no rows found, which is fine
    return data ? data.conversationData : [];
}

export async function updateUserMemory(userId: string, newHistory: any[]) {
    const { error } = await supabase
        .from('conversations')
        .upsert({ userId: userId, conversationData: newHistory }, { onConflict: 'userId' });
    if (error) throw error;
}
