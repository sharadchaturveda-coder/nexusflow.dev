import fs from 'fs/promises';
import path from 'path';
import { supabase } from '@/lib/supabaseClient';

const packagesPath = path.resolve(process.cwd(), 'data/packages.json');

export interface Plan {
  name: string;
  tokenLimit: number;
  price: number;
  model: 'gpt-3.5-turbo' | 'gpt-4o-mini';
}

export interface User {
    id: string;
    planId: string;
    botPersonality?: string;
    locked?: boolean;
}

export async function getPlanByUserId(userId: string): Promise<Plan | undefined> {
    const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

    if (error) {
        console.error('Error fetching user from Supabase:', error);
        return undefined;
    }

    if (!user) {
        return undefined;
    }


    const packagesFileContent = await fs.readFile(packagesPath, 'utf-8');
    const plans: Plan[] = JSON.parse(packagesFileContent);
    return plans.find(plan => plan.name === user.planId);
}

export async function getUser(userId: string): Promise<User | undefined> {
    const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

    if (error) {
        console.error('Error fetching user from Supabase:', error);
        return undefined;
    }
    return user || undefined;
}
